import React from 'react';
import Navbar from '../components/Navbar';
import { Locate, Navigation, Layers, ZoomIn, ZoomOut, Train } from 'lucide-react';

const LiveMap = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Navbar />

            <div className="flex-grow relative overflow-hidden">
                {/* Map Placeholder */}
                <div className="absolute inset-0 bg-blue-50">
                    {/* Abstract Map Grid */}
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(#000080 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        opacity: 0.1
                    }}></div>

                    {/* Simulated Map lines for Rail Networks */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {/* Western Line (Reddish) */}
                        <path d="M 100 800 C 150 700, 200 500, 250 100" stroke="#FF4C4C" strokeWidth="4" fill="none" className="drop-shadow-md" />
                        {/* Central Line (Blueish) */}
                        <path d="M 300 800 C 350 600, 400 400, 550 50" stroke="#0074D9" strokeWidth="4" fill="none" className="drop-shadow-md" />
                        {/* Harbour Line (Greenish) */}
                        <path d="M 100 800 C 250 750, 400 700, 600 200" stroke="#2ECC40" strokeWidth="4" fill="none" className="drop-shadow-md" />
                    </svg>

                    {/* Moving Train Markers */}
                    <LinkToTrain x="250" y="100" name="Fast local to Churchgate" color="bg-red-500" />
                    <LinkToTrain x="380" y="450" name="Slow local to Kalyan" color="bg-blue-500" />
                    <LinkToTrain x="450" y="600" name="Panvel Express" color="bg-green-500" />

                </div>

                {/* Sidebar / Overlay */}
                <div className="absolute top-4 left-4 z-10 w-80">
                    <div className="glass-card p-6 rounded-2xl shadow-xl">
                        <div className="flex items-center space-x-3 mb-4 text-brand-navy">
                            <Train className="w-6 h-6" />
                            <h2 className="text-xl font-bold">Live Status</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="p-3 bg-white/50 rounded-lg border border-white/60">
                                <p className="text-xs text-gray-500 uppercase font-bold">Next Train - Churchgate</p>
                                <div className="flex justify-between items-end mt-1">
                                    <span className="text-lg font-bold text-gray-900">11:45 AM</span>
                                    <span className="text-sm font-medium text-green-600">On Time</span>
                                </div>
                            </div>
                            <div className="p-3 bg-white/50 rounded-lg border border-white/60">
                                <p className="text-xs text-gray-500 uppercase font-bold">Next Train - Dadar</p>
                                <div className="flex justify-between items-end mt-1">
                                    <span className="text-lg font-bold text-gray-900">11:52 AM</span>
                                    <span className="text-sm font-medium text-red-500">2 min late</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Controls */}
                <div className="absolute bottom-10 right-10 flex flex-col gap-3">
                    <MapButton icon={<Locate className="w-5 h-5" />} />
                    <MapButton icon={<ZoomIn className="w-5 h-5" />} />
                    <MapButton icon={<ZoomOut className="w-5 h-5" />} />
                    <MapButton icon={<Layers className="w-5 h-5" />} />
                </div>
            </div>
        </div>
    );
};

const LinkToTrain = ({ x, y, name, color }) => (
    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group" style={{ left: x + 'px', top: y + 'px' }}>
        <div className={`w-4 h-4 ${color} rounded-full border-2 border-white shadow-lg animate-pulse`}></div>
        <div className="absolute left-6 top-1/2 -translate-y-1/2 w-48 opacity-0 group-hover:opacity-100 transition-opacity bg-white p-2 rounded-lg shadow-xl text-xs font-bold text-gray-700 pointer-events-none z-20">
            {name}
        </div>
    </div>
);

const MapButton = ({ icon }) => (
    <button className="p-3 bg-white text-brand-navy rounded-full shadow-lg hover:bg-brand-saffron hover:text-white transition-all transform hover:scale-110">
        {icon}
    </button>
);

export default LiveMap;
