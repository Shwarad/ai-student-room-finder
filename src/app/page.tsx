"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search, Sparkles, MapPin, Building2, Brain, Shield, Star,
  ArrowRight, ChevronDown, Wifi, Utensils, Car, Wind,
  TrendingUp, Users, Award, Zap
} from "lucide-react";
import { rooms } from "@/data/rooms";
import RoomCard from "@/components/rooms/RoomCard";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(Math.round(current));
      if (current >= target) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { icon: Building2, label: "Rooms Available", value: 500, suffix: "+" },
  { icon: MapPin, label: "Cities Covered", value: 10, suffix: "+" },
  { icon: Users, label: "Colleges", value: 100, suffix: "+" },
  { icon: Brain, label: "AI Powered", value: 97, suffix: "%" },
];

const features = [
  {
    icon: Brain,
    title: "AI Match Score",
    description: "Every room gets an AI-powered 0–100% match score based on your budget, location, and lifestyle.",
    color: "from-indigo-500 to-purple-600",
    bg: "from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30",
  },
  {
    icon: Shield,
    title: "Safety Score",
    description: "AI-calculated safety ratings using CCTV, security, lighting, and nearby facilities.",
    color: "from-emerald-500 to-teal-500",
    bg: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description: "Describe what you need in plain text and our AI finds your perfect room instantly.",
    color: "from-violet-500 to-pink-500",
    bg: "from-violet-50 to-pink-50 dark:from-violet-950/30 dark:to-pink-950/30",
  },
  {
    icon: TrendingUp,
    title: "Rent Prediction",
    description: "AI predicts future rent trends so you can make smarter financial decisions.",
    color: "from-orange-500 to-amber-500",
    bg: "from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30",
  },
  {
    icon: Award,
    title: "Scam Detection",
    description: "Advanced AI flags suspicious listings to keep students safe from fraud.",
    color: "from-rose-500 to-red-500",
    bg: "from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30",
  },
  {
    icon: Zap,
    title: "Instant Comparison",
    description: "Compare up to 3 rooms side by side with an AI verdict on the best choice.",
    color: "from-blue-500 to-cyan-500",
    bg: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
  },
];

