import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Train, Search, Bell, Calendar, ArrowRight, Plus, Minus, Navigation as MyLocationIcon } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../components/Navbar';

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mumbai Railway Stations Data (Western Line - Churchgate to Andheri)
const stations = [
    { id: 1, name: 'Churchgate', lat: 18.9322, lng: 72.8264, platform: 'Platform 4', status: 'On Time' },
    { id: 2, name: 'Marine Lines', lat: 18.9467, lng: 72.8233, platform: 'Platform 2', status: 'On Time' },
    { id: 3, name: 'Charni Road', lat: 18.9534, lng: 72.8196, platform: 'Platform 3', status: 'On Time' },
    { id: 4, name: 'Grant Road', lat: 18.9629, lng: 72.8151, platform: 'Platform 1', status: '2 min late' },
    { id: 5, name: 'Mumbai Central', lat: 18.9685, lng: 72.8196, platform: 'Platform 5', status: 'On Time' },
    { id: 6, name: 'Mahalaxmi', lat: 18.9825, lng: 72.8231, platform: 'Platform 2', status: 'On Time' },
    { id: 7, name: 'Lower Parel', lat: 18.9961, lng: 72.8302, platform: 'Platform 3', status: 'On Time' },
    { id: 8, name: 'Elphinstone Road', lat: 19.0079, lng: 72.8319, platform: 'Platform 1', status: 'On Time' },
    { id: 9, name: 'Dadar', lat: 19.0176, lng: 72.8432, platform: 'Platform 6', status: 'On Time' },
    { id: 10, name: 'Matunga Road', lat: 19.0278, lng: 72.8453, platform: 'Platform 2', status: 'On Time' },
    { id: 11, name: 'Mahim', lat: 19.0401, lng: 72.8406, platform: 'Platform 4', status: 'On Time' },
    { id: 12, name: 'Bandra', lat: 19.0544, lng: 72.8406, platform: 'Platform 3', status: 'On Time' },
    { id: 13, name: 'Khar Road', lat: 19.0706, lng: 72.8377, platform: 'Platform 2', status: 'On Time' },
    { id: 14, name: 'Santacruz', lat: 19.0812, lng: 72.8410, platform: 'Platform 1', status: 'On Time' },
    { id: 15, name: 'Vile Parle', lat: 19.0974, lng: 72.8442, platform: 'Platform 5', status: 'On Time' },
    { id: 16, name: 'Andheri', lat: 19.1197, lng: 72.8464, platform: 'Platform 3', status: 'Arriving' }
];

