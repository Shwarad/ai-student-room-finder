"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles, Star, Clock, Heart, TrendingUp, Crown,
  MapPin, Brain, ArrowRight, Building2, Users, Search
} from "lucide-react";
import { rooms } from "@/data/rooms";
import { useApp } from "@/context/AppContext";
import { cn, formatRent } from "@/lib/utils";
import RoomCard from "@/components/rooms/RoomCard";

const SECTIONS = [
  {
    id: "recommended",
    label: "AI Picks",
    icon: Sparkles,
    color: "from-indigo-500 to-purple-500",
    filter: (r: typeof rooms[0]) => r.aiMatchScore >= 85 && r.verified,
    sort: (a: typeof rooms[0], b: typeof rooms[0]) => b.aiMatchScore - a.aiMatchScore,
  },
  {
    id: "budget",
    label: "Budget Friendly",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
    filter: (r: typeof rooms[0]) => r.rent <= 5000,
    sort: (a: typeof rooms[0], b: typeof rooms[0]) => a.rent - b.rent,
  },
  {
    id: "toprated",
    label: "Top Rated",
    icon: Star,
    color: "from-amber-500 to-orange-500",
    filter: (r: typeof rooms[0]) => r.rating >= 4.5,
    sort: (a: typeof rooms[0], b: typeof rooms[0]) => b.rating - a.rating,
  },
  {
    id: "luxury",
    label: "Luxury Rooms",
    icon: Crown,
    color: "from-purple-500 to-pink-500",
    filter: (r: typeof rooms[0]) => r.rent >= 8000 && r.ac && r.furnished && r.wifi,
    sort: (a: typeof rooms[0], b: typeof rooms[0]) => b.safetyScore - a.safetyScore,
  },
  {
    id: "safest",
    label: "Safest",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
    filter: (r: typeof rooms[0]) => r.safetyScore >= 9,
    sort: (a: typeof rooms[0], b: typeof rooms[0]) => b.safetyScore - a.safetyScore,
  },
];

const citySectionData = [
  { city: "Delhi", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80", colleges: 7 },
  { city: "Mumbai", img: "https://images.unsplash.com/photo-1580581096469-c1b2cf87c1be?w=400&q=80", colleges: 6 },
  { city: "Bangalore", img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&q=80", colleges: 6 },
  { city: "Pune", img: "https://images.unsplash.com/photo-1625930305823-cbc4d4fd48a2?w=400&q=80", colleges: 5 },
  { city: "Hyderabad", img: "https://images.unsplash.com/photo-1640090256958-7f49e2dde31e?w=400&q=80", colleges: 5 },
  { city: "Chennai", img: "https://images.unsplash.com/photo-1652877432682-7e7b7adbd4a8?w=400&q=80", colleges: 5 },
];

export default function DashboardPage() {
  const { favorites, recentlyViewed } = useApp();
  const [activeSection, setActiveSection] = useState("recommended");

  const favRooms = rooms.filter((r) => favorites.includes(r.id));
  const recentRooms = recentlyViewed.map((id) => rooms.find((r) => r.id === id)).filter(Boolean) as typeof rooms;

  const currentSection = SECTIONS.find((s) => s.id === activeSection) || SECTIONS[0];
  const sectionRooms = rooms
    .filter(currentSection.filter)
    .sort(currentSection.sort)
    .slice(0, 8);

  const totalRooms = rooms.length;
  const avgRent = Math.round(rooms.reduce((s, r) => s + r.rent, 0) / rooms.length);
  const citiesCount = new Set(rooms.map((r) => r.city)).size;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#050918] via-[#0d1440] to-[#180c35] pt-14 pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-indigo-600/20 rounded-full filter blur-[100px] float-animation" />
          <div className="absolute bottom-[5%] right-[10%] w-96 h-96 bg-violet-600/15 rounded-full filter blur-[120px] float-animation" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-white/80 text-[0.8rem] font-medium mb-4">
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                AI-Powered Dashboard
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2.5 tracking-tight display-text">Find Your Room</h1>
              <p className="text-white/60 text-[0.95rem]">Discover, compare, and save your perfect student accommodation</p>
            </div>
            <Link
              href="/browse"
              className="flex items-center gap-2.5 gradient-bg text-white px-7 py-3.5 rounded-xl font-bold hover:opacity-90 shadow-xl shadow-indigo-900/30"
            >
              <Search className="w-5 h-5" />
              Browse All Rooms
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {[
              { icon: Building2, label: "Total Rooms", value: totalRooms },
              { icon: MapPin, label: "Cities", value: citiesCount },
              { icon: Heart, label: "Saved Rooms", value: favRooms.length },
              { icon: Clock, label: "Recently Viewed", value: recentRooms.length },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white/8 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                <Icon className="w-5 h-5 text-indigo-300 mb-3" />
                <div className="text-3xl font-extrabold text-white tracking-tight display-text">{value}</div>
                <div className="text-[0.8rem] text-white/55 font-medium mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 -mt-6 pb-16">
        {/* Recently Viewed */}
        {recentRooms.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5 tracking-tight">
                <Clock className="w-5 h-5 text-slate-400" />
                Recently Viewed
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentRooms.slice(0, 4).map((room, i) => (
                <motion.div key={room.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <RoomCard room={room} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Saved Rooms */}
        {favRooms.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5 tracking-tight">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                Saved Rooms
              </h2>
              <Link href="/favorites" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-4 flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favRooms.slice(0, 4).map((room, i) => (
                <motion.div key={room.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <RoomCard room={room} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Section Tabs */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Browse by Category</h2>
            <Link href="/browse" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-4 flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-2.5 mb-7">
            {SECTIONS.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
                  activeSection === id
                    ? `bg-gradient-to-r ${color} text-white shadow-lg`
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-600 shadow-sm"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectionRooms.slice(0, 8).map((room, i) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <RoomCard room={room} />
              </motion.div>
            ))}
            {sectionRooms.length === 0 && (
              <div className="col-span-4 text-center py-12 text-slate-400">No rooms match this category</div>
            )}
          </div>
        </div>

        {/* Cities */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5 tracking-tight">
              <MapPin className="w-5 h-5 text-slate-400" />
              Browse by City
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {citySectionData.map(({ city, img, colleges }) => {
              const count = rooms.filter((r) => r.city === city).length;
              return (
                <Link key={city} href={`/browse?city=${city}`} className="group relative overflow-hidden rounded-2xl aspect-square shadow-md hover:shadow-xl transition-shadow duration-300">
                  <img src={img} alt={city} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400"; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3.5">
                    <div className="text-white font-bold text-sm tracking-tight">{city}</div>
                    <div className="text-white/65 text-xs font-medium">{count} rooms</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* AI Features Banner */}
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 gradient-bg" />
          <div className="absolute inset-0 opacity-[0.08]" style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }} />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl" />
          <div className="relative px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-extrabold text-white mb-2.5 tracking-tight display-text">Try AI Assistant</h3>
              <p className="text-white/75 text-[0.9rem] max-w-sm leading-relaxed">
                Describe your dream room in plain text. AI will find, compare, and explain the best options.
              </p>
            </div>
            <Link
              href="/ai-assistant"
              className="shrink-0 flex items-center gap-2.5 bg-white text-indigo-700 px-7 py-3.5 rounded-xl font-extrabold hover:bg-indigo-50 transition-colors shadow-xl shadow-black/20"
            >
              <Sparkles className="w-5 h-5" />
              Ask AI Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
