import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Search, Train, MapPin, AlertTriangle, RefreshCw } from "lucide-react";

// Hardcoded Schedule for Mahim Station
const mahimSchedule = [
  {
    id: "W001",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 1,
    crowd: "Low",
    arrivalTime: "04:28",
  },
  {
    id: "W001",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 2,
    crowd: "Low",
    arrivalTime: "06:58",
  },
  {
    id: "W002",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 1,
    crowd: "Low",
    arrivalTime: "04:38",
  },
  {
    id: "W002",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 2,
    crowd: "Low",
    arrivalTime: "07:11",
  },
  {
    id: "W004",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 1,
    crowd: "Low",
    arrivalTime: "05:01",
  },
  {
    id: "W004",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 2,
    crowd: "Low",
    arrivalTime: "07:32",
  },
  {
    id: "W006",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 3,
    crowd: "Low",
    arrivalTime: "05:25",
  },
  {
    id: "W006",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 4,
    crowd: "High",
    arrivalTime: "07:58",
  },
  {
    id: "W007",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 1,
    crowd: "Low",
    arrivalTime: "05:36",
  },
  {
    id: "W007",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 2,
    crowd: "High",
    arrivalTime: "08:12",
  },
  {
    id: "W010",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 3,
    crowd: "Low",
    arrivalTime: "06:08",
  },
  {
    id: "W010",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 2,
    crowd: "High",
    arrivalTime: "08:39",
  },
  {
    id: "W011",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 1,
    crowd: "Low",
    arrivalTime: "06:17",
  },
  {
    id: "W011",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 4,
    crowd: "High",
    arrivalTime: "08:47",
  },
  {
    id: "W014",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 1,
    crowd: "Medium",
    arrivalTime: "06:41",
  },
  {
    id: "W014",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 2,
    crowd: "High",
    arrivalTime: "09:13",
  },
  {
    id: "W015",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 3,
    crowd: "Medium",
    arrivalTime: "06:49",
  },
  {
    id: "W015",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 2,
    crowd: "High",
    arrivalTime: "09:22",
  },
  {
    id: "W017",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 1,
    crowd: "Medium",
    arrivalTime: "07:04",
  },
  {
    id: "W017",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 4,
    crowd: "High",
    arrivalTime: "09:34",
  },
  {
    id: "W020",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 3,
    crowd: "High",
    arrivalTime: "07:24",
  },
  {
    id: "W020",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 2,
    crowd: "High",
    arrivalTime: "09:54",
  },
  {
    id: "W021",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 1,
    crowd: "High",
    arrivalTime: "07:28",
  },
  {
    id: "W021",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 2,
    crowd: "High",
    arrivalTime: "10:01",
  },
  {
    id: "W024",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 1,
    crowd: "High",
    arrivalTime: "07:37",
  },
  {
    id: "W024",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 4,
    crowd: "High",
    arrivalTime: "10:09",
  },
  {
    id: "W026",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 3,
    crowd: "High",
    arrivalTime: "07:43",
  },
  {
    id: "W026",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 2,
    crowd: "High",
    arrivalTime: "10:15",
  },
  {
    id: "W028",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 1,
    crowd: "High",
    arrivalTime: "07:48",
  },
  {
    id: "W028",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 2,
    crowd: "High",
    arrivalTime: "10:20",
  },
  {
    id: "W030",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 3,
    crowd: "High",
    arrivalTime: "07:54",
  },
  {
    id: "W030",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 4,
    crowd: "High",
    arrivalTime: "10:25",
  },
  {
    id: "W205",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 3,
    crowd: "High",
    arrivalTime: "18:25",
  },
  {
    id: "W206",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 2,
    crowd: "High",
    arrivalTime: "21:00",
  },
  {
    id: "W207",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 1,
    crowd: "Medium",
    arrivalTime: "18:45",
  },
  {
    id: "W208",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 4,
    crowd: "Medium",
    arrivalTime: "21:15",
  },
  {
    id: "W209",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 3,
    crowd: "Medium",
    arrivalTime: "19:10",
  },
  {
    id: "W210",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 2,
    crowd: "Low",
    arrivalTime: "21:45",
  },
  {
    id: "W211",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 1,
    crowd: "Low",
    arrivalTime: "19:35",
  },
  {
    id: "W212",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 4,
    crowd: "Low",
    arrivalTime: "22:10",
  },
  {
    id: "W213",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 3,
    crowd: "Low",
    arrivalTime: "20:05",
  },
  {
    id: "W214",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 2,
    crowd: "Low",
    arrivalTime: "22:35",
  },
  {
    id: "W215",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 1,
    crowd: "Low",
    arrivalTime: "20:40",
  },
  {
    id: "W216",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 4,
    crowd: "Low",
    arrivalTime: "23:05",
  },
  {
    id: "W217",
    name: "Churchgate - Virar Slow Local",
    type: "Slow",
    platform: 3,
    crowd: "Low",
    arrivalTime: "21:15",
  },
  {
    id: "W218",
    name: "Virar - Churchgate Slow Local",
    type: "Slow",
    platform: 2,
    crowd: "Low",
    arrivalTime: "23:40",
  },
];

const LiveStatus = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [trains, setTrains] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    updateTrains();
    // Update every 10 seconds for real-time accuracy
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      updateTrains();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateTrains = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Filter and enhance trains with ETA
    const upcomingTrains = mahimSchedule
      .map((train) => {
        const [hours, minutes] = train.arrivalTime.split(":").map(Number);
        const trainMinutes = hours * 60 + minutes;
        const diffMinutes = trainMinutes - currentMinutes;

        // Calculate ETA
        let eta;
        if (diffMinutes < 0) {
          // Train already passed today, show tomorrow's time
          const tomorrowDiff = diffMinutes + 24 * 60;
          if (tomorrowDiff > 0) {
            eta =
              tomorrowDiff < 60
                ? `${tomorrowDiff} min`
                : `${Math.floor(tomorrowDiff / 60)}h ${tomorrowDiff % 60}m`;
          } else {
            return null; // Skip this train
          }
        } else {
          eta =
            diffMinutes < 60
              ? `${diffMinutes} min`
              : `${Math.floor(diffMinutes / 60)}h ${diffMinutes % 60}m`;
        }

        return {
          ...train,
          eta,
          diffMinutes: diffMinutes < 0 ? diffMinutes + 24 * 60 : diffMinutes,
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
                onClick={updateTrains}
                className="bg-brand-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-saffron transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Status List */}
        <div className="grid gap-6">
          {filteredTrains.length === 0 ? (
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
                      <div className="flex items-center font-bold text-green-600">
                        On Time
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
