import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Train,
  Search,
  Bell,
  Calendar,
  ArrowRight,
  Plus,
  Minus,
  Navigation as MyLocationIcon,
  MapPin,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/Navbar";
import { westernLineStations } from "../utils/stations";
import { calculateFare } from "../utils/fareCalculator";

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Mumbai Railway Stations Data (Western Line - Complete Churchgate to Virar)
const stations = [
  {
    id: 1,
    name: "Churchgate",
    lat: 18.9322,
    lng: 72.8264,
    platform: "Platform 4",
    status: "On Time",
  },
  {
    id: 2,
    name: "Marine Lines",
    lat: 18.9467,
    lng: 72.8233,
    platform: "Platform 2",
    status: "On Time",
  },
  {
    id: 3,
    name: "Charni Road",
    lat: 18.9534,
    lng: 72.8196,
    platform: "Platform 3",
    status: "On Time",
  },
  {
    id: 4,
    name: "Grant Road",
    lat: 18.9629,
    lng: 72.8151,
    platform: "Platform 1",
    status: "2 min late",
  },
  {
    id: 5,
    name: "Mumbai Central",
    lat: 18.9685,
    lng: 72.8196,
    platform: "Platform 5",
    status: "On Time",
  },
  {
    id: 6,
    name: "Mahalaxmi",
    lat: 18.9825,
    lng: 72.8231,
    platform: "Platform 2",
    status: "On Time",
  },
  {
    id: 7,
    name: "Lower Parel",
    lat: 18.9961,
    lng: 72.8302,
    platform: "Platform 3",
    status: "On Time",
  },
  {
    id: 8,
    name: "Elphinstone Road",
    lat: 19.0079,
    lng: 72.8319,
    platform: "Platform 1",
    status: "On Time",
  },
  {
    id: 9,
    name: "Dadar",
    lat: 19.0176,
    lng: 72.8432,
    platform: "Platform 6",
    status: "On Time",
  },
  {
    id: 10,
    name: "Matunga Road",
    lat: 19.0278,
    lng: 72.8453,
    platform: "Platform 2",
    status: "On Time",
  },
  {
    id: 11,
    name: "Mahim",
    lat: 19.0401,
    lng: 72.8406,
    platform: "Platform 4",
    status: "On Time",
  },
  {
    id: 12,
    name: "Bandra",
    lat: 19.0544,
    lng: 72.8406,
    platform: "Platform 3",
    status: "On Time",
  },
  {
    id: 13,
    name: "Khar Road",
    lat: 19.0706,
    lng: 72.8377,
    platform: "Platform 2",
    status: "On Time",
  },
  {
    id: 14,
    name: "Santacruz",
    lat: 19.0812,
    lng: 72.841,
    platform: "Platform 1",
    status: "On Time",
  },
  {
    id: 15,
    name: "Vile Parle",
    lat: 19.0974,
    lng: 72.8442,
    platform: "Platform 5",
    status: "On Time",
  },
  {
    id: 16,
    name: "Andheri",
    lat: 19.1197,
    lng: 72.8464,
    platform: "Platform 3",
    status: "On Time",
  },
  {
    id: 17,
    name: "Jogeshwari",
    lat: 19.1355,
    lng: 72.8454,
    platform: "Platform 2",
    status: "On Time",
  },
  {
    id: 18,
    name: "Ram Mandir",
    lat: 19.1486,
    lng: 72.8416,
    platform: "Platform 1",
    status: "On Time",
  },
  {
    id: 19,
    name: "Goregaon",
    lat: 19.1642,
    lng: 72.8479,
    platform: "Platform 4",
    status: "On Time",
  },
  {
    id: 20,
    name: "Malad",
    lat: 19.1869,
    lng: 72.8483,
    platform: "Platform 3",
    status: "On Time",
  },
  {
    id: 21,
    name: "Kandivali",
    lat: 19.2041,
    lng: 72.85,
    platform: "Platform 2",
    status: "On Time",
  },
  {
    id: 22,
    name: "Borivali",
    lat: 19.231,
    lng: 72.8565,
    platform: "Platform 5",
    status: "On Time",
  },
  {
    id: 23,
    name: "Dahisar",
    lat: 19.2561,
    lng: 72.8627,
    platform: "Platform 1",
    status: "On Time",
  },
  {
    id: 24,
    name: "Mira Road",
    lat: 19.2806,
    lng: 72.8691,
    platform: "Platform 3",
    status: "On Time",
  },
  {
    id: 25,
    name: "Bhayandar",
    lat: 19.3017,
    lng: 72.8526,
    platform: "Platform 2",
    status: "On Time",
  },
  {
    id: 26,
    name: "Naigaon",
    lat: 19.349,
    lng: 72.8567,
    platform: "Platform 1",
    status: "On Time",
  },
  {
    id: 27,
    name: "Vasai Road",
    lat: 19.3718,
    lng: 72.8231,
    platform: "Platform 4",
    status: "On Time",
  },
  {
    id: 28,
    name: "Nallasopara",
    lat: 19.4224,
    lng: 72.8199,
    platform: "Platform 2",
    status: "On Time",
  },
  {
    id: 29,
    name: "Virar",
    lat: 19.4559,
    lng: 72.8111,
    platform: "Platform 3",
    status: "On Time",
  },
];

