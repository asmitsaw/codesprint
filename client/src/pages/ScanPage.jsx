import React, { useState } from 'react';
import { Camera, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ScanPage = () => {
    const [scanned, setScanned] = useState(false);
    const [valid, setValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [suggestion, setSuggestion] = useState(null);
    const [selectedTransport, setSelectedTransport] = useState(1); // Default to ID 1 for test

    const handleScan = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    transport_id: selectedTransport,
                    event_type: 'IN', // Scanning IN
                    user_id: 'user_123'
                })
            });
            const data = await res.json();
            
            if (res.ok) {
                setScanned(true);
                setValid(true);
                if (data.suggestion) {
                    setSuggestion(data.suggestion);
                }
            } else {
                alert('Scan Failed');
            }
        } catch (err) {
            console.error(err);
            alert('Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Gradient Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-saffron/10 via-transparent to-brand-green/10 pointer-events-none"></div>
            {/* Camera Viewfinder UI */}
            {!scanned ? (
                <>
                    <h1 className="text-brand-navy text-2xl font-extrabold mb-8 z-10 tracking-tight">Scan Ticket QR</h1>
                    
                    {/* Simulated Transport Selection for Demo */}
                    <div className="z-10 mb-4 bg-white/80 p-2 rounded-lg">
                        <label className="text-xs font-bold text-gray-500 block">Select Train (Simulated NFC/QR data)</label>
                        <select 
                            className="bg-transparent font-bold text-brand-navy outline-none"
                            value={selectedTransport}
                            onChange={(e) => setSelectedTransport(e.target.value)}
                        >
                            <option value="1">Train #1 (Fast Local)</option>
                            <option value="2">Train #2 (Slow Local)</option>
                            <option value="3">Train #3 (AC Local)</option>
                            <option value="4">Train #4 (Metro 3)</option>
                        </select>
                    </div>

                    <div className="relative w-72 h-72 border-4 border-white/50 rounded-3xl overflow-hidden shadow-2xl z-10 bg-black/80 backdrop-blur-sm">
                        <div className="absolute inset-0 bg-transparent z-20">
                            {/* Scanning Line Animation */}
                            <div className="w-full h-1 bg-brand-saffron shadow-[0_0_20px_#FF9933] animate-[scan_2s_infinite]"></div>
                        </div>
                        {/* Simulated Camera Feed Background */}
                        <div className="w-full h-full flex items-center justify-center">
                            <Camera className="text-white/50 w-16 h-16" />
                            <p className="absolute bottom-4 text-white/70 text-xs font-medium">Align QR code within frame</p>
                        </div>

                        {/* Corner Markers */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-brand-orange rounded-tl-xl"></div>
                        <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-brand-orange rounded-tr-xl"></div>
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-brand-orange rounded-bl-xl"></div>
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-brand-orange rounded-br-xl"></div>
                    </div>

                    <p className="text-gray-400 mt-8 text-center max-w-xs z-10">
                        Hold your device steady. Verification happens automatically.
                    </p>

                    <button
                        onClick={handleScan}
                        disabled={loading}
                        className="mt-12 px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition-all z-10"
                    >
                        {loading ? 'Verifying...' : 'Simulate Scan'}
                    </button>
                </>
            ) : (
                <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center animate-in zoom-in duration-300 max-w-sm w-full">
                    {valid ? (
                        <>
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Ticket Valid!</h2>
                            <p className="text-gray-500 text-center mb-6">Gates are opening. Have a safe journey.</p>
                            
                            {/* Smart Suggestion Alert */}
                            {suggestion && (
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 w-full text-left rounded-r">
                                    <div className="flex">
                                        <div className="ml-3">
                                            <p className="text-sm text-yellow-700">
                                                <span className="font-bold block text-yellow-800 mb-1">⚠️ High Crowd Alert</span>
                                                {suggestion.message}
                                                <br/>
                                                <span className="text-xs italic mt-1 block">{suggestion.reason}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="bg-gray-50 rounded-xl p-4 w-full mb-6 text-center border border-gray-100">
                                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Passenger</p>
                                <p className="font-bold text-gray-800">John Doe (1 Adult)</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                                <XCircle className="w-10 h-10 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Invalid Ticket</h2>
                            <p className="text-gray-500 text-center mb-6">This ticket has expired or is invalid.</p>
                        </>
                    )}

                    <button
                        onClick={() => { setScanned(false); setSuggestion(null); }}
                        className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all"
                    >
                        Scan Another
                    </button>

                    <Link to="/dashboard" className="mt-4 text-sm text-gray-500 hover:text-gray-800">
                        Back to Dashboard
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ScanPage;
