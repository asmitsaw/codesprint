import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Train, MapPin, Ticket, TrendingUp, Clock, Users, AlertCircle, Calendar, ArrowRight } from 'lucide-react';

const Dashboard = () => {
    const { user } = useUser();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-saffron via-brand-navy to-brand-green">{user?.firstName || 'Traveler'}</span>! 🇮🇳
                            </h1>
                            <p className="text-gray-600 text-lg font-medium">
                                {formatDate(currentTime)} • {formatTime(currentTime)}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 rounded-full bg-green-100 border-2 border-green-200 flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-green-700 font-bold text-sm">System Online</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={<Train className="w-6 h-6" />}
                        label="Active Trains"
                        value="2,847"
                        change="+12%"
                        color="blue"
                    />
                    <StatCard
                        icon={<Users className="w-6 h-6" />}
                        label="Daily Passengers"
                        value="7.5M"
                        change="+8%"
                        color="purple"
                    />
                    <StatCard
                        icon={<Ticket className="w-6 h-6" />}
                        label="Your Tickets"
                        value="3"
                        change="Active"
                        color="green"
                    />
                    <StatCard
                        icon={<Clock className="w-6 h-6" />}
                        label="On-Time Rate"
                        value="94%"
                        change="+2%"
                        color="orange"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Quick Actions */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border-2 border-white/50 p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-brand-saffron" />
                                Quick Actions
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <ActionCard
                                    to="/map"
                                    icon={<MapPin className="w-8 h-8" />}
                                    title="Live Map"
                                    description="Track trains in real-time"
                                    color="purple"
                                />
                                <ActionCard
                                    to="/ticketing"
                                    icon={<Ticket className="w-8 h-8" />}
                                    title="Book Ticket"
                                    description="Quick ticket booking"
                                    color="blue"
                                />
                                <ActionCard
                                    to="/live-status"
                                    icon={<Train className="w-8 h-8" />}
                                    title="Live Status"
                                    description="Check train schedules"
                                    color="green"
                                />
                                <ActionCard
                                    to="/digital-ticket"
                                    icon={<Calendar className="w-8 h-8" />}
                                    title="My Tickets"
                                    description="View active passes"
                                    color="orange"
                                />
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border-2 border-white/50 p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                            <div className="space-y-4">
                                <ActivityItem
                                    icon={<Ticket className="w-5 h-5 text-blue-600" />}
                                    title="Season Pass Renewed"
                                    time="2 hours ago"
                                    description="Churchgate to Andheri - Valid till Feb 26"
                                />
                                <ActivityItem
                                    icon={<Train className="w-5 h-5 text-green-600" />}
                                    title="Journey Completed"
                                    time="Yesterday"
                                    description="Dadar to Bandra • 15 mins"
                                />
                                <ActivityItem
                                    icon={<MapPin className="w-5 h-5 text-purple-600" />}
                                    title="Route Searched"
                                    time="2 days ago"
                                    description="Best route: Churchgate → Andheri"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Alerts & Info */}
                    <div className="space-y-6">
                        {/* Live Alerts */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border-2 border-white/50 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                Live Alerts
                            </h2>
                            <div className="space-y-3">
                                <AlertCard
                                    type="warning"
                                    title="Moderate Delays"
                                    description="Western Line experiencing 5-10 min delays"
                                    time="10 mins ago"
                                />
                                <AlertCard
                                    type="info"
                                    title="Platform Change"
                                    description="Train to Virar now at Platform 2"
                                    time="25 mins ago"
                                />
                                <AlertCard
                                    type="success"
                                    title="Service Restored"
                                    description="Central Line running normally"
                                    time="1 hour ago"
                                />
                            </div>
                        </div>

                        {/* Republic Day Special */}
                        <div className="bg-gradient-to-br from-orange-100 via-white to-green-100 rounded-2xl shadow-lg border-4 border-transparent p-6 relative overflow-hidden" style={{ borderImage: 'linear-gradient(135deg, #FF9933, #FFFFFF, #138808) 1' }}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-saffron/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-brand-navy mb-2">🇮🇳 Republic Day Special</h3>
                                <p className="text-gray-700 mb-3">
                                    Celebrate with 20% off on all season passes!
                                </p>
                                <Link to="/ticketing" className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors">
                                    Book Now <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* System Stats */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border-2 border-white/50 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Network Status</h3>
                            <div className="space-y-3">
                                <StatusBar label="Western Line" value={92} color="bg-blue-500" />
                                <StatusBar label="Central Line" value={88} color="bg-green-500" />
                                <StatusBar label="Harbour Line" value={95} color="bg-purple-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Stat Card Component
const StatCard = ({ icon, label, value, change, color }) => {
    const colorClasses = {
        blue: 'from-blue-500 to-blue-600 bg-blue-50 text-blue-600',
        purple: 'from-purple-500 to-purple-600 bg-purple-50 text-purple-600',
        green: 'from-green-500 to-green-600 bg-green-50 text-green-600',
        orange: 'from-orange-500 to-orange-600 bg-orange-50 text-orange-600'
    };

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-md border-2 border-white/50 p-6 hover:shadow-lg transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-lg ${colorClasses[color].split(' ')[2]}`}>
                    {icon}
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
                    {change}
                </span>
            </div>
            <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{value}</h3>
            <p className="text-gray-600 font-medium text-sm">{label}</p>
        </div>
    );
};

// Action Card Component
const ActionCard = ({ to, icon, title, description, color }) => {
    const colorClasses = {
        purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
        blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
        green: 'bg-green-50 text-green-600 hover:bg-green-100',
        orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100'
    };

    return (
        <Link to={to} className={`p-4 rounded-xl ${colorClasses[color]} transition-all hover:scale-105 cursor-pointer group`}>
            <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>
    );
};

// Activity Item Component
const ActivityItem = ({ icon, title, time, description }) => {
    return (
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-gray-100 rounded-lg">
                {icon}
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900">{title}</h4>
                    <span className="text-xs text-gray-500">{time}</span>
                </div>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
};

// Alert Card Component
const AlertCard = ({ type, title, description, time }) => {
    const typeStyles = {
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
        info: 'bg-blue-50 border-blue-200 text-blue-700',
        success: 'bg-green-50 border-green-200 text-green-700'
    };

    return (
        <div className={`p-3 rounded-lg border-2 ${typeStyles[type]}`}>
            <div className="flex items-start justify-between mb-1">
                <h4 className="font-semibold text-sm">{title}</h4>
                <span className="text-xs opacity-70">{time}</span>
            </div>
            <p className="text-xs opacity-80">{description}</p>
        </div>
    );
};

// Status Bar Component
const StatusBar = ({ label, value, color }) => {
    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className="text-sm font-bold text-gray-900">{value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${value}%` }}></div>
            </div>
        </div>
    );
};

export default Dashboard;
