import { Link } from "react-router-dom";
import {
  Activity,
  QrCode,
  Map,
  Bell,
  ChevronRight,
  Train,
  Users,
  Shield,
  ChevronLeft,
  Zap,
  Globe,
  TrendingUp,
  Clock,
  Star,
  Award,
  Smartphone,
  Sparkles,
  Navigation,
} from "lucide-react";
import { useState, useEffect } from "react";

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const heroImages = [
    "/images/trains.jpg",
    "/images/new-ac-local-trains-for-mumbai.jpg",
    "/images/mumbai-local-110521667-16x9_0.jpg",
    "/images/download.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length,
    );
  };

  return (
    <div className="min-h-screen font-sans flex flex-col overflow-x-hidden">
      {/* Enhanced Navbar with Premium Glassmorphism */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${scrollY > 50
          ? "bg-white/95 backdrop-blur-2xl shadow-2xl"
          : "bg-white/80 backdrop-blur-lg"
          } border-b-4 border-b-transparent`}
        style={{
          borderImage: "linear-gradient(to right, #FF9933, #FFFFFF, #138808) 1",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border-[3px] border-brand-navy animate-spin-slow group-hover:border-brand-saffron transition-colors"
                  style={{ animationDuration: "8s" }}
                ></div>
                <div
                  className="absolute inset-1 rounded-full border-[2px] border-brand-green/60 animate-spin-slow"
                  style={{ animationDuration: "12s", animationDirection: "reverse" }}
                ></div>
                <Train className="w-7 h-7 text-brand-navy group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter leading-none">
                  <span className="text-brand-saffron drop-shadow-md">APLI</span>
                  <span className="text-brand-navy mx-1">-</span>
                  <span className="text-brand-green drop-shadow-md">MUMBAI</span>
                </span>
                <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
                  Digital India
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/map"
                className="font-bold text-gray-700 hover:text-brand-navy transition-all hover:scale-110 duration-300"
              >
                Live Map
              </Link>
              <Link
                to="/ticketing"
                className="font-bold text-gray-700 hover:text-brand-navy transition-all hover:scale-110 duration-300"
              >
                Ticketing
              </Link>
              <Link
                to="/login"
                className="group px-8 py-3 rounded-full bg-gradient-to-r from-brand-saffron via-white to-brand-green text-brand-navy font-black shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-brand-navy to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center group-hover:text-white transition-colors">
                  Login{" "}
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                    className="w-6 h-4 ml-2 border border-white/30 shadow-sm rounded-sm"
                    alt="India"
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Mesh Gradient Background */}
      <section className="relative overflow-hidden min-h-[750px] flex items-center">
        {/* Premium Mesh Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100/90 via-white to-green-100/90"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-brand-saffron/20 via-transparent to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-brand-green/20 via-transparent to-transparent blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-brand-navy/5 via-transparent to-transparent blur-2xl"></div>
        </div>

        {/* Decorative Elements with Parallax */}
        <div
          className="absolute top-1/2 right-[-150px] w-[700px] h-[700px] border-[50px] border-brand-navy/5 rounded-full animate-spin-slow -translate-y-1/2 pointer-events-none"
          style={{ transform: `translateY(calc(-50% - ${scrollY * 0.2}px))` }}
        ></div>
        <div
          className="absolute top-1/4 left-[-100px] w-[400px] h-[400px] border-[30px] border-brand-saffron/5 rounded-full -translate-y-1/2 pointer-events-none animate-spin-slow"
          style={{
            animationDirection: "reverse",
            transform: `translateY(calc(-50% - ${scrollY * 0.3}px))`
          }}
        ></div>

        {/* Floating Particles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: i % 3 === 0 ? '#ff9933' : i % 3 === 1 ? '#000080' : '#138808',
              opacity: 0.3,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20 pb-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              {/* Premium Badge */}
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/60 backdrop-blur-xl border-2 border-white/80 text-brand-navy text-xs font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-4 h-4 mr-2 text-brand-saffron animate-pulse" />
                Proudly Made in India
                <Sparkles className="w-4 h-4 ml-2 text-brand-green animate-pulse" />
              </div>

              {/* Hero Headline - Refined Typography */}
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
                <span className="block text-gray-800 mb-2">
                  Desh Ki Raftaar.
                </span>
                <span className="block bg-gradient-to-r from-brand-saffron via-brand-navy to-brand-green bg-clip-text text-transparent drop-shadow-2xl">
                  Mumbai Ki Shaan.
                </span>
              </h1>

              {/* Refined Subtitle */}
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-semibold max-w-lg">
                Celebrating the spirit of the Republic with a{" "}
                <span className="text-brand-navy font-black">smarter</span>,{" "}
                <span className="text-brand-navy font-black">safer</span>, and{" "}
                <span className="text-brand-navy font-black">faster</span> commute
                for every Mumbaikar.
              </p>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <Link
                  to="/live-status"
                  className="group relative flex items-center justify-center px-10 py-6 rounded-2xl bg-gradient-to-r from-brand-navy via-blue-900 to-indigo-900 text-white font-black text-xl shadow-2xl hover:shadow-brand-navy/60 hover:scale-110 transition-all duration-300 overflow-hidden"
                  style={{ boxShadow: '0 20px 60px rgba(0, 0, 128, 0.3)' }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-brand-saffron to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <Activity className="w-6 h-6 mr-3 relative z-10 group-hover:animate-pulse" />
                  <span className="relative z-10">Check Live Status</span>
                  <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform relative z-10" />
                </Link>
                <Link
                  to="/digital-ticket"
                  className="group flex items-center justify-center px-10 py-6 rounded-2xl border-4 border-brand-navy bg-white/70 backdrop-blur-xl text-brand-navy font-black text-xl hover:bg-brand-navy hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110"
                >
                  <QrCode className="w-6 h-6 mr-3" />
                  Digital Ticket
                </Link>
              </div>

              {/* Stats Pills */}
              <div className="flex flex-wrap gap-4 pt-8">
                <StatPill icon={<Users className="w-5 h-5" />} value="7.5M+" label="Daily Users" />
                <StatPill icon={<Train className="w-5 h-5" />} value="2,800+" label="Trains/Day" />
                <StatPill icon={<Clock className="w-5 h-5" />} value="99.2%" label="On-Time" />
              </div>
            </div>

            {/* Premium Hero Image with Organic Mask */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-12 bg-gradient-to-tr from-brand-saffron/30 via-brand-navy/20 to-brand-green/30 rounded-[3rem] blur-3xl animate-pulse-grow"></div>

              {/* Image Container with Glassmorphism Border */}
              <div className="relative rounded-[2.5rem] overflow-hidden h-[580px] w-full group">
                <div className="absolute inset-0 rounded-[2.5rem] border-4 border-white/60 z-10 pointer-events-none shadow-2xl"></div>

                {/* Images with Ken Burns Effect */}
                {heroImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Mumbai Local ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${index === currentImageIndex
                      ? "opacity-100 scale-110"
                      : "opacity-0 scale-100"
                      }`}
                  />
                ))}

                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none"></div>

                {/* Premium Navigation Buttons */}
                <button
                  onClick={previousImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-5 rounded-2xl bg-white/95 hover:bg-white text-brand-navy shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-xl hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-5 rounded-2xl bg-white/95 hover:bg-white text-brand-navy shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-xl hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Premium Dots Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 bg-black/40 backdrop-blur-xl px-6 py-4 rounded-full shadow-2xl">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`transition-all rounded-full ${index === currentImageIndex
                        ? "bg-white w-12 h-3"
                        : "bg-white/50 hover:bg-white/80 w-3 h-3"
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Premium Floating Stats Cards */}
              <FloatingCard
                icon={<Users className="w-8 h-8" />}
                value="7.5M+"
                label="Daily Passengers"
                color="saffron"
                className="absolute -bottom-10 -left-14"
                delay={0}
              />
              <FloatingCard
                icon={<Train className="w-8 h-8" />}
                value="465+"
                label="Stations"
                color="navy"
                className="absolute -top-10 -right-14"
                delay={1}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Glassmorphism - More Spacing */}
      <section className="py-32 relative z-10">
        <div className="absolute inset-0 bg-white/70 backdrop-blur-xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-5 py-3 rounded-full bg-gradient-to-r from-brand-navy/10 to-brand-navy/5 backdrop-blur-sm border border-brand-navy/20 text-brand-navy text-sm font-black mb-6 uppercase tracking-widest shadow-lg">
              <Zap className="w-5 h-5 mr-2 text-brand-saffron" />
              Smart Features
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Modernizing Your Daily Commute
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
              Experience the future of urban transportation with AI-powered
              features designed specifically for Mumbai's unique needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Activity className="w-8 h-8" />}
              title="Real-Time Crowd Levels"
              desc="Avoid the 'Super Dense Crush Load'. Live occupancy data helps you choose the right train coach for a comfortable journey."
              gradient="from-orange-500 to-red-500"
              link="Learn more"
            />
            <FeatureCard
              icon={<QrCode className="w-8 h-8" />}
              title="Instant QR Ticketing"
              desc="No more queues at ATVMs. Book season passes or single journey tickets instantly with our seamless digital system."
              gradient="from-blue-600 to-indigo-700"
              link="Start Booking"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Smart AI Routing"
              desc="Our AI calculates suggested routes balancing time, cost, and crowd density for optimal travel experience."
              gradient="from-green-500 to-emerald-600"
              link="Plan Journey"
            />
            <FeatureCard
              icon={<Bell className="w-8 h-8" />}
              title="Live Alerts & Updates"
              desc="Get instant notifications about delays, platform changes, and important announcements in real-time."
              gradient="from-purple-500 to-pink-600"
              link="Enable Alerts"
            />
            <FeatureCard
              icon={<Map className="w-8 h-8" />}
              title="Interactive Map"
              desc="Track every train on Western, Central, and Harbour lines. Visualize delays and find your train instantly."
              gradient="from-cyan-500 to-blue-600"
              link="View Map"
            />
            <FeatureCard
              icon={<Smartphone className="w-8 h-8" />}
              title="Offline Mode"
              desc="Access your tickets, schedules, and saved routes even without internet connectivity during your commute."
              gradient="from-amber-500 to-orange-600"
              link="Learn More"
            />
          </div>
        </div>
      </section>

      {/* Stats Section - More Spacing */}
      <section className="py-28 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-white/50 to-green-50/80 backdrop-blur-sm -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCard
              icon={<Users className="w-10 h-10" />}
              value="7.5M+"
              label="Daily Commuters"
              color="saffron"
            />
            <StatsCard
              icon={<Train className="w-10 h-10" />}
              value="2,800+"
              label="Daily Services"
              color="navy"
            />
            <StatsCard
              icon={<Globe className="w-10 h-10" />}
              value="465+"
              label="Stations"
              color="green"
            />
            <StatsCard
              icon={<TrendingUp className="w-10 h-10" />}
              value="99.2%"
              label="Reliability"
              color="saffron"
            />
          </div>
        </div>
      </section>

      {/* Map Teaser with Texture Background - More Spacing */}
      <section className="py-32 relative z-10">
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] p-12 md:p-20 shadow-2xl overflow-hidden relative border-2 border-white/50 bg-gradient-to-br from-brand-navy via-blue-900 to-indigo-900 backdrop-blur-md">
            {/* Map Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}></div>
            </div>

            {/* Pulse Effect for Live Tracking */}
            <div className="absolute top-1/4 right-1/4 w-4 h-4">
              <div className="absolute inset-0 bg-brand-saffron rounded-full animate-pulse"></div>
              <div className="absolute inset-0 bg-brand-saffron rounded-full animate-ping"></div>
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center px-5 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 text-white text-xs font-black uppercase tracking-widest shadow-lg">
                  <Navigation className="w-4 h-4 mr-2 animate-pulse" />
                  Live Tracking
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                  Interactive Live Map
                </h2>
                <p className="text-blue-100 text-lg md:text-xl leading-relaxed font-medium">
                  Track every train on the Western, Central, and Harbour lines in
                  real-time. Visualize delays, check platform numbers, and find your
                  train instantly on our interactive map.
                </p>
                <div className="flex flex-wrap gap-5 pt-4">
                  <div className="flex items-center text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <div className="w-3 h-3 bg-brand-saffron rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm font-bold">Western Line</span>
                  </div>
                  <div className="flex items-center text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm font-bold">Central Line</span>
                  </div>
                  <div className="flex items-center text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm font-bold">Harbour Line</span>
                  </div>
                </div>
                <Link
                  to="/map"
                  className="inline-flex items-center px-10 py-5 bg-white text-brand-navy font-black text-lg rounded-2xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/20 hover:scale-110 duration-300 group"
                >
                  Open Full Screen Map
                  <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>

              {/* Map Preview with Texture */}
              <div className="relative h-[450px] rounded-3xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/30 p-8 flex items-center justify-center overflow-hidden shadow-2xl">
                {/* Map Texture Background */}
                <div className="absolute inset-0 opacity-20">
                  <Map className="w-full h-full text-white/40" strokeWidth={0.5} />
                </div>
                <div className="relative z-10 text-center text-white">
                  <Globe className="w-24 h-24 mx-auto mb-6 animate-pulse-grow text-white/90" />
                  <p className="text-xl font-bold">Real-time Train Tracking</p>
                  <p className="text-sm text-white/70 mt-2">465+ Stations Connected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials with Real Photos */}
      <section className="py-28 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/60 via-white/70 to-green-50/60 backdrop-blur-sm -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-5 py-3 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-sm font-black mb-6 uppercase tracking-widest shadow-lg backdrop-blur-sm">
              <Award className="w-5 h-5 mr-2" />
              Trusted by Millions
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
              Mumbai's Choice for Smart Commute
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                quote: "This app has transformed my daily commute. No more guessing which coach to board!",
                author: "Priya Sharma",
                role: "Daily Commuter, Andheri",
                rating: 5,
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=ff9933"
              },
              {
                quote: "Digital ticketing is a game-changer. Fast, convenient, and eco-friendly!",
                author: "Rahul Mehta",
                role: "IT Professional, Dadar",
                rating: 5,
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul&backgroundColor=000080"
              },
              {
                quote: "Real-time updates help me plan better. Never miss important meetings now!",
                author: "Sunita Patil",
                role: "Teacher, Borivali",
                rating: 5,
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita&backgroundColor=138808"
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group p-10 rounded-3xl bg-white/80 backdrop-blur-2xl border-2 border-white/80 shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-3 transition-all duration-500"
              >
                <div className="flex gap-2 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-brand-saffron text-brand-saffron" />
                  ))}
                </div>
                <p className="text-gray-800 text-lg mb-8 leading-relaxed italic font-medium">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full mr-4 border-4 border-white shadow-lg"
                  />
                  <div>
                    <p className="font-black text-gray-900 text-lg">{testimonial.author}</p>
                    <p className="text-sm text-gray-600 font-semibold">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-28 relative z-10">
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md -z-10"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-16 md:p-20 rounded-[2.5rem] bg-gradient-to-br from-brand-saffron via-brand-navy to-brand-green shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-black/30"></div>
            {/* Animated Grid */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 2px, transparent 2px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 2px, transparent 2px)
                `,
                backgroundSize: '50px 50px'
              }}></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                Ready to Transform <br />Your Commute?
              </h2>
              <p className="text-xl md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto font-semibold leading-relaxed">
                Join millions of Mumbaikars experiencing the future of urban
                transportation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/login"
                  className="px-12 py-6 bg-white text-brand-navy font-black text-xl rounded-2xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/30 hover:scale-110 duration-300"
                >
                  Get Started Now
                </Link>
                <Link
                  to="/map"
                  className="px-12 py-6 bg-white/20 backdrop-blur-xl text-white font-black text-xl rounded-2xl border-3 border-white/50 hover:bg-white/30 transition-all hover:scale-110 duration-300"
                >
                  Explore Features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="relative z-10 py-20 backdrop-blur-2xl bg-gradient-to-br from-white/60 via-white/80 to-white/60 border-t-2 border-white/60">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Train className="w-10 h-10 text-brand-navy" />
                <span className="text-3xl font-black text-brand-navy">
                  APLI-MUMBAI
                </span>
              </div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed font-medium">
                A Digital India initiative to modernize Mumbai's local train
                network with smart technology and real-time information.
              </p>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-saffron to-brand-green flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">🇮🇳</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-black text-gray-900 mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/map" className="text-gray-700 hover:text-brand-navy transition-colors font-semibold text-lg hover:translate-x-1 inline-block">Live Map</Link></li>
                <li><Link to="/ticketing" className="text-gray-700 hover:text-brand-navy transition-colors font-semibold text-lg hover:translate-x-1 inline-block">Ticketing</Link></li>
                <li><Link to="/live-status" className="text-gray-700 hover:text-brand-navy transition-colors font-semibold text-lg hover:translate-x-1 inline-block">Live Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-gray-900 mb-6 text-lg">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-700 hover:text-brand-navy transition-colors font-semibold text-lg hover:translate-x-1 inline-block">Help Center</a></li>
                <li><a href="#" className="text-gray-700 hover:text-brand-navy transition-colors font-semibold text-lg hover:translate-x-1 inline-block">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-700 hover:text-brand-navy transition-colors font-semibold text-lg hover:translate-x-1 inline-block">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t-2 border-gray-300/50 pt-10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-700 text-base mb-4 md:mb-0 font-semibold">
              © 2026 Ministry of Railways & MMRDA. Digital India Initiative.
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                className="w-10 h-7 border-2 border-gray-300 shadow-md rounded-sm"
                alt="India"
              />
              <span className="text-base text-gray-700 font-bold">Made with ❤️ in India</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Premium Feature Card with Enhanced Hover
const FeatureCard = ({ icon, title, desc, gradient, link }) => (
  <div className="group p-10 rounded-3xl bg-white/80 backdrop-blur-2xl border-2 border-white/80 shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-4 transition-all duration-500 relative overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-8 text-white shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
      {icon}
    </div>
    <h3 className="text-2xl font-black text-gray-900 mb-5 leading-tight">{title}</h3>
    <p className="text-gray-700 leading-relaxed mb-8 font-medium text-lg">{desc}</p>
    <a
      href="#"
      className="text-brand-navy font-black text-base flex items-center group-hover:underline group-hover:text-brand-saffron transition-colors"
    >
      {link} <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
    </a>
  </div>
);

// Premium Stats Card
const StatsCard = ({ icon, value, label, color }) => {
  const colors = {
    saffron: "from-orange-500 to-brand-saffron",
    navy: "from-blue-600 to-brand-navy",
    green: "from-green-500 to-brand-green",
  };

  return (
    <div className="group p-10 rounded-3xl bg-white/80 backdrop-blur-2xl border-2 border-white/80 shadow-xl hover:shadow-2xl hover:scale-110 hover:-translate-y-2 transition-all duration-500 text-center">
      <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${colors[color]} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
        {icon}
      </div>
      <p className="text-5xl font-black text-gray-900 mb-3">{value}</p>
      <p className="text-sm text-gray-600 font-bold uppercase tracking-widest">{label}</p>
    </div>
  );
};

// Premium Floating Card
const FloatingCard = ({ icon, value, label, color, className, delay }) => {
  const colors = {
    saffron: "from-orange-500 to-brand-saffron",
    navy: "from-blue-600 to-brand-navy",
    green: "from-green-500 to-brand-green",
  };

  return (
    <div
      className={`bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border-l-[6px] border-${color} flex items-center space-x-5 animate-bounce-slow ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`p-5 bg-gradient-to-br ${colors[color]} rounded-2xl text-white shadow-xl`}>
        {icon}
      </div>
      <div>
        <p className="text-4xl font-black text-gray-900">{value}</p>
        <p className="text-xs text-gray-600 font-bold uppercase tracking-widest mt-1">
          {label}
        </p>
      </div>
    </div>
  );
};

// Premium Stat Pill
const StatPill = ({ icon, value, label }) => (
  <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/80 backdrop-blur-xl border-2 border-white/90 shadow-lg hover:shadow-xl transition-all hover:scale-110 duration-300">
    <div className="text-brand-navy">{icon}</div>
    <div className="flex items-baseline gap-2">
      <span className="font-black text-gray-900 text-base">{value}</span>
      <span className="text-xs text-gray-600 font-bold">{label}</span>
    </div>
  </div>
);

export default LandingPage;
