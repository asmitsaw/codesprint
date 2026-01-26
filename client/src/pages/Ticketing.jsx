import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  Train,
  CreditCard,
  ChevronRight,
  Wallet,
  Plus,
  Loader,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { westernLineStations } from "../utils/stations";
import { getWalletBalance, addMoney, deductMoney } from "../utils/wallet";
import { calculateFare } from "../utils/fareCalculator";

const Ticketing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    ticketType: "Single Journey",
    class: "Second Class",
    passengers: 1,
  });
  const [walletBalance, setWalletBalance] = useState(0);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [addMoneyAmount, setAddMoneyAmount] = useState("");
  const [fare, setFare] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState(0);

  useEffect(() => {
    setWalletBalance(getWalletBalance());
  }, []);

  useEffect(() => {
    if (
      formData.source &&
      formData.destination &&
      formData.source !== formData.destination
    ) {
      try {
        const calculatedFare = calculateFare(
          formData.source,
          formData.destination,
          formData.class,
          formData.ticketType,
          formData.passengers,
        );
        setFare(calculatedFare);
      } catch (error) {
        setFare(0);
      }
    } else {
      setFare(0);
    }
  }, [formData]);

  const handleAddMoney = () => {
    const amount = parseFloat(addMoneyAmount);
    if (amount > 0) {
      const newBalance = addMoney(amount);
      setWalletBalance(newBalance);
      setAddMoneyAmount("");
      setShowWalletModal(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!formData.source || !formData.destination) {
      alert("Please select both source and destination stations");
      return;
    }

    if (formData.source === formData.destination) {
      alert("Source and destination cannot be the same");
      return;
    }

    if (walletBalance < fare) {
      alert("Insufficient wallet balance! Please add money.");
      setShowWalletModal(true);
      return;
    }

    // Simulate payment processing with steps
    setIsProcessing(true);
    setPaymentStep(1);

    // Step 1: Validating
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPaymentStep(2);

    // Step 2: Processing Payment
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setPaymentStep(3);

    // Step 3: Generating Ticket
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Deduct money from wallet
    try {
      const newBalance = deductMoney(fare);
      setWalletBalance(newBalance);

      // Generate ticket data
      const ticketId = `TKT_${Date.now()}`;
      const issueTime = new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const validUpto = new Date(
        Date.now() + 3 * 60 * 60 * 1000,
      ).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

      const ticketData = {
        ticket_id: ticketId,
        source: formData.source,
        destination: formData.destination,
        class: formData.class,
        ticket_type: formData.ticketType,
        passengers: formData.passengers,
        fare: fare,
        issued_at: issueTime,
        valid_upto: validUpto,
        date: new Date().toLocaleDateString("en-IN"),
      };

      // Save ticket to backend
      await fetch("http://localhost:5000/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketData),
      });

      setIsProcessing(false);
      navigate("/digital-ticket", { state: ticketData });
    } catch (error) {
      setIsProcessing(false);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      <div className="flex-grow flex items-center justify-center p-6 relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-saffron/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-brand-green/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center z-10">
          <div className="text-left space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-navy/10 border border-brand-navy/20 text-brand-navy text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 bg-brand-saffron rounded-full mr-2 animate-pulse"></span>
              Smart & Paperless
            </div>
            <h1 className="text-5xl font-extrabold text-brand-navy leading-tight">
              Book Your <br />
              <span className="text-brand-saffron">Journey</span> Today
            </h1>
            <p className="text-lg text-gray-700 font-medium">
              Skip the queues. Get your digital QR ticket instantly and travel
              stress-free across Mumbai.
            </p>

            {/* Wallet Card */}
            <div className="p-6 bg-gradient-to-br from-brand-navy to-blue-800 rounded-2xl shadow-xl text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Wallet className="w-6 h-6" />
                  <span className="text-sm font-semibold opacity-90">
                    Wallet Balance
                  </span>
                </div>
                <button
                  onClick={() => setShowWalletModal(true)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Money
                </button>
              </div>
              <div className="text-4xl font-black">
                ₹{walletBalance.toFixed(2)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/60 rounded-xl border border-white shadow-sm">
                <div className="text-3xl font-bold text-brand-navy mb-1">
                  2.4s
                </div>
                <div className="text-sm text-gray-600 font-semibold">
                  Avg. Booking Time
                </div>
              </div>
              <div className="p-4 bg-white/60 rounded-xl border border-white shadow-sm">
                <div className="text-3xl font-bold text-brand-navy mb-1">
                  0%
                </div>
                <div className="text-sm text-gray-600 font-semibold">
                  Transaction Fee
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-saffron via-white to-brand-green"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Train className="w-6 h-6 mr-2 text-brand-navy" />
              Book Ticket
            </h2>

            <form onSubmit={handleBooking} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    From
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 outline-none font-semibold text-gray-800"
                    required
                    value={formData.source}
                    onChange={(e) =>
                      setFormData({ ...formData, source: e.target.value })
                    }
                  >
                    <option value="">Select Source</option>
                    {westernLineStations.map((station) => (
                      <option key={station} value={station}>
                        {station}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    To
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 outline-none font-semibold text-gray-800"
                    required
                    value={formData.destination}
                    onChange={(e) =>
                      setFormData({ ...formData, destination: e.target.value })
                    }
                  >
                    <option value="">Select Destination</option>
                    {westernLineStations.map((station) => (
                      <option key={station} value={station}>
                        {station}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Passengers
                </label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={formData.passengers}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      passengers: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 outline-none font-semibold text-gray-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Class
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["Second", "First", "AC"].map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      className={`py-3 rounded-xl border font-bold text-sm transition-all ${formData.class.includes(cls) ? "bg-brand-navy text-white border-brand-navy shadow-lg" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          class: cls + (cls === "AC" ? " Local" : " Class"),
                        })
                      }
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Ticket Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["Single Journey", "Return Journey"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`py-3 rounded-xl border font-bold text-sm transition-all ${formData.ticketType === type ? "bg-brand-saffron text-white border-brand-saffron shadow-lg" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}
                      onClick={() =>
                        setFormData({ ...formData, ticketType: type })
                      }
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fare Display */}
              {fare > 0 && (
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-700">
                      Total Fare:
                    </span>
                    <span className="text-2xl font-black text-green-700">
                      ₹{fare}
                    </span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing || fare === 0}
                className="w-full py-4 mt-4 bg-gradient-to-r from-brand-navy to-blue-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader className="w-5 h-5 mr-3 animate-spin" />
                    <span className="text-lg">Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-3" />
                    <span className="text-lg">Pay ₹{fare} & Book</span>
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Wallet Modal */}
        {showWalletModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Add Money to Wallet
              </h3>
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={addMoneyAmount}
                  onChange={(e) => setAddMoneyAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-brand-navy outline-none font-semibold"
                />
              </div>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[100, 500, 1000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setAddMoneyAmount(amount.toString())}
                    className="py-2 px-4 bg-gray-100 hover:bg-brand-navy hover:text-white rounded-lg font-bold transition-colors"
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowWalletModal(false)}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMoney}
                  className="flex-1 py-3 bg-brand-navy text-white rounded-xl font-bold hover:bg-blue-800 transition-colors"
                >
                  Add Money
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Processing Modal */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader className="w-10 h-10 text-brand-navy animate-spin" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {paymentStep === 1 && "Validating Details..."}
                  {paymentStep === 2 && "Processing Payment..."}
                  {paymentStep === 3 && "Generating Ticket..."}
                </h3>
                <p className="text-gray-600">
                  Please wait while we process your booking
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-brand-navy h-full transition-all duration-500 ease-out"
                  style={{ width: `${(paymentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ticketing;
