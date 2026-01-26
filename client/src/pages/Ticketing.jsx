import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Train, Calendar, Users, Briefcase, CreditCard, ChevronRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Ticketing = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        source: '',
        destination: '',
        ticketType: 'Single Journey',
        class: 'First Class',
        passengers: 1
    });

    const handleBooking = (e) => {
        e.preventDefault();
        // Mimic booking process
        setTimeout(() => {
            navigate('/digital-ticket', { state: formData });
        }, 800);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Navbar />

            <div className="flex-grow flex items-center justify-center p-6 relative">
                {/* Background Decorative Elements */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-brand-saffron/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-green/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

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
                        <p className="text-lg text-gray-700 font-medium">Skip the queues. Get your digital QR ticket instantly and travel stress-free across Mumbai.</p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/60 rounded-xl border border-white shadow-sm">
                                <div className="text-3xl font-bold text-brand-navy mb-1">2.4s</div>
                                <div className="text-sm text-gray-600 font-semibold">Avg. Booking Time</div>
                            </div>
                            <div className="p-4 bg-white/60 rounded-xl border border-white shadow-sm">
                                <div className="text-3xl font-bold text-brand-navy mb-1">0%</div>
                                <div className="text-sm text-gray-600 font-semibold">Transaction Fee</div>
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
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">From</label>
                                    <input type="text" placeholder="Source Station" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 outline-none font-semibold text-gray-800" required
                                        onChange={e => setFormData({ ...formData, source: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">To</label>
                                    <input type="text" placeholder="Destination Station" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 outline-none font-semibold text-gray-800" required
                                        onChange={e => setFormData({ ...formData, destination: e.target.value })} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Class</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['Second', 'First', 'AC'].map((cls) => (
                                        <button
                                            key={cls}
                                            type="button"
                                            className={`py-3 rounded-xl border font-bold text-sm transition-all ${formData.class.includes(cls) ? 'bg-brand-navy text-white border-brand-navy shadow-lg' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                                            onClick={() => setFormData({ ...formData, class: cls + (cls === 'AC' ? ' Local' : ' Class') })}
                                        >
                                            {cls}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Ticket Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Single Journey', 'Return Journey'].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            className={`py-3 rounded-xl border font-bold text-sm transition-all ${formData.ticketType === type ? 'bg-brand-saffron text-white border-brand-saffron shadow-lg' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                                            onClick={() => setFormData({ ...formData, ticketType: type })}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" className="w-full py-4 mt-4 bg-gradient-to-r from-brand-navy to-blue-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center group">
                                <CreditCard className="w-5 h-5 mr-3" />
                                <span className="text-lg">Pay & Book Now</span>
                                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ticketing;
