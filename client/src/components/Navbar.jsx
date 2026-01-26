import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Train } from 'lucide-react';
import { useAuth, UserButton, SignedIn, SignedOut } from '@clerk/clerk-react';

const Navbar = () => {
    const location = useLocation();
    const { isSignedIn } = useAuth();

    const isActive = (path) => {
        return location.pathname === path ? 'text-brand-saffron bg-brand-navy/5 rounded-lg px-3 py-1' : 'text-gray-700 hover:text-brand-navy hover:bg-gray-50 rounded-lg px-3 py-1';
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-4 border-b-transparent shadow-sm" style={{ borderImage: 'linear-gradient(to right, #FF9933, #FFFFFF, #138808) 1' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-2 border-brand-navy animate-spin-slow group-hover:border-brand-saffron transition-colors"></div>
                            <Train className="w-6 h-6 text-brand-navy group-hover:text-brand-saffron transition-colors" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black tracking-tighter leading-none">
                                <span className="text-brand-saffron">BHARAT</span>
                                <span className="text-brand-navy mx-1">RAIL</span>
                                <span className="text-brand-green">MUMBAI</span>
                            </span>
                            <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Republic Day Edition</span>
                        </div>
                    </Link>
                    <div className="hidden md:flex items-center space-x-4">
                        {isSignedIn && (
                            <>
                                <Link to="/dashboard" className={`font-bold transition-all ${isActive('/dashboard')}`}>Dashboard</Link>
                                <Link to="/map" className={`font-bold transition-all ${isActive('/map')}`}>Live Map</Link>
                                <Link to="/ticketing" className={`font-bold transition-all ${isActive('/ticketing')}`}>Ticketing</Link>
                                <Link to="/live-status" className={`font-bold transition-all ${isActive('/live-status')}`}>Live Status</Link>
                            </>
                        )}

                        {/* Show Sign In button when signed out */}
                        <SignedOut>
                            <Link to="/sign-in" className="ml-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-saffron via-brand-white to-brand-green text-brand-navy font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all relative overflow-hidden group">
                                <span className="absolute inset-0 bg-brand-navy opacity-0 group-hover:opacity-10 transition-opacity"></span>
                                <span className="relative text-shadow-sm flex items-center">
                                    Sign In
                                </span>
                            </Link>
                        </SignedOut>

                        {/* Show User Profile when signed in */}
                        <SignedIn>
                            <div className="ml-4 flex items-center gap-3">
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-10 h-10 border-2 border-brand-navy hover:border-brand-saffron transition-colors",
                                            userButtonPopoverCard: "shadow-2xl",
                                            userButtonPopoverActionButton: "hover:bg-brand-navy/10",
                                            userButtonPopoverActionButton__signOut: "hover:bg-red-50 text-red-600"
                                        }
                                    }}
                                    afterSignOutUrl="/"
                                />
                            </div>
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
