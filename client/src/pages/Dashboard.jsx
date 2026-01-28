import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Train,
  MapPin,
  Ticket,
  TrendingUp,
  Clock,
  Users,
  AlertCircle,
  Calendar,
  ArrowRight,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useUser();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userLocation, setUserLocation] = useState(null);
  const [nearestStations, setNearestStations] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(true);

  // Mock data for crowd levels throughout the day
  const crowdData = [
    { time: "12 AM", crowd: 15 },
    { time: "1 AM", crowd: 10 },
    { time: "2 AM", crowd: 8 },
    { time: "3 AM", crowd: 5 },
    { time: "4 AM", crowd: 8 },
    { time: "5 AM", crowd: 25 },
    { time: "6 AM", crowd: 50 },
    { time: "7 AM", crowd: 85 },
    { time: "8 AM", crowd: 90 },
    { time: "9 AM", crowd: 75 },
    { time: "10 AM", crowd: 50 },
    { time: "11 AM", crowd: 45 },
    { time: "12 PM", crowd: 40 },
    { time: "1 PM", crowd: 35 },
    { time: "2 PM", crowd: 38 },
    { time: "3 PM", crowd: 45 },
    { time: "4 PM", crowd: 60 },
    { time: "5 PM", crowd: 85 },
    { time: "6 PM", crowd: 95 },
    { time: "7 PM", crowd: 88 },
    { time: "8 PM", crowd: 60 },
    { time: "9 PM", crowd: 45 },
    { time: "10 PM", crowd: 30 },
    { time: "11 PM", crowd: 20 },
  ];

  // Sample stations database with coordinates (replace with actual data)
  const stationsDatabase = [
    // Mumbai Local Railway Stations
    {
      id: 1,
      name: "Churchgate",
      type: "Railway",
      lat: 18.9322,
      lng: 72.8264,
      line: "Western Line",
    },
    {
      id: 2,
      name: "Marine Lines",
      type: "Railway",
      lat: 18.9447,
      lng: 72.8236,
      line: "Western Line",
    },
    {
      id: 3,
      name: "Charni Road",
      type: "Railway",
      lat: 18.9515,
      lng: 72.8202,
      line: "Western Line",
    },
    {
      id: 4,
      name: "Grant Road",
      type: "Railway",
      lat: 18.9631,
      lng: 72.8153,
      line: "Western Line",
    },
    {
      id: 5,
      name: "Mumbai Central",
      type: "Railway",
      lat: 18.9685,
      lng: 72.8199,
      line: "Western Line",
    },
    {
      id: 6,
      name: "Mahalaxmi",
      type: "Railway",
      lat: 18.9826,
      lng: 72.8235,
      line: "Western Line",
    },
    {
      id: 7,
      name: "Mahim",
      type: "Railway",
      lat: 19.0406,
      lng: 72.8397,
      line: "Western Line",
    },
    {
      id: 8,
      name: "Lower Parel",
      type: "Railway",
      lat: 18.9965,
      lng: 72.8308,
      line: "Western Line",
    },
    {
      id: 9,
      name: "Prabhadevi",
      type: "Railway",
      lat: 19.0144,
      lng: 72.829,
      line: "Western Line",
    },
    {
      id: 10,
      name: "Dadar",
      type: "Railway",
      lat: 19.0176,
      lng: 72.8432,
      line: "Western/Central Line",
    },
    {
      id: 11,
      name: "Bandra",
      type: "Railway",
      lat: 19.0544,
      lng: 72.841,
      line: "Western Line",
    },
    {
      id: 12,
      name: "Khar Road",
      type: "Railway",
      lat: 19.0697,
      lng: 72.8374,
      line: "Western Line",
    },
    {
      id: 13,
      name: "Santacruz",
      type: "Railway",
      lat: 19.0811,
      lng: 72.8409,
      line: "Western Line",
    },
    {
      id: 14,
      name: "Vile Parle",
      type: "Railway",
      lat: 19.097,
      lng: 72.8439,
      line: "Western Line",
    },
    {
      id: 15,
      name: "Andheri",
      type: "Railway",
      lat: 19.1197,
      lng: 72.8464,
      line: "Western Line",
    },
    {
      id: 16,
      name: "Jogeshwari",
      type: "Railway",
      lat: 19.1352,
      lng: 72.8495,
      line: "Western Line",
    },
    {
      id: 17,
      name: "CSMT",
      type: "Railway",
      lat: 18.9398,
      lng: 72.8355,
      line: "Central Line",
    },
    {
      id: 18,
      name: "Masjid",
      type: "Railway",
      lat: 18.9472,
      lng: 72.831,
      line: "Central Line",
    },
    {
      id: 19,
      name: "Sandhurst Road",
      type: "Railway",
      lat: 18.9543,
      lng: 72.8408,
      line: "Central Line",
    },
    {
      id: 20,
      name: "Byculla",
      type: "Railway",
      lat: 18.9794,
      lng: 72.8322,
      line: "Central Line",
    },
    {
      id: 21,
      name: "Chinchpokli",
      type: "Railway",
      lat: 18.9905,
      lng: 72.8344,
      line: "Central Line",
    },
    {
      id: 22,
      name: "Currey Road",
      type: "Railway",
      lat: 18.9962,
      lng: 72.8385,
      line: "Central Line",
    },
    {
      id: 23,
      name: "Parel",
      type: "Railway",
      lat: 19.0081,
      lng: 72.8397,
      line: "Central Line",
    },
    {
      id: 24,
      name: "Kurla",
      type: "Railway",
      lat: 19.0653,
      lng: 72.8789,
      line: "Central Line",
    },
    {
      id: 25,
      name: "Sion",
      type: "Railway",
      lat: 19.0432,
      lng: 72.8622,
      line: "Central Line",
    },
    {
      id: 26,
      name: "Wadala",
      type: "Railway",
      lat: 19.0166,
      lng: 72.8577,
      line: "Harbour Line",
    },

    // Mumbai Metro Stations
    {
      id: 27,
      name: "Versova Metro",
      type: "Metro",
      lat: 19.1301,
      lng: 72.8129,
      line: "Metro Line 1",
    },
    {
      id: 28,
      name: "DN Nagar Metro",
      type: "Metro",
      lat: 19.1297,
      lng: 72.8266,
      line: "Metro Line 1",
    },
    {
      id: 29,
      name: "Azad Nagar Metro",
      type: "Metro",
      lat: 19.1269,
      lng: 72.8358,
      line: "Metro Line 1",
    },
    {
      id: 30,
      name: "Andheri Metro",
      type: "Metro",
      lat: 19.1196,
      lng: 72.8478,
      line: "Metro Line 1",
    },
    {
      id: 31,
      name: "Western Express Highway Metro",
      type: "Metro",
      lat: 19.1094,
      lng: 72.866,
      line: "Metro Line 1",
    },
    {
      id: 32,
      name: "Ghatkopar Metro",
      type: "Metro",
      lat: 19.0863,
      lng: 72.9081,
      line: "Metro Line 1",
    },
    {
      id: 33,
      name: "Asalpha Metro",
      type: "Metro",
      lat: 19.0944,
      lng: 72.9004,
      line: "Metro Line 1",
    },
    {
      id: 34,
      name: "Jagruti Nagar Metro",
      type: "Metro",
      lat: 19.1034,
      lng: 72.8914,
      line: "Metro Line 1",
    },
    {
      id: 35,
      name: "Marol Naka Metro",
      type: "Metro",
      lat: 19.11,
      lng: 72.8807,
      line: "Metro Line 1",
    },
    {
      id: 36,
      name: "Chakala Metro",
      type: "Metro",
      lat: 19.1112,
      lng: 72.8732,
      line: "Metro Line 1",
    },
  ];

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Get user's location and find nearest stations
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          // Calculate distances to all stations
          const stationsWithDistance = stationsDatabase.map((station) => ({
            ...station,
            distance: calculateDistance(
              latitude,
              longitude,
              station.lat,
              station.lng,
            ),
          }));

          // Sort by distance and get top 2 (to make room for hardcoded Mahim)
          const nearest = stationsWithDistance
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 2);

          // Add hardcoded Mahim station with 500m distance
          const mahimStation = {
            id: 7,
            name: "Mahim",
            type: "Railway",
            lat: 19.0406,
            lng: 72.8397,
            line: "Western Line",
            distance: 0.5, // 500m = 0.5km
          };

          setNearestStations([mahimStation, ...nearest]);
          setLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoadingLocation(false);
          // Fallback to default location (Mumbai)
          setUserLocation({ lat: 19.076, lng: 72.8777 });
        },
      );
    } else {
      console.error("Geolocation not supported");
      setLoadingLocation(false);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/40 via-white to-green-50/40">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Welcome Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                {formatDate(currentTime)}
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Welcome back,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-saffron via-brand-navy to-brand-green">
                  {user?.firstName || "Traveler"}
                </span>
              </h1>
              <p className="text-gray-500 text-base flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {formatTime(currentTime)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2.5 rounded-xl bg-green-50 border border-green-100 flex items-center gap-2 shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-semibold text-sm">
                  All Systems Operational
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
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
            value="100K+"
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-brand-saffron" />
                  </div>
                  Quick Actions
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  to="/user-dashboard"
                  icon={<Ticket className="w-8 h-8" />}
                  title="My Tickets"
                  description="View all your tickets"
                  color="orange"
                />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  Recent Activity
                </h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </button>
              </div>
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

            {/* Live Crowd Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  Live Crowd Status
                </h3>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                  Live
                </span>
              </div>
              <div className="space-y-3">
                <CrowdStatusItem station="Mahim" crowd="Low" percentage={25} />
                <CrowdStatusItem station="Bandra" crowd="Low" percentage={20} />
                <CrowdStatusItem station="Dadar" crowd="Low" percentage={30} />
                <CrowdStatusItem
                  station="Andheri"
                  crowd="Low"
                  percentage={22}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Alerts & Info */}
          <div className="space-y-6">
            {/* Nearest Stations */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  Nearest Stations
                </h2>
                <Link
                  to="/map"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Map
                </Link>
              </div>

              {loadingLocation ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"></div>
                </div>
              ) : nearestStations.length > 0 ? (
                <div className="space-y-3">
                  {nearestStations.map((station, index) => (
                    <div
                      key={station.id}
                      className="p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2.5 rounded-xl ${station.type === "Metro" ? "bg-purple-50" : "bg-blue-50"} group-hover:scale-105 transition-transform duration-200`}
                        >
                          {station.type === "Metro" ? (
                            <Train className="w-5 h-5 text-purple-600" />
                          ) : (
                            <Train className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <h4 className="font-medium text-gray-900 truncate">
                              {station.name}
                            </h4>
                            <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-green-50 text-green-700 flex-shrink-0">
                              {station.distance < 1
                                ? `${(station.distance * 1000).toFixed(0)}m`
                                : `${station.distance.toFixed(1)}km`}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-md ${
                                station.type === "Metro"
                                  ? "bg-purple-50 text-purple-600"
                                  : "bg-blue-50 text-blue-600"
                              }`}
                            >
                              {station.type}
                            </span>
                            <span className="text-xs text-gray-400">
                              {station.line}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">
                    Unable to fetch nearest stations
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Please enable location access
                  </p>
                </div>
              )}
            </div>

            {/* Republic Day Special */}
            <div className="bg-gradient-to-br from-orange-50 via-white to-green-50 rounded-2xl shadow-sm border border-orange-100 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-saffron/20 to-brand-green/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-brand-green/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🇮🇳</span>
                  <h3 className="text-lg font-semibold text-brand-navy">
                    Republic Day Special
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Celebrate with 20% off on all season passes!
                </p>
                <Link
                  to="/ticketing"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-navy text-white rounded-xl text-sm font-semibold hover:bg-blue-900 transition-all hover:gap-3"
                >
                  Book Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* System Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  Network Status
                </h3>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                  Healthy
                </span>
              </div>
              <div className="space-y-3">
                <StatusBar
                  label="Western Line"
                  value={92}
                  color="bg-blue-500"
                />
                <StatusBar
                  label="Central Line"
                  value={88}
                  color="bg-green-500"
                />
                <StatusBar
                  label="Harbour Line"
                  value={95}
                  color="bg-purple-500"
                />
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
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      badge: "bg-blue-100 text-blue-700",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      badge: "bg-purple-100 text-purple-700",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      badge: "bg-green-100 text-green-700",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      badge: "bg-orange-100 text-orange-700",
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-2.5 rounded-xl ${colors.bg} ${colors.text} group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-lg ${colors.badge}`}
        >
          {change}
        </span>
      </div>
      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-0.5">
        {value}
      </h3>
      <p className="text-gray-500 font-medium text-sm">{label}</p>
    </div>
  );
};

// Action Card Component
const ActionCard = ({ to, icon, title, description, color }) => {
  const colorClasses = {
    purple: {
      bg: "bg-purple-50",
      hover: "hover:bg-purple-100",
      icon: "text-purple-600",
      border: "hover:border-purple-200",
    },
    blue: {
      bg: "bg-blue-50",
      hover: "hover:bg-blue-100",
      icon: "text-blue-600",
      border: "hover:border-blue-200",
    },
    green: {
      bg: "bg-green-50",
      hover: "hover:bg-green-100",
      icon: "text-green-600",
      border: "hover:border-green-200",
    },
    orange: {
      bg: "bg-orange-50",
      hover: "hover:bg-orange-100",
      icon: "text-orange-600",
      border: "hover:border-orange-200",
    },
  };

  const colors = colorClasses[color];

  return (
    <Link
      to={to}
      className={`p-4 rounded-xl border border-transparent ${colors.bg} ${colors.hover} ${colors.border} transition-all duration-300 cursor-pointer group`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`p-2.5 bg-white rounded-xl shadow-sm ${colors.icon} group-hover:scale-105 transition-transform duration-300`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-0.5">{title}</h3>
          <p className="text-sm text-gray-500 truncate">{description}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 group-hover:text-gray-600 transition-all duration-300 flex-shrink-0" />
      </div>
    </Link>
  );
};

// Activity Item Component
const ActivityItem = ({ icon, title, time, description }) => {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group">
      <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all duration-200">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <h4 className="font-medium text-gray-900 truncate">{title}</h4>
          <span className="text-xs text-gray-400 flex-shrink-0">{time}</span>
        </div>
        <p className="text-sm text-gray-500 truncate">{description}</p>
      </div>
    </div>
  );
};

// Alert Card Component
const AlertCard = ({ type, title, description, time }) => {
  const typeStyles = {
    warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
    info: "bg-blue-50 border-blue-200 text-blue-700",
    success: "bg-green-50 border-green-200 text-green-700",
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
    <div className="py-1">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{value}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

// Crowd Status Item Component
const CrowdStatusItem = ({ station, crowd, percentage }) => {
  const crowdColors = {
    Low: {
      bg: "bg-green-50",
      text: "text-green-700",
      bar: "bg-green-500",
      dot: "bg-green-500",
    },
    Medium: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      bar: "bg-yellow-500",
      dot: "bg-yellow-500",
    },
    High: {
      bg: "bg-red-50",
      text: "text-red-700",
      bar: "bg-red-500",
      dot: "bg-red-500",
    },
  };

  const colors = crowdColors[crowd];

  return (
    <div className="py-1">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
          <span className="text-sm font-medium text-gray-700">{station}</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-md font-medium ${colors.bg} ${colors.text}`}
          >
            {crowd}
          </span>
        </div>
        <span className="text-xs font-semibold text-gray-600">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full ${colors.bar} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Dashboard;
