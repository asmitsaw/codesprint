import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Activity, Users, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';

const data = [
    { name: '06:00', passengers: 4000 },
    { name: '07:00', passengers: 12000 },
    { name: '08:00', passengers: 35000 },
    { name: '09:00', passengers: 48000 },
    { name: '10:00', passengers: 42000 },
    { name: '11:00', passengers: 20000 },
    { name: '12:00', passengers: 15000 },
];

const AdminDashboard = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto p-8">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-brand-dark">Central Control Dashboard</h1>
                        <p className="text-gray-500">Real-time Network Monitoring</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-green-600">System Live</span>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard icon={<Users className="text-blue-600" />} label="Total Passengers Today" value="2.4M" change="+12% vs y'day" />
                    <StatCard icon={<Activity className="text-orange-500" />} label="Avg. Network Load" value="87%" change="Critical" isWarning />
                    <StatCard icon={<AlertTriangle className="text-red-500" />} label="Active Alerts" value="3" change="2 Delays" />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-brand-dark mb-6">Hourly Passenger Traffic (Churchgate)</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="passengers" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-brand-dark mb-6">Real-Time Crowd Density Trend</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="passengers" stroke="#dc2626" strokeWidth={3} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Live Station Status */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-brand-dark">Live Station Status</h2>
                    </div>
                    <table className="w-full">
                        <thead className="bg-gray-50 text-gray-500 text-sm">
                            <tr>
                                <th className="px-6 py-4 text-left font-medium">Station</th>
                                <th className="px-6 py-4 text-left font-medium">Line</th>
                                <th className="px-6 py-4 text-left font-medium">Current Load</th>
                                <th className="px-6 py-4 text-left font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <StationRow name="Dadar" line="Western / Central" load={95} />
                            <StationRow name="Andheri" line="Western" load={88} />
                            <StationRow name="Kurla" line="Central" load={92} />
                            <StationRow name="Borivali" line="Western" load={75} />
                            <StationRow name="Thane" line="Central" load={82} />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, change, isWarning }) => (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/50 hover:shadow-lg transition-all">
        <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/50 rounded-lg shadow-sm">{icon}</div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${isWarning ? 'bg-red-100/80 text-red-600' : 'bg-green-100/80 text-green-600'}`}>
                {change}
            </span>
        </div>
        <h3 className="text-4xl font-extrabold text-brand-navy mb-1">{value}</h3>
        <p className="text-gray-500 font-medium">{label}</p>
    </div>
);

const StationRow = ({ name, line, load }) => {
    let color = 'bg-green-500';
    if (load > 90) color = 'bg-red-500';
    else if (load > 70) color = 'bg-orange-500';

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 font-semibold text-gray-800">{name}</td>
            <td className="px-6 py-4 text-gray-600">{line}</td>
            <td className="px-6 py-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-[150px]">
                    <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${load}%` }}></div>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={`text-xs font-bold px-2 py-1 rounded-md text-white ${color}`}>
                    {load}% Full
                </span>
            </td>
        </tr>
    );
};

export default AdminDashboard;