const amenityFeatures = [
  { icon: Wifi, label: "High-Speed WiFi" },
  { icon: Utensils, label: "Meals Included" },
  { icon: Shield, label: "24/7 Security" },
  { icon: Wind, label: "Air Conditioning" },
  { icon: Car, label: "Parking" },
  { icon: Zap, label: "Power Backup" },
];

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const cities = ["Delhi", "Mumbai", "Bangalore", "Pune", "Chennai", "Hyderabad"];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCity) params.set("city", selectedCity);
    router.push(`/browse?${params.toString()}`);
  };

  return (
    <div className="min-h-screen overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050918] via-[#0d1440] to-[#180c35]" />

        {/* Atmospheric orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[15%] left-[10%] w-[480px] h-[480px] bg-indigo-600/20 rounded-full filter blur-[120px] float-animation" />
          <div className="absolute top-[30%] right-[8%] w-[560px] h-[560px] bg-violet-600/15 rounded-full filter blur-[140px] float-animation" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-[10%] left-[35%] w-[400px] h-[400px] bg-blue-600/18 rounded-full filter blur-[100px] float-animation" style={{ animationDelay: "4s" }} />
        </div>

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-24 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/8 backdrop-blur-md border border-white/15 rounded-full text-white/80 text-[0.82rem] font-medium mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            Powered by IBM Granite AI
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white mb-7 display-text"
          >
            Find Your Perfect
            <br />
            <span className="gradient-text">Student Room</span>
            <br />
            <span className="text-white/90">with AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            AI-powered recommendations. Smart safety scores. Budget analysis.
            600+ verified rooms near top colleges across India.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto mb-10"
          >
            <div className="flex flex-col sm:flex-row gap-3 bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl p-2.5 shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
              <div className="flex-1 flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl px-5 py-3.5 shadow-sm">
                <Search className="w-5 h-5 text-indigo-500 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search by college, city, or room type..."
                  className="flex-1 bg-transparent text-slate-800 dark:text-white placeholder-slate-400 text-sm focus:outline-none font-medium"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-4 py-3.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-white rounded-xl text-sm focus:outline-none font-medium shadow-sm"
                >
                  <option value="">All Cities</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <button
                  onClick={handleSearch}
                  className="gradient-bg text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 whitespace-nowrap flex items-center gap-2 shadow-lg shadow-indigo-900/40"
                >
                  <Search className="w-4 h-4" />
                  Find Rooms
                </button>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14"
          >
            <Link
              href="/ai-assistant"
              className="flex items-center gap-2.5 px-7 py-3.5 bg-white text-indigo-700 rounded-xl font-bold text-[0.92rem] hover:bg-indigo-50 transition-colors shadow-xl shadow-black/20"
            >
              <Brain className="w-5 h-5" />
              Ask AI Assistant
            </Link>
            <Link
              href="/browse"
              className="flex items-center gap-2.5 px-7 py-3.5 border border-white/20 bg-white/8 backdrop-blur-sm text-white rounded-xl font-bold text-[0.92rem] hover:bg-white/15 transition-all"
            >
              <Search className="w-5 h-5" />
              Browse All Rooms
            </Link>
          </motion.div>

          {/* Amenity Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="flex flex-wrap justify-center gap-2.5"
          >
            {amenityFeatures.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-2 px-4 py-2 bg-white/8 backdrop-blur-sm border border-white/12 text-white/75 text-[0.8rem] font-medium rounded-full">
                <Icon className="w-3.5 h-3.5 text-indigo-300" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map(({ icon: Icon, label, value, suffix }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/25">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl font-extrabold gradient-text mb-2 tracking-tight display-text">
                  <AnimatedCounter target={value} suffix={suffix} />
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="section-padding-lg bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 text-[0.8rem] font-semibold rounded-full mb-5 tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Features
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-5 display-text">
              Why Students Choose <span className="gradient-text">AI RoomFinder</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
              Advanced AI makes your room search smarter, safer, and faster than ever before.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {features.map(({ icon: Icon, title, description, color, bg }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-7 shadow-[0_2px_16px_rgba(15,23,60,0.06)] hover:shadow-[0_16px_48px_rgba(15,23,60,0.12)] border border-slate-100 dark:border-slate-800 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-3 tracking-tight">{title}</h3>
                <p className="text-[0.88rem] text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="section-padding-lg bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-5 display-text">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Find your perfect room in 3 simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-[28%] right-[28%] h-px bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 dark:from-indigo-800 dark:via-purple-800 dark:to-indigo-800" />
            {[
              {
                step: "01",
                icon: Search,
                title: "Tell AI Your Needs",
                desc: "Enter your budget, college, and preferences. Our AI understands natural language.",
              },
              {
                step: "02",
                icon: Brain,
                title: "AI Analyzes Options",
                desc: "Our AI scans 600+ listings and scores each room for match, safety, and value.",
              },
              {
                step: "03",
                icon: Star,
                title: "Get Perfect Matches",
                desc: "Receive personalized recommendations with detailed explanations and comparisons.",
              },
            ].map(({ step, icon: Icon, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center px-4"
              >
                <div className="relative mb-7">
                  <div className="w-24 h-24 gradient-bg rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-500/25">
                    <Icon className="w-11 h-11 text-white" />
                  </div>
                  <span className="absolute -top-2.5 -right-2.5 w-8 h-8 bg-white dark:bg-slate-900 border-2 border-indigo-500 text-indigo-600 text-xs font-extrabold rounded-full flex items-center justify-center shadow-md">
                    {step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{title}</h3>
                <p className="text-[0.9rem] text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ROOMS ───────────────────────────────────── */}
      <section className="section-padding-lg bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[0.8rem] font-semibold rounded-full mb-4 tracking-wide">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                Top Rated
              </span>
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white display-text tracking-tight">
                Featured <span className="gradient-text">Rooms</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                {rooms.length}+ rooms verified and AI-scored
              </p>
            </div>
            <Link
              href="/browse"
              className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm hover:underline underline-offset-4"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {rooms
              .filter((r) => r.rating >= 4.5 && r.verified)
              .sort((a, b) => b.aiMatchScore - a.aiMatchScore)
              .slice(0, 6)
              .map((room, i) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <RoomCard room={room} />
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-800" />
        {/* Texture */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
        {/* Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full filter blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 border border-white/20 text-white/90 text-[0.8rem] font-semibold rounded-full mb-8">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Start for Free — No Registration Needed
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 display-text">
              Ready to Find Your
              <br />
              Dream Student Room?
            </h2>
            <p className="text-white/70 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
              Join thousands of students who found their perfect accommodation with AI RoomFinder.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link
                href="/browse"
                className="flex items-center gap-2.5 px-9 py-4 bg-white text-indigo-700 rounded-2xl font-extrabold text-lg hover:bg-indigo-50 transition-colors shadow-2xl shadow-black/25"
              >
                <Search className="w-5 h-5" />
                Browse Rooms
              </Link>
              <Link
                href="/ai-assistant"
                className="flex items-center gap-2.5 px-9 py-4 border-2 border-white/40 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-extrabold text-lg hover:bg-white/20 hover:border-white/60 transition-all"
              >
                <Brain className="w-5 h-5" />
                Ask AI
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
