import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Search, Clock, AlertTriangle, Train, ArrowRight } from 'lucide-react';

const LiveStatus = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const trains = [
        { id: '90210', name: 'Churchgate Fast', eta: '2 min', status: 'On Time', platform: '2', crowd: 'High' },
        { id: '90455', name: 'Virar Slow', eta: '8 min', status: 'Delayed (5m)', platform: '4', crowd: 'Medium' },
        { id: '90882', name: 'Borivali Fast', eta: '12 min', status: 'On Time', platform: '1', crowd: 'Low' },
        { id: '91234', name: 'Andheri Local', eta: '18 min', status: 'On Time', platform: '3', crowd: 'High' },
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Navbar />

            <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-brand-navy mb-4">Live Train Status</h1>
                    <p className="text-gray-600 text-lg">Real-time updates across Western, Central, and Harbour lines.</p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-12 relative z-10">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-saffron via-brand-white to-brand-green rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative flex items-center bg-white rounded-2xl shadow-xl overflow-hidden p-2">
                            <Search className="ml-4 w-6 h-6 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by Station or Train Number..."
                                className="w-full p-4 text-lg outline-none font-medium text-gray-700 placeholder-gray-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="bg-brand-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-saffron transition-colors">
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                {/* Status List */}
                <div className="grid gap-6">
                    {trains.map((train, i) => (
                        <div key={i} className="glass-card p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center space-x-4 w-full md:w-auto">
                                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-colors">
                                        <Train className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{train.name}</h3>
                                        <p className="text-sm text-gray-500 font-medium">#{train.id} • Platform {train.platform}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-8 w-full md:w-auto justify-between md:justify-end">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Crowd</p>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${train.crowd === 'High' ? 'bg-red-100 text-red-800' :
                                                train.crowd === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                            {train.crowd}
                                        </span>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Status</p>
                                        <div className={`flex items-center font-bold ${train.status.includes('Delayed') ? 'text-red-500' : 'text-green-600'}`}>
                                            {train.status.includes('Delayed') && <AlertTriangle className="w-4 h-4 mr-1" />}
                                            {train.status}
                                        </div>
                                    </div>

                                    <div className="text-right pl-4 border-l border-gray-100">
                                        <div className="text-xs text-gray-400 uppercase font-bold mb-1">Arriving In</div>
                                        <div className="text-2xl font-black text-brand-navy">{train.eta}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LiveStatus;