// Create custom icons for stations
const createStationIcon = (isHighlight) => {
  return L.divIcon({
    className: "custom-station-marker",
    html: `<div style="
            width: ${isHighlight ? "16px" : "12px"};
            height: ${isHighlight ? "16px" : "12px"};
            background-color: ${isHighlight ? "#5700d1" : "#2EC4B6"};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>`,
    iconSize: [isHighlight ? 16 : 12, isHighlight ? 16 : 12],
    iconAnchor: [isHighlight ? 8 : 6, isHighlight ? 8 : 6],
  });
};

// Create source station icon (green)
const createSourceIcon = () => {
  return L.divIcon({
    className: "custom-station-marker",
    html: `<div style="
            width: 24px;
            height: 24px;
            background-color: #10b981;
            border: 4px solid white;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
        ">📍</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Create destination station icon (red)
const createDestinationIcon = () => {
  return L.divIcon({
    className: "custom-station-marker",
    html: `<div style="
            width: 24px;
            height: 24px;
            background-color: #ef4444;
            border: 4px solid white;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
        ">🎯</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Create train icon
const createTrainIcon = () => {
  return L.divIcon({
    className: "custom-train-marker",
    html: `<div style="
            width: 32px;
            height: 32px;
            background-color: #8b5cf6;
            border: 3px solid white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            animation: trainPulse 2s infinite;
        ">🚆</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

// Map Controller to handle zoom
const MapController = ({ onZoomIn, onZoomOut, onLocate }) => {
  const map = useMap();

  useEffect(() => {
    // This is just to get map instance
  }, [map]);

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const handleLocate = () => {
    map.setView([19.0176, 72.8432], 12); // Center on Dadar
  };

  return (
    <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-[1000]">
      <div className="bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
        <button
          onClick={handleZoomIn}
          className="p-3 hover:bg-gray-100 transition-colors border-b border-gray-100"
        >
          <Plus className="w-5 h-5 text-gray-900" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-3 hover:bg-gray-100 transition-colors"
        >
          <Minus className="w-5 h-5 text-gray-900" />
        </button>
      </div>
      <button
        onClick={handleLocate}
        className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
      >
        <MyLocationIcon className="w-5 h-5 text-gray-900" />
      </button>
    </div>
  );
};

const LiveMap = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [routes, setRoutes] = useState([]);
  const [showRoutes, setShowRoutes] = useState(false);
  const [trains, setTrains] = useState([]);
  const [selectedStations, setSelectedStations] = useState({
    source: null,
    destination: null,
  });

  // Calculate routes when source and destination are selected
  useEffect(() => {
    if (source && destination && source !== destination) {
      const sourceIndex = westernLineStations.indexOf(source);
      const destIndex = westernLineStations.indexOf(destination);
      const distance = Math.abs(destIndex - sourceIndex);

      // Find station coordinates
      const sourceStation = stations.find((s) => s.name === source);
      const destStation = stations.find((s) => s.name === destination);

      setSelectedStations({
        source: sourceStation || null,
        destination: destStation || null,
      });

      // Calculate fares for different classes
      const secondClassFare = calculateFare(
        source,
        destination,
        "Second Class",
        "Single Journey",
        1,
      );
      const firstClassFare = calculateFare(
        source,
        destination,
        "First Class",
        "Single Journey",
        1,
      );
      const acFare = calculateFare(
        source,
        destination,
        "AC Local",
        "Single Journey",
        1,
      );

      // Calculate estimated times (approximately 2 minutes per station)
      const fastTime = distance * 2;
      const slowTime = distance * 3;

      // Generate animated trains on the route
      if (sourceStation && destStation) {
        const trainCount = Math.min(3, Math.floor(distance / 3) + 1);
        const generatedTrains = [];

        for (let i = 0; i < trainCount; i++) {
          const progress = (i + 1) / (trainCount + 1);
          const lat =
            sourceStation.lat +
            (destStation.lat - sourceStation.lat) * progress;
          const lng =
            sourceStation.lng +
            (destStation.lng - sourceStation.lng) * progress;

          generatedTrains.push({
            id: `train-${i}`,
            lat,
            lng,
            name: i === 0 ? "Fast Local" : i === 1 ? "Slow Local" : "AC Local",
            type: i === 0 ? "Fast" : i === 1 ? "Slow" : "AC",
          });
        }

        setTrains(generatedTrains);
      }

      // Generate route options
      const generatedRoutes = [
        {
          id: 1,
          badge: "Best Option",
          badgeColor: "purple",
          badgeIcon: "⭐",
          badgeSubtext: "Fastest Route",
          duration: `${fastTime} min`,
          fare: `₹${firstClassFare}`,
          type: "Fast Local - First Class",
          crowdLevel: "moderate",
          crowdPercent: 60,
          class: "First Class",
          isBest: true,
        },
        {
          id: 2,
          badge: "Cheapest Option",
          badgeColor: "green",
          badgeIcon: "💰",
          duration: `${slowTime} min`,
          fare: `₹${secondClassFare}`,
          type: "Slow Local - Second Class",
          crowdLevel: "high",
          crowdPercent: 90,
          class: "Second Class",
          isBest: false,
        },
        {
          id: 3,
          badge: "Least Crowded",
          badgeColor: "teal",
          badgeIcon: "🪑",
          badgeSubtext: "AC Available",
          duration: `${fastTime} min`,
          fare: `₹${acFare}`,
          type: "AC Local",
          crowdLevel: "low",
          crowdPercent: 25,
          class: "AC Local",
          isBest: false,
        },
      ];

      setRoutes(generatedRoutes);
      setShowRoutes(true);
    } else {
      setRoutes([]);
      setShowRoutes(false);
      setTrains([]);
      setSelectedStations({ source: null, destination: null });
    }
  }, [source, destination]);

  // Filter routes based on active filter
  const filteredRoutes = routes.filter((route) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "fastest") return route.isBest;
    if (activeFilter === "direct") return route.class !== "AC Local";
    if (activeFilter === "ac") return route.class === "AC Local";
    return true;
  });

  const handleFindRoutes = () => {
    if (source && destination && source !== destination) {
      setShowRoutes(true);
    }
  };

  return (
    <>
      <style>{`
                .custom-station-marker, .custom-train-marker {
                    background: transparent !important;
                    border: none !important;
                }
                .leaflet-popup-content-wrapper {
                    border-radius: 0.75rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                }
                .leaflet-popup-tip {
                    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
                }
                .leaflet-container {
                    font-family: inherit;
                }
                @keyframes trainPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
            `}</style>
      <div className="min-h-screen overflow-hidden h-screen flex flex-col font-sans">
        <Navbar />

        {/* Main Layout: Split Screen */}
        <main className="flex flex-1 overflow-hidden relative">
          {/* LEFT PANEL: Route List */}
          <aside className="w-full lg:w-[480px] xl:w-[520px] flex flex-col bg-white/60 backdrop-blur-xl border-r border-purple-100 z-10 shadow-xl shrink-0 h-full">
            {/* Station Selection */}
            <div className="px-6 pt-6 pb-4 shrink-0 bg-gradient-to-br from-purple-50 to-white border-b border-purple-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-700" />
                Plan Your Journey
              </h2>

              {/* Source Selection */}
              <div className="mb-3">
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                  From
                </label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none font-semibold text-gray-800 transition-all"
                >
                  <option value="">Select Source Station</option>
                  {westernLineStations.map((station) => (
                    <option key={station} value={station}>
                      {station}
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination Selection */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                  To
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none font-semibold text-gray-800 transition-all"
                >
                  <option value="">Select Destination Station</option>
                  {westernLineStations.map((station) => (
                    <option key={station} value={station}>
                      {station}
                    </option>
                  ))}
                </select>
              </div>

              {/* Find Routes Button */}
              <button
                onClick={handleFindRoutes}
                disabled={!source || !destination || source === destination}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Find Optimized Routes
              </button>
            </div>

            {/* Route Header Summary */}
            {showRoutes && (
              <div className="px-6 pt-4 pb-2 shrink-0">
                <div className="flex flex-col gap-1 mb-4">
                  <div className="flex items-center gap-2 text-purple-600 text-sm font-medium">
                    <Calendar className="w-4 h-4" />
                    <span>Today, Departs Now</span>
                  </div>
                  <h1 className="text-gray-900 tracking-tight text-2xl font-bold leading-tight">
                    {source} <span className="text-purple-700 mx-1">→</span>{" "}
                    {destination}
                  </h1>
                  <p className="text-purple-600 text-sm">
                    {filteredRoutes.length} optimized routes found
                  </p>
                </div>
                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => setActiveFilter("all")}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-sm whitespace-nowrap transition-colors ${
                      activeFilter === "all"
                        ? "bg-purple-700 text-white"
                        : "bg-white border border-purple-200 text-gray-900 hover:bg-purple-50"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveFilter("fastest")}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-sm whitespace-nowrap transition-colors ${
                      activeFilter === "fastest"
                        ? "bg-purple-700 text-white"
                        : "bg-white border border-purple-200 text-gray-900 hover:bg-purple-50"
                    }`}
                  >
                    Fastest
                  </button>
                  <button
                    onClick={() => setActiveFilter("direct")}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-sm whitespace-nowrap transition-colors ${
                      activeFilter === "direct"
                        ? "bg-purple-700 text-white"
                        : "bg-white border border-purple-200 text-gray-900 hover:bg-purple-50"
                    }`}
                  >
                    Direct
                  </button>
                  <button
                    onClick={() => setActiveFilter("ac")}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-sm whitespace-nowrap transition-colors ${
                      activeFilter === "ac"
                        ? "bg-purple-700 text-white"
                        : "bg-white border border-purple-200 text-gray-900 hover:bg-purple-50"
                    }`}
                  >
                    AC Local
                  </button>
                </div>
              </div>
            )}

            {/* Route Cards Container */}
            <div
              className="flex-1 overflow-y-auto p-6 pt-2 flex flex-col gap-4 min-h-0"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#cbd5e1 transparent",
              }}
            >
              {!showRoutes ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Select Your Journey
                  </h3>
                  <p className="text-gray-600 max-w-xs">
                    Choose your source and destination stations to discover the
                    best routes for your trip.
                  </p>
                </div>
              ) : filteredRoutes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Train className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    No Routes Found
                  </h3>
                  <p className="text-gray-600 max-w-xs">
                    Try adjusting your filters or selecting different stations.
                  </p>
                </div>
              ) : (
                <>
                  {filteredRoutes.map((route) => (
                    <RouteCard
                      key={route.id}
                      badge={route.badge}
                      badgeColor={route.badgeColor}
                      badgeIcon={route.badgeIcon}
                      badgeSubtext={route.badgeSubtext}
                      duration={route.duration}
                      departTime={new Date().toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      arriveTime={new Date(
                        Date.now() + parseInt(route.duration) * 60000,
                      ).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      fare={route.fare}
                      route={[
                        {
                          type: "train",
                          name: route.type,
                          color: "purple",
                          direct: true,
                        },
                      ]}
                      crowdLevel={route.crowdLevel}
                      crowdPercent={route.crowdPercent}
                      isBest={route.isBest}
                      source={source}
                      destination={destination}
                    />
                  ))}
                </>
              )}
            </div>
          </aside>

          {/* RIGHT PANEL: Map View */}
          <section className="hidden lg:block flex-1 relative bg-gray-200 h-full">
            {/* Leaflet Map Container */}
            <MapContainer
              center={[19.0176, 72.8432]}
              zoom={12}
              className="w-full h-full z-0"
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Polyline connecting all stations (Western Line Route) - Background */}
              <Polyline
                positions={stations.map((s) => [s.lat, s.lng])}
                color="#cbd5e1"
                weight={3}
                opacity={0.5}
              />

              {/* Highlighted Route between selected stations */}
              {selectedStations.source &&
                selectedStations.destination &&
                (() => {
                  const sourceIndex = stations.findIndex(
                    (s) => s.name === source,
                  );
                  const destIndex = stations.findIndex(
                    (s) => s.name === destination,
                  );
                  const start = Math.min(sourceIndex, destIndex);
                  const end = Math.max(sourceIndex, destIndex);
                  const routeStations = stations.slice(start, end + 1);
                  return (
                    <Polyline
                      positions={routeStations.map((s) => [s.lat, s.lng])}
                      color="#8b5cf6"
                      weight={6}
                      opacity={0.9}
                    />
                  );
                })()}

              {/* Station Markers */}
              {stations.map((station, idx) => {
                const isSource = station.name === source;
                const isDestination = station.name === destination;
                const isOnRoute =
                  selectedStations.source &&
                  selectedStations.destination &&
                  (() => {
                    const sourceIndex = stations.findIndex(
                      (s) => s.name === source,
                    );
                    const destIndex = stations.findIndex(
                      (s) => s.name === destination,
                    );
                    const start = Math.min(sourceIndex, destIndex);
                    const end = Math.max(sourceIndex, destIndex);
                    return idx >= start && idx <= end;
                  })();

                return (
                  <Marker
                    key={station.id}
                    position={[station.lat, station.lng]}
                    icon={
                      isSource
                        ? createSourceIcon()
                        : isDestination
                          ? createDestinationIcon()
                          : createStationIcon(isOnRoute)
                    }
                  >
                    <Popup>
                      <div className="text-sm">
                        <p className="font-bold text-gray-900">
                          {station.name}
                        </p>
                        {isSource && (
                          <p className="text-xs text-green-600 font-bold">
                            📍 Source Station
                          </p>
                        )}
                        {isDestination && (
                          <p className="text-xs text-red-600 font-bold">
                            🎯 Destination Station
                          </p>
                        )}
                        <p className="text-xs text-gray-600">
                          {station.platform}
                        </p>
                        <p
                          className={`text-xs font-medium ${station.status.includes("late") ? "text-red-600" : "text-green-600"}`}
                        >
                          {station.status}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}

              {/* Animated Train Markers */}
              {trains.map((train) => (
                <Marker
                  key={train.id}
                  position={[train.lat, train.lng]}
                  icon={createTrainIcon()}
                >
                  <Popup>
                    <div className="text-sm">
                      <p className="font-bold text-purple-700">
                        🚆 {train.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        Type: {train.type}
                      </p>
                      <p className="text-xs text-green-600 font-medium">
                        In Transit
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Map Controls */}
              <MapController />
            </MapContainer>

            {/* Map Floating Info Card (Route Summary on Map) */}
            {showRoutes && source && destination && (
              <div className="absolute top-6 right-6 z-[1000] bg-white p-4 rounded-xl shadow-xl max-w-xs border border-purple-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">Route Preview</h3>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-medium">
                    Live
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center pt-1">
                    <div className="size-2.5 rounded-full bg-purple-700"></div>
                    <div className="w-0.5 h-8 bg-gray-200"></div>
                    <div className="size-2.5 rounded-full border-2 border-purple-700 bg-white"></div>
                  </div>
                  <div className="flex flex-col gap-4 w-full">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {source}
                      </p>
                      <p className="text-xs text-gray-500">
                        Platform 4 • On Time
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {destination}
                      </p>
                      <p className="text-xs text-gray-500">
                        Est. Arrival{" "}
                        {new Date(
                          Date.now() +
                            parseInt(routes[0]?.duration || 0) * 60000,
                        ).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

// Route Card Component
const RouteCard = ({
  badge,
  badgeColor,
  badgeIcon,
  badgeSubtext,
  duration,
  departTime,
  arriveTime,
  fare,
  route,
  crowdLevel,
  crowdPercent,
  isBest,
  source,
  destination,
}) => {
  const badgeColors = {
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    green: "bg-gray-50 border-gray-200 text-green-700",
    teal: "bg-teal-50 border-teal-200 text-teal-600",
  };

  const crowdColors = {
    low: { text: "text-teal-600", bg: "bg-teal-500", icon: "😊" },
    moderate: { text: "text-yellow-700", bg: "bg-yellow-500", icon: "👥" },
    high: { text: "text-red-700", bg: "bg-red-500", icon: "🚶" },
  };

  const borderClass = isBest
    ? "border-2 border-purple-700"
    : "border border-purple-200";

  return (
    <div
      className={`group relative flex flex-col gap-0 rounded-xl bg-white shadow-md ${borderClass} transition-all hover:shadow-lg cursor-pointer min-h-[200px]`}
    >
      {/* Badge */}
      <div
        className={`${badgeColors[badgeColor]} px-4 py-1.5 flex justify-between items-center border-b ${badgeColor === "purple" ? "border-purple-200" : badgeColor === "teal" ? "border-teal-200" : "border-gray-200"}`}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-[18px]">{badgeIcon}</span>
          <span className="text-xs font-bold uppercase tracking-wider">
            {badge}
          </span>
        </div>
        {badgeSubtext && (
          <span className="text-xs font-semibold">{badgeSubtext}</span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-gray-900">{duration}</span>
            <div className="flex items-center gap-1 text-purple-600 text-sm mt-1">
              <span>{departTime}</span>
              <ArrowRight className="w-4 h-4" />
              <span>{arriveTime}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span
              className={`text-xl font-bold ${badgeColor === "green" ? "text-green-600" : "text-gray-900"}`}
            >
              {fare}
            </span>
            <span className="text-xs text-purple-600">Total fare</span>
          </div>
        </div>

        {/* Route visualizer */}
        <div className="flex items-center gap-2 text-sm text-gray-900 bg-purple-50 p-2.5 rounded-lg border border-purple-100">
          {route.map((segment, idx) => (
            <React.Fragment key={idx}>
              {segment.type === "train" && (
                <>
                  <Train
                    className={`w-5 h-5 ${segment.color === "purple" ? "text-purple-700" : "text-teal-600"}`}
                  />
                  <span className="font-medium">{segment.name}</span>
                </>
              )}
              {segment.type === "metro" && (
                <>
                  <Train className="w-5 h-5 text-teal-600" />
                  <span className="font-medium">{segment.name}</span>
                </>
              )}
              {segment.type === "ac" && (
                <>
                  <span className="text-teal-600">❄️</span>
                  <span className="font-medium">{segment.name}</span>
                </>
              )}
              {segment.type === "switch" && (
                <>
                  <span className="text-gray-400">›</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-orange-100 text-orange-700 font-medium">
                    Switch
                  </span>
                  <span className="text-gray-400">›</span>
                </>
              )}
              {segment.direct && (
                <span className="ml-auto text-xs text-gray-500">Direct</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Crowd & Action */}
        <div className="flex items-center justify-between pt-2 border-t border-purple-100 mt-1">
          <div className="flex flex-col gap-1 w-1/2">
            <div className="flex items-center gap-2">
              <span className="text-[18px]">
                {crowdColors[crowdLevel].icon}
              </span>
              <span
                className={`text-xs font-medium ${crowdColors[crowdLevel].text}`}
              >
                {crowdLevel === "low"
                  ? "Low Crowd"
                  : crowdLevel === "moderate"
                    ? "Moderate Crowd"
                    : "High Density"}
              </span>
            </div>
            <div className="h-1.5 w-full bg-purple-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${crowdColors[crowdLevel].bg}`}
                style={{ width: `${crowdPercent}%` }}
              ></div>
            </div>
          </div>
          <button
            className={`${isBest ? "bg-purple-700 hover:bg-purple-800 text-white" : "bg-purple-100 hover:bg-purple-200 text-purple-700"} text-sm font-medium px-5 py-2 rounded-lg transition-colors flex items-center gap-2`}
          >
            Select {isBest && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