// Create custom icons for stations
const createStationIcon = (isHighlight) => {
    return L.divIcon({
        className: 'custom-station-marker',
        html: `<div style="
            width: ${isHighlight ? '16px' : '12px'};
            height: ${isHighlight ? '16px' : '12px'};
            background-color: ${isHighlight ? '#5700d1' : '#2EC4B6'};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [isHighlight ? 16 : 12, isHighlight ? 16 : 12],
        iconAnchor: [isHighlight ? 8 : 6, isHighlight ? 8 : 6],
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
                <button onClick={handleZoomIn} className="p-3 hover:bg-gray-100 transition-colors border-b border-gray-100">
                    <Plus className="w-5 h-5 text-gray-900" />
                </button>
                <button onClick={handleZoomOut} className="p-3 hover:bg-gray-100 transition-colors">
                    <Minus className="w-5 h-5 text-gray-900" />
                </button>
            </div>
            <button onClick={handleLocate} className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors">
                <MyLocationIcon className="w-5 h-5 text-gray-900" />
            </button>
        </div>
    );
};

const LiveMap = () => {
    return (
        <>
            <style>{`
                .custom-station-marker {
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
            `}</style>
            <div className="min-h-screen overflow-hidden h-screen flex flex-col font-sans">
                <Navbar />

                {/* Main Layout: Split Screen */}
                <main className="flex flex-1 overflow-hidden relative">
                    {/* LEFT PANEL: Route List */}
                    <aside className="w-full lg:w-[480px] xl:w-[520px] flex flex-col bg-white/60 backdrop-blur-xl border-r border-purple-100 z-10 shadow-xl overflow-hidden shrink-0">
                        {/* Route Header Summary */}
                        <div className="px-6 pt-6 pb-2 shrink-0">
                            <div className="flex flex-col gap-1 mb-4">
                                <div className="flex items-center gap-2 text-purple-600 text-sm font-medium">
                                    <Calendar className="w-4 h-4" />
                                    <span>Today, Departs 10:30 AM</span>
                                </div>
                                <h1 className="text-gray-900 tracking-tight text-2xl font-bold leading-tight">
                                    Churchgate <span className="text-purple-700 mx-1">→</span> Andheri
                                </h1>
                                <p className="text-purple-600 text-sm">3 optimized routes found</p>
                            </div>
                            {/* Filters */}
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                <button className="px-4 py-1.5 rounded-full bg-purple-700 text-white text-sm font-medium shadow-sm whitespace-nowrap">All</button>
                                <button className="px-4 py-1.5 rounded-full bg-white border border-purple-200 text-gray-900 text-sm font-medium hover:bg-purple-50 transition-colors whitespace-nowrap">Fastest</button>
                                <button className="px-4 py-1.5 rounded-full bg-white border border-purple-200 text-gray-900 text-sm font-medium hover:bg-purple-50 transition-colors whitespace-nowrap">Direct</button>
                                <button className="px-4 py-1.5 rounded-full bg-white border border-purple-200 text-gray-900 text-sm font-medium hover:bg-purple-50 transition-colors whitespace-nowrap">AC Local</button>
                            </div>
                        </div>

                        {/* Route Cards Container */}
                        <div className="flex-1 overflow-y-auto p-6 pt-2 flex flex-col gap-4" style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#cbd5e1 transparent'
                        }}>
                            {/* CARD 1: BEST OPTION */}
                            <RouteCard
                                badge="Best Option"
                                badgeColor="purple"
                                badgeIcon="⭐"
                                badgeSubtext="Fastest Route"
                                duration="45 min"
                                departTime="10:30 AM"
                                arriveTime="11:15 AM"
                                fare="₹20"
                                route={[
                                    { type: 'train', name: 'Western Line', color: 'purple' },
                                    { type: 'switch' },
                                    { type: 'metro', name: 'Metro Line 1', color: 'teal' }
                                ]}
                                crowdLevel="moderate"
                                crowdPercent={60}
                                isBest={true}
                            />

                            {/* CARD 2: CHEAPEST OPTION */}
                            <RouteCard
                                badge="Cheapest Option"
                                badgeColor="green"
                                badgeIcon="💰"
                                duration="55 min"
                                departTime="10:45 AM"
                                arriveTime="11:40 AM"
                                fare="₹15"
                                route={[
                                    { type: 'train', name: 'Western Line (Slow)', color: 'purple', direct: true }
                                ]}
                                crowdLevel="high"
                                crowdPercent={90}
                            />

                            {/* CARD 3: LEAST CROWDED (COMFORT) */}
                            <RouteCard
                                badge="Least Crowded"
                                badgeColor="teal"
                                badgeIcon="🪑"
                                badgeSubtext="AC Available"
                                duration="50 min"
                                departTime="10:35 AM"
                                arriveTime="11:25 AM"
                                fare="₹65"
                                route={[
                                    { type: 'ac', name: 'AC Local', color: 'teal' },
                                    { type: 'switch' },
                                    { type: 'metro', name: 'Metro', color: 'teal' }
                                ]}
                                crowdLevel="low"
                                crowdPercent={25}
                            />

                            <div className="py-4 text-center">
                                <button className="text-sm font-medium text-purple-600 hover:text-purple-700 underline">View 2 more routes</button>
                            </div>
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

                            {/* Polyline connecting all stations (Western Line Route) */}
                            <Polyline
                                positions={stations.map(s => [s.lat, s.lng])}
                                color="#5700d1"
                                weight={4}
                                opacity={0.8}
                            />

                            {/* Station Markers */}
                            {stations.map((station, idx) => (
                                <Marker
                                    key={station.id}
                                    position={[station.lat, station.lng]}
                                    icon={createStationIcon(station.id === 1 || station.id === 16)}
                                >
                                    <Popup>
                                        <div className="text-sm">
                                            <p className="font-bold text-gray-900">{station.name}</p>
                                            <p className="text-xs text-gray-600">{station.platform}</p>
                                            <p className={`text-xs font-medium ${station.status.includes('late') ? 'text-red-600' : 'text-green-600'}`}>
                                                {station.status}
                                            </p>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}

                            {/* Map Controls */}
                            <MapController />
                        </MapContainer>

                        {/* Map Floating Info Card (Route Summary on Map) */}
                        <div className="absolute top-6 right-6 z-[1000] bg-white p-4 rounded-xl shadow-xl max-w-xs border border-purple-100">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-gray-900">Route Preview</h3>
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-medium">Live</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex flex-col items-center pt-1">
                                    <div className="size-2.5 rounded-full bg-purple-700"></div>
                                    <div className="w-0.5 h-8 bg-gray-200"></div>
                                    <div className="size-2.5 rounded-full border-2 border-purple-700 bg-white"></div>
                                </div>
                                <div className="flex flex-col gap-4 w-full">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Churchgate</p>
                                        <p className="text-xs text-gray-500">Platform 4 • On Time</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Andheri</p>
                                        <p className="text-xs text-gray-500">Est. Arrival 11:15 AM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
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
    isBest
}) => {
    const badgeColors = {
        purple: 'bg-purple-50 border-purple-200 text-purple-700',
        green: 'bg-gray-50 border-gray-200 text-green-700',
        teal: 'bg-teal-50 border-teal-200 text-teal-600'
    };

    const crowdColors = {
        low: { text: 'text-teal-600', bg: 'bg-teal-500', icon: '😊' },
        moderate: { text: 'text-yellow-700', bg: 'bg-yellow-500', icon: '👥' },
        high: { text: 'text-red-700', bg: 'bg-red-500', icon: '🚶' }
    };

    const borderClass = isBest ? 'border-2 border-purple-700' : 'border border-purple-200';

    return (
        <div className={`group relative flex flex-col gap-0 rounded-xl bg-white shadow-md ${borderClass} overflow-hidden transition-all hover:shadow-lg cursor-pointer`}>
            {/* Badge */}
            <div className={`${badgeColors[badgeColor]} px-4 py-1.5 flex justify-between items-center border-b ${badgeColor === 'purple' ? 'border-purple-200' : badgeColor === 'teal' ? 'border-teal-200' : 'border-gray-200'}`}>
                <div className="flex items-center gap-1.5">
                    <span className="text-[18px]">{badgeIcon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider">{badge}</span>
                </div>
                {badgeSubtext && <span className="text-xs font-semibold">{badgeSubtext}</span>}
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
                        <span className={`text-xl font-bold ${badgeColor === 'green' ? 'text-green-600' : 'text-gray-900'}`}>{fare}</span>
                        <span className="text-xs text-purple-600">Total fare</span>
                    </div>
                </div>

                {/* Route visualizer */}
                <div className="flex items-center gap-2 text-sm text-gray-900 bg-purple-50 p-2.5 rounded-lg border border-purple-100">
                    {route.map((segment, idx) => (
                        <React.Fragment key={idx}>
                            {segment.type === 'train' && (
                                <>
                                    <Train className={`w-5 h-5 ${segment.color === 'purple' ? 'text-purple-700' : 'text-teal-600'}`} />
                                    <span className="font-medium">{segment.name}</span>
                                </>
                            )}
                            {segment.type === 'metro' && (
                                <>
                                    <Train className="w-5 h-5 text-teal-600" />
                                    <span className="font-medium">{segment.name}</span>
                                </>
                            )}
                            {segment.type === 'ac' && (
                                <>
                                    <span className="text-teal-600">❄️</span>
                                    <span className="font-medium">{segment.name}</span>
                                </>
                            )}
                            {segment.type === 'switch' && (
                                <>
                                    <span className="text-gray-400">›</span>
                                    <span className="text-xs px-2 py-0.5 rounded bg-orange-100 text-orange-700 font-medium">Switch</span>
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
                            <span className="text-[18px]">{crowdColors[crowdLevel].icon}</span>
                            <span className={`text-xs font-medium ${crowdColors[crowdLevel].text}`}>
                                {crowdLevel === 'low' ? 'Low Crowd' : crowdLevel === 'moderate' ? 'Moderate Crowd' : 'High Density'}
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-purple-100 rounded-full overflow-hidden">
                            <div className={`h-full ${crowdColors[crowdLevel].bg}`} style={{ width: `${crowdPercent}%` }}></div>
                        </div>
                    </div>
                    <button className={`${isBest ? 'bg-purple-700 hover:bg-purple-800 text-white' : 'bg-purple-100 hover:bg-purple-200 text-purple-700'} text-sm font-medium px-5 py-2 rounded-lg transition-colors flex items-center gap-2`}>
                        Select {isBest && <ArrowRight className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LiveMap;
