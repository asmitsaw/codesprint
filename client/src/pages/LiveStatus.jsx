import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Search, Train, MapPin, AlertTriangle, RefreshCw } from "lucide-react";

// Helper function to randomize crowd level
const getRandomCrowd = () => {
  const crowds = ["Low", "Medium", "High"];
  return crowds[Math.floor(Math.random() * crowds.length)];
};

// Helper function to randomize train status
const getRandomStatus = () => {
  const statuses = [
    { label: "On Time", color: "text-green-600" },
    { label: "Delayed", color: "text-red-600" },
    { label: "Running", color: "text-blue-600" },
  ];
  // 70% chance On Time, 20% Delayed, 10% Running
  const rand = Math.random();
  if (rand < 0.7) return statuses[0];
  if (rand < 0.9) return statuses[1];
  return statuses[2];
};

// Helper function to get random platform
const getRandomPlatform = () => {
  return Math.floor(Math.random() * 4) + 1; // Platform 1-4
};

const LiveStatus = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Hardcoded time: January 26, 2026 at 4:58 PM (16:58)
  const hardcodedTime = new Date(2026, 0, 26, 16, 58, 0);
  const [currentTime, setCurrentTime] = useState(hardcodedTime);

  useEffect(() => {
    fetchTrainStatus();
    // Update every 30 seconds to simulate live updates
    const interval = setInterval(() => {
      fetchTrainStatus();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchTrainStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/train-status");
      if (!response.ok) {
        throw new Error("Failed to fetch train status");
      }
      const data = await response.json();
      processTrains(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching train status:", err);
      setError("Failed to load train data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const processTrains = (data) => {
    // Use hardcoded time: 4:58 PM (16:58)
    const currentMinutes = 16 * 60 + 58; // 16:58 = 1018 minutes from midnight

    // Process trains from database
    const upcomingTrains = data
      .map((train) => {
        // Parse Mahim Arrival time (format: HH:MM)
        const arrivalTime = train.mahim_arrival || train.mahimArrival || "";
        if (!arrivalTime) return null;

        const [hours, minutes] = arrivalTime.split(":").map(Number);
        const trainMinutes = hours * 60 + minutes;
        let diffMinutes = trainMinutes - currentMinutes;

        // Calculate ETA
        let eta;
        if (diffMinutes < 0) {
          // Train already passed today, show tomorrow's time
          const tomorrowDiff = diffMinutes + 24 * 60;
          if (tomorrowDiff > 0) {
            const hrs = Math.floor(tomorrowDiff / 60);
            const mins = tomorrowDiff % 60;
            eta =
              tomorrowDiff < 60 ? `${tomorrowDiff} min` : `${hrs}h ${mins}m`;
            diffMinutes = tomorrowDiff;
          } else {
            return null; // Skip this train
          }
        } else {
          // Train is coming today
          const hrs = Math.floor(diffMinutes / 60);
          const mins = diffMinutes % 60;
          eta = diffMinutes < 60 ? `${diffMinutes} min` : `${hrs}h ${mins}m`;
        }

        // Create train route name from start and end times
        const startTime = train.start_time || train.startTime || "";
        const endTime = train.end_time || train.endTime || "";
        const trainType = train.type || "Local";
        const trainId = train.train_id || train.trainId || "UNKNOWN";

        // Generate route name (e.g., "Churchgate - Virar Slow Local")
        const routeName = `${trainType} Train`;

        return {
          id: trainId,
          name: routeName,
          type: trainType,
          platform: getRandomPlatform(),
          crowd: getRandomCrowd(),
          status: getRandomStatus(),
          arrivalTime: arrivalTime,
          startTime: startTime,
          endTime: endTime,
          eta,
          diffMinutes,
        };
      })
      .filter((train) => train !== null)
      .sort((a, b) => a.diffMinutes - b.diffMinutes)
      .slice(0, 20); // Show next 20 trains

    setTrains(upcomingTrains);
  };

  const filteredTrains = trains.filter(
    (train) =>
      train.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      train.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      <div className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-bold text-blue-700">
              Showing trains arriving at Mahim Junction
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-brand-navy mb-4">
            Live Train Status
          </h1>
          <p className="text-gray-600 text-lg">
            Real-time schedule for Mahim Station
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Current Time: {currentTime.toLocaleTimeString()}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 relative z-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-brand-saffron via-brand-white to-brand-green rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl overflow-hidden p-2">
              <Search className="ml-4 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Train ID or Route..."
                className="w-full p-4 text-lg outline-none font-medium text-gray-700 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={fetchTrainStatus}
                className="bg-brand-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-saffron transition-colors flex items-center gap-2"
                disabled={loading}
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Status List */}
        <div className="grid gap-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-navy mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">
                Loading train status...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 mx-auto text-red-400 mb-4" />
              <p className="text-gray-600 font-medium">{error}</p>
              <button
                onClick={fetchTrainStatus}
                className="mt-4 px-6 py-2 bg-brand-navy text-white rounded-lg font-semibold hover:bg-brand-saffron transition-colors"
              >
                Retry
              </button>
            </div>
          ) : filteredTrains.length === 0 ? (
            <div className="text-center py-12">
              <Train className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 font-medium">
                No upcoming trains found
              </p>
            </div>
          ) : (
            filteredTrains.map((train, i) => (
              <div
                key={`${train.id}-${i}`}
                className="glass-card p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-4 w-full md:w-auto">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-colors">
                      <Train className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {train.name}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium">
                        #{train.id} • {train.type} • Platform {train.platform} •
                        Arrives: {train.arrivalTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-center">
                      <p className="text-xs text-gray-400 uppercase font-bold mb-1">
                        Crowd
                      </p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          train.crowd === "High"
                            ? "bg-red-100 text-red-800"
                            : train.crowd === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {train.crowd}
                      </span>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-400 uppercase font-bold mb-1">
                        Status
                      </p>
                      <div
                        className={`flex items-center font-bold ${train.status.color}`}
                      >
                        {train.status.label}
                      </div>
                    </div>

                    <div className="text-right pl-4 border-l border-gray-100">
                      <div className="text-xs text-gray-400 uppercase font-bold mb-1">
                        Arriving In
                      </div>
                      <div className="text-2xl font-black text-brand-navy">
                        {train.eta}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveStatus;
