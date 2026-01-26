import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, Link, useSearchParams } from "react-router-dom";
import {
  QrCode,
  Download,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Home,
  Loader,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const DigitalTicket = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if ticket data passed via navigation state
    if (location.state) {
      setTicketData(location.state);
    } else {
      // Try to fetch from API using ticket ID from URL
      const ticketId = searchParams.get("id");
      if (ticketId) {
        fetchTicket(ticketId);
      }
    }
  }, [location.state, searchParams]);

  const fetchTicket = async (ticketId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/tickets/${ticketId}`,
      );
      if (response.ok) {
        const data = await response.json();
        setTicketData(data);
      }
    } catch (error) {
      console.error("Error fetching ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader className="w-12 h-12 text-brand-navy animate-spin" />
        </div>
      </div>
    );
  }

  if (!ticketData) {
    return (
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-4">No ticket data found</p>
            <Link
              to="/ticketing"
              className="text-brand-navy font-bold hover:underline"
            >
              Book a new ticket
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Generate QR code payload as JSON
  const qrPayload = JSON.stringify({
    ticket_id: ticketData.ticket_id,
    source: ticketData.source,
    destination: ticketData.destination,
    class: ticketData.class,
    ticket_type: ticketData.ticket_type,
    passengers: ticketData.passengers,
    fare: ticketData.fare,
    issued_at: ticketData.issued_at,
    valid_upto: ticketData.valid_upto,
    date: ticketData.date,
  });

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      <div className="flex-grow flex items-center justify-center p-6 pb-20">
        <div className="max-w-md w-full relative">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10">
            {/* Header */}
            <div className="bg-brand-navy p-6 pt-8 text-white text-center relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-full h-full opacity-10"
                style={{
                  backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                  backgroundSize: "10px 10px",
                }}
              ></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
                    className="w-10 h-10 object-cover rounded-full mix-blend-multiply"
                    alt="Emblem"
                  />
                </div>
                <h2 className="text-xl font-bold tracking-widest uppercase">
                  M-Ticket
                </h2>
                <p className="text-blue-200 text-xs font-medium mt-1">
                  UTS Mobile Ticketing
                </p>
              </div>
            </div>

            {/* Ticket Body */}
            <div className="p-6 relative">
              {/* Punch Hols */}
              <div className="absolute -left-3 top-0 w-6 h-6 bg-gray-100 rounded-full"></div>
              <div className="absolute -right-3 top-0 w-6 h-6 bg-gray-100 rounded-full"></div>
              <div className="border-b-2 border-dashed border-gray-200 mb-6"></div>

              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">
                    Source
                  </p>
                  <p className="text-xl font-black text-gray-800 uppercase">
                    {ticketData.source}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase font-bold">
                    Destination
                  </p>
                  <p className="text-xl font-black text-gray-800 uppercase">
                    {ticketData.destination}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400 uppercase font-bold">
                    Class
                  </p>
                  <p className="font-bold text-brand-navy">
                    {ticketData.class}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400 uppercase font-bold">
                    Type
                  </p>
                  <p className="font-bold text-brand-navy">
                    {ticketData.ticket_type || ticketData.ticketType}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400 uppercase font-bold">
                    Adults
                  </p>
                  <p className="font-bold text-brand-navy">
                    {ticketData.passengers}
                  </p>
                </div>
                <div className="p-3 bg-brand-saffron/10 rounded-xl">
                  <p className="text-xs text-brand-saffron uppercase font-bold">
                    Fare
                  </p>
                  <p className="font-bold text-brand-saffron">
                    ₹{ticketData.fare}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <p className="text-xs text-gray-400 uppercase font-bold">
                    Issued At
                  </p>
                  <p className="font-bold text-brand-navy">
                    {ticketData.issued_at}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl">
                  <p className="text-xs text-gray-400 uppercase font-bold">
                    Valid Till
                  </p>
                  <p className="font-bold text-green-700">
                    {ticketData.valid_upto}
                  </p>
                </div>
              </div>

              {/* QR Code with JSON Payload */}
              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-brand-navy/20 rounded-2xl bg-brand-navy/5 mb-6">
                <QRCodeSVG
                  value={qrPayload}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
                <p className="text-xs text-gray-500 font-mono tracking-widest mt-3">
                  {ticketData.ticket_id}
                </p>
                <p className="text-[10px] text-gray-400 mt-1">
                  Scan to verify ticket
                </p>
              </div>

              <div className="flex items-center justify-center space-x-2 text-green-600 font-bold text-sm bg-green-50 py-2 rounded-lg">
                <ShieldCheck className="w-4 h-4" />
                <span>Ticket Active</span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50 p-4 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center p-3 rounded-xl bg-white border border-gray-200 shadow-sm text-sm font-bold hover:bg-gray-100">
                <Download className="w-4 h-4 mr-2" /> Save
              </button>
              <button className="flex items-center justify-center p-3 rounded-xl bg-brand-navy text-white shadow-lg text-sm font-bold hover:bg-brand-navy/90">
                <Share2 className="w-4 h-4 mr-2" /> Share
              </button>
              {/* Home Button */}
              <Link
                to="/"
                className="col-span-2 flex items-center justify-center p-3 rounded-xl bg-brand-saffron text-white shadow-lg text-sm font-bold hover:bg-brand-saffron/90"
              >
                <Home className="w-4 h-4 mr-2" /> Back to Home
              </Link>
            </div>
          </div>

          {/* Confetti effect simulation (visual only) */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-yellow-400 rounded-full blur-2xl opacity-50"></div>
          <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-green-400 rounded-full blur-2xl opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default DigitalTicket;
