import React, { useState, useEffect, useRef } from "react";
import {
  Camera,
  CheckCircle,
  XCircle,
  QrCode,
  ArrowLeft,
  AlertCircle,
  Scan,
  Video,
  VideoOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";

const ScanPage = () => {
  const navigate = useNavigate();
  const [scanned, setScanned] = useState(false);
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const [manualInput, setManualInput] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const html5QrCodeRef = useRef(null);
  const scannerRef = useRef(null);

  const verifyTicket = (data) => {
    try {
      // Check if ticket data is valid
      if (!data.ticket_id || !data.source || !data.destination) {
        setValid(false);
        setVerificationResult({
          success: false,
          message: "Invalid ticket data",
        });
        return;
      }

      // Check if ticket is still valid
      const validUpto = new Date(data.valid_upto);
      const now = new Date();

      if (now > validUpto) {
        setValid(false);
        setVerificationResult({
          success: false,
          message: "Ticket has expired",
        });
        setTicketData(data);
        return;
      }

      // Ticket is valid
      setValid(true);
      setVerificationResult({
        success: true,
        message: "Ticket verified successfully",
      });
      setTicketData(data);
    } catch (err) {
      setValid(false);
      setVerificationResult({
        success: false,
        message: "Error verifying ticket",
      });
    }
  };

  // Start camera scanning
  const startScanning = async () => {
    try {
      setCameraError(null);
      setScanning(true);

      html5QrCodeRef.current = new Html5Qrcode("qr-reader");

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      };

      await html5QrCodeRef.current.start(
        { facingMode: "environment" }, // Use back camera on mobile
        config,
        (decodedText) => {
          // Successfully scanned QR code
          handleQRScanned(decodedText);
        },
        (error) => {
          // Scanning error (usually just "no QR found"), ignore
        },
      );
    } catch (err) {
      console.error("Camera error:", err);
      setCameraError("Unable to access camera. Please check permissions.");
      setScanning(false);
    }
  };

  // Stop camera scanning
  const stopScanning = async () => {
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current.clear();
        html5QrCodeRef.current = null;
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
    setScanning(false);
  };

  // Handle scanned QR code
  const handleQRScanned = (decodedText) => {
    stopScanning();
    setLoading(true);

    try {
      const data = JSON.parse(decodedText);
      verifyTicket(data);
      setScanned(true);
    } catch (err) {
      setVerificationResult({
        success: false,
        message: "Invalid QR code format",
      });
      setScanned(true);
    } finally {
      setLoading(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current) {
        stopScanning();
      }
    };
  }, []);

  const handleManualVerify = () => {
    setLoading(true);
    try {
      const data = JSON.parse(manualInput);
      verifyTicket(data);
      setScanned(true);
    } catch (err) {
      setVerificationResult({
        success: false,
        message: "Invalid JSON format",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateScan = () => {
    setLoading(true);
    // Simulate scanning with sample data
    setTimeout(() => {
      const sampleTicket = {
        ticket_id: "TKT_" + Date.now(),
        source: "Churchgate",
        destination: "Dadar",
        class: "Second Class",
        ticket_type: "Single Journey",
        passengers: 1,
        fare: 10,
        issued_at: new Date().toISOString(),
        valid_upto: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
        date: new Date().toLocaleDateString(),
      };
      verifyTicket(sampleTicket);
      setScanned(true);
      setLoading(false);
    }, 1500);
  };

  const resetScanner = () => {
    setScanned(false);
    setValid(false);
    setVerificationResult(null);
    setTicketData(null);
    setManualInput("");
    setCameraError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Standalone Header - No Navbar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Smart Rail Mumbai
              </h1>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg">
              <Scan className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900">
                Ticket Verification
              </h2>
              <p className="text-gray-600 text-lg">
                Scan QR codes to verify passenger tickets
              </p>
            </div>
          </div>
        </div>

        {/* Verification Result */}
        {scanned && verificationResult && (
          <div
            className={`mb-6 p-6 rounded-xl border-2 animate-in fade-in duration-300 ${
              verificationResult.success
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-start gap-4">
              {verificationResult.success ? (
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              ) : (
                <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
              )}
              <div className="flex-1">
                <h3
                  className={`text-xl font-bold mb-2 ${
                    verificationResult.success
                      ? "text-green-900"
                      : "text-red-900"
                  }`}
                >
                  {verificationResult.message}
                </h3>

                {ticketData && (
                  <div className="mt-4 space-y-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">
                          Ticket ID:
                        </span>
                        <p className="text-gray-900 font-mono text-xs">
                          {ticketData.ticket_id}
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">
                          Class:
                        </span>
                        <p className="text-gray-900">{ticketData.class}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">
                          From:
                        </span>
                        <p className="text-gray-900">{ticketData.source}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">To:</span>
                        <p className="text-gray-900">
                          {ticketData.destination}
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">
                          Passengers:
                        </span>
                        <p className="text-gray-900">{ticketData.passengers}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">
                          Fare:
                        </span>
                        <p className="text-gray-900">₹{ticketData.fare}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">
                          Issued:
                        </span>
                        <p className="text-gray-900 text-xs">
                          {new Date(ticketData.issued_at).toLocaleString(
                            "en-IN",
                          )}
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">
                          Valid Until:
                        </span>
                        <p className="text-gray-900 text-xs">
                          {new Date(ticketData.valid_upto).toLocaleString(
                            "en-IN",
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={resetScanner}
                  className="mt-4 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Scan Another Ticket
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Scanner Section */}
        {!scanned && (
          <div className="space-y-6">
            {/* Camera Scanner */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  📷 QR Code Scanner
                </h3>
                {!scanning ? (
                  <button
                    onClick={startScanning}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Video className="w-5 h-5" />
                    Start Camera
                  </button>
                ) : (
                  <button
                    onClick={stopScanning}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <VideoOff className="w-5 h-5" />
                    Stop Camera
                  </button>
                )}
              </div>

              {/* Camera Error */}
              {cameraError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-900 font-semibold">Camera Error</p>
                      <p className="text-red-700 text-sm">{cameraError}</p>
                      <p className="text-red-600 text-xs mt-2">
                        Make sure you've granted camera permissions in your
                        browser settings.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Camera Viewfinder */}
              <div className="relative w-full max-w-md mx-auto">
                <div
                  id="qr-reader"
                  className={`rounded-2xl overflow-hidden ${!scanning ? "hidden" : ""}`}
                  style={{ minHeight: "300px" }}
                ></div>

                {/* Placeholder when camera is off */}
                {!scanning && (
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden relative">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                      <Camera className="text-gray-400 w-20 h-20" />
                      <p className="text-gray-600 font-medium">
                        Click "Start Camera" to begin scanning
                      </p>
                    </div>

                    {/* Corner Markers */}
                    <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-purple-400 rounded-tl-xl"></div>
                    <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-purple-400 rounded-tr-xl"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-purple-400 rounded-bl-xl"></div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-purple-400 rounded-br-xl"></div>
                  </div>
                )}
              </div>

              {scanning && (
                <p className="text-gray-600 mt-4 text-center text-sm">
                  <Scan className="w-5 h-5 inline-block mr-2 animate-pulse text-green-600" />
                  Camera is active. Point at a QR code to scan.
                </p>
              )}

              {!scanning && !cameraError && (
                <p className="text-gray-600 mt-4 text-center text-sm">
                  <Camera className="w-5 h-5 inline-block mr-2" />
                  Start the camera to scan QR codes from tickets
                </p>
              )}

              <button
                onClick={handleSimulateScan}
                disabled={loading}
                className="mt-6 w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? "Verifying..." : "🎫 Simulate Scan (Demo)"}
              </button>
            </div>

            {/* Manual Input */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Manual Verification
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Paste the ticket JSON data below to verify manually
              </p>
              <textarea
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder='{"ticket_id":"TKT_123...","source":"Churchgate","destination":"Dadar",...}'
                className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg font-mono text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none resize-none"
              />
              <button
                onClick={handleManualVerify}
                disabled={!manualInput.trim() || loading}
                className="mt-4 w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify Ticket"}
              </button>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Verification Instructions
              </h3>
              <ul className="space-y-2 text-blue-800 text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-bold">1.</span>
                  <span>
                    Ask passenger to show their digital ticket QR code
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">2.</span>
                  <span>Position QR code within the camera frame</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">3.</span>
                  <span>
                    System will automatically scan and verify ticket validity
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">4.</span>
                  <span>Green checkmark = Valid | Red X = Invalid/Expired</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Scanning Animation Keyframe */}
      <style>{`
                @keyframes scan {
                    0%, 100% { top: 0; }
                    50% { top: calc(100% - 4px); }
                }
            `}</style>
    </div>
  );
};

export default ScanPage;
