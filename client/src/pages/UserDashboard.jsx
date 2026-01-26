import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { getLiveCrowdData, MOCK_TICKET } from '../utils/mockData';
import { Play, RotateCcw, Train, MapPin, Users, Ticket, AlertTriangle, Menu, UserCircle } from 'lucide-react';

const UserDashboard = () => {
    const [crowdData, setCrowdData] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        setCrowdData(getLiveCrowdData());
        const interval = setInterval(() => {
            setCrowdData(getLiveCrowdData());
        }, 5000);
        return () => clearInterval(interval);
    }, [refreshKey]);

    return (
        <div className="flex min-h-screen font-sans">
            {/* Sidebar for Desktop */}
            <aside className="hidden lg:flex flex-col w-64 bg-white/80 backdrop-blur-xl border-r border-white/40 fixed h-full z-20 shadow-lg">
                <div className="p-6 border-b border-gray-100 flex items-center space-x-2 bg-gradient-to-r from-brand-saffron/10 via-white to-brand-green/10">
                    <div className="w-10 h-10 bg-white border-2 border-brand-navy rounded-full flex items-center justify-center text-brand-navy p-1 shadow-md">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem" className="w-full h-full opacity-80" />
                    </div>
                    <div>
                        <span className="text-sm font-bold text-gray-400 block tracking-widest text-[10px] uppercase">Ministry of Railways</span>
                        <span className="text-lg font-extrabold text-brand-navy">UTS Digital</span>
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-2 mt-4">
                    <NavItem icon={<Play className="w-5 h-5" />} label="Dashboard" active />
                    <NavItem icon={<Ticket className="w-5 h-5" />} label="My Tickets" />
                    <NavItem icon={<AlertTriangle className="w-5 h-5" />} label="Alerts" />
                    <NavItem icon={<RotateCcw className="w-5 h-5" />} label="History" />
                </nav>

                {/* Republic Day Badge */}
                <div className="m-4 p-4 rounded-xl bg-gradient-to-br from-brand-saffron/10 via-white to-brand-green/10 border border-brand-saffron/20 text-center shadow-sm">
                    <h4 className="font-bold text-brand-navy text-sm mb-1">Happy Republic Day! 🇮🇳</h4>
                    <p className="text-xs text-brand-dark/70">Travel ticket-less today and celebrate freedom.</p>
                </div>

                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-sm shadow-md">JD</div>
                        <div>
                            <p className="text-sm font-bold text-gray-800">John Doe</p>
                            <p className="text-xs text-gray-500">Citizen</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 relative">
                {/* Mobile Header */}
                <div className="lg:hidden bg-white/90 backdrop-blur-md border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-10 shadow-sm bg-gradient-to-r from-brand-saffron/5 via-white to-brand-green/5">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full border-2 border-brand-navy bg-white p-1">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem" />
                        </div>
                        <span className="font-bold text-brand-navy">UTS Digital</span>
                    </div>
                    <button className="p-2 text-brand-navy"><Menu className="w-6 h-6" /></button>
                </div>

                <div className="max-w-6xl mx-auto p-4 lg:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-saffron via-brand-navy to-brand-green animate-pulse">Jai Hind, Commuter! 🇮🇳</h1>
                            <p className="text-gray-500 font-medium mt-1">Today is 26th Jan • Republic Day Special Service</p>
                        </div>
                        <button
                            onClick={() => setRefreshKey(k => k + 1)}
                            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium hover:bg-gray-50 hover:shadow-md transition-all text-brand-navy"
                        >
                            <RotateCcw className="w-4 h-4 mr-2" /> Refresh Status
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Active Ticket Card - Wide on mobile, 2/3 on desktop */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border-t-4 border-t-brand-saffron p-6 flex flex-col sm:flex-row justify-between relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-xs font-bold tracking-wider text-brand-navy uppercase mb-2 flex items-center">
                                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                                    My Active Ticket
                                </p>
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">Weekly Season Pass</h3>
                                <p className="text-gray-600 mb-4">Valid: <span className="font-semibold text-gray-900">Churchgate ⇄ Borivali (Fast Line)</span></p>

                                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                                    <span className="inline-flex items-center px-2 py-1 bg-brand-navy/10 text-brand-navy rounded text-xs font-bold border border-brand-navy/20">
                                        First Class
                                    </span>
                                    <span>• Expires in 3 days</span>
                                </div>

                                <button className="px-5 py-2.5 bg-gradient-to-r from-brand-navy to-blue-900 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center transform hover:-translate-y-0.5">
                                    <QrCode className="w-4 h-4 mr-2" /> Show Full QR Code
                                </button>
                            </div>

                            <div className="mt-6 sm:mt-0 flex items-center justify-center bg-gray-50 rounded-xl p-4 border border-gray-200 relative">
                                <QRCodeSVG value={JSON.stringify(MOCK_TICKET)} size={110} />
                                {/* Chakra Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                                    <div className="w-24 h-24 rounded-full border-4 border-brand-navy dashed"></div>
                                </div>
                            </div>

                            {/* Decorative Tiranga Bg */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-saffron/20 via-white to-transparent rounded-full blur-3xl -z-0 opacity-50 translate-x-1/3 -translate-y-1/3"></div>
                        </div>

                        {/* Suggestions Card */}
                        <div className="bg-white border-t-4 border-t-brand-green rounded-2xl p-6 relative overflow-hidden shadow-md">
                            <div className="relative z-10">
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="p-1.5 bg-green-100 rounded-lg">
                                        <Play className="w-4 h-4 text-green-700 fill-green-700" />
                                    </div>
                                    <span className="font-bold text-green-800 text-sm uppercase">Smart Suggestion</span>
                                </div>
                                <p className="text-gray-800 font-medium mb-2">Avoid Dadar Platform 3.</p>
                                <p className="text-sm text-gray-600 mb-4 leading-relaxed">High congestion reported due to rush hour. Use Metro Line 2A to Dahisar for a smoother connection.</p>

                                <a href="#" className="font-semibold text-brand-navy text-sm hover:underline flex items-center">View alternate route <span className="ml-1">→</span></a>
                            </div>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-2xl opacity-50 translate-x-1/2 translate-y-1/2"></div>
                        </div>
                    </div>

                    {/* Live Status Section */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-bold text-gray-900 flex items-center">
                                <span className="w-2.5 h-2.5 bg-red-500 rounded-full mr-2 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                                Live Crowd Status
                            </h3>
                            <div className="flex space-x-3 text-xs font-bold text-gray-500">
                                <span className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> Low</span>
                                <span className="flex items-center"><span className="w-2 h-2 bg-yellow-400 rounded-full mr-1"></span> Medium</span>
                                <span className="flex items-center"><span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span> High</span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-semibold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 text-left">Service & Time</th>
                                        <th className="px-6 py-4 text-left">Destination</th>
                                        <th className="px-6 py-4 text-center">PF</th>
                                        <th className="px-6 py-4 text-right">Crowd Level</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {crowdData.map((service) => (
                                        <tr key={service.id} className="hover:bg-orange-50/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className={`mr-3 p-2 rounded-lg transition-colors ${service.type === 'Metro' ? 'bg-purple-100 text-purple-700 group-hover:bg-purple-200' : 'bg-blue-100 text-brand-navy group-hover:bg-blue-200'}`}>
                                                        {service.type === 'Metro' ? <MapPin className="w-4 h-4" /> : <Train className="w-4 h-4" />}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900">{service.time} {service.name}</div>
                                                        <div className="text-xs text-gray-500">{service.type === 'Metro' ? 'Expected: On Time' : 'Every 10 mins'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 font-medium">{service.route.split(' - ')[1]}</td>
                                            <td className="px-6 py-4 text-center text-gray-500 font-mono">{service.platform}</td>
                                            <td className="px-6 py-4 text-right">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm ${service.crowdLevel === 'High' ? 'bg-red-50 text-red-700 border border-red-100' :
                                                    service.crowdLevel === 'Medium' ? 'bg-yellow-50 text-yellow-800 border border-yellow-100' : 'bg-green-50 text-green-700 border border-green-100'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${service.crowdLevel === 'High' ? 'bg-red-600' :
                                                        service.crowdLevel === 'Medium' ? 'bg-yellow-600' : 'bg-green-600'
                                                        }`}></span>
                                                    {service.crowdLevel}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
};

const NavItem = ({ icon, label, active }) => (
    <div className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${active ? 'bg-gradient-to-r from-brand-saffron to-brand-saffron/80 text-white font-bold shadow-md transform scale-105' : 'text-gray-600 hover:bg-gray-50 hover:text-brand-navy'}`}>
        {icon}
        <span>{label}</span>
    </div>
);

export default UserDashboard;
