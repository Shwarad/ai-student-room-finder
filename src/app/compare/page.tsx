"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitCompare, X, Sparkles, CheckCircle, XCircle, Trophy,
  Star, MapPin, Wifi, Utensils, Car, ShieldCheck, Wind, Zap,
  Crown, PlusCircle
} from "lucide-react";
import { rooms } from "@/data/rooms";
import { useApp } from "@/context/AppContext";
import { Room } from "@/types/room";
import { cn, formatRent } from "@/lib/utils";
import { getAIVerdict } from "@/lib/aiEngine";

const COMPARE_FEATURES = [
  { key: "rent", label: "Monthly Rent", format: (r: Room) => formatRent(r.rent), type: "cost" },
  { key: "distance", label: "Distance from College", format: (r: Room) => `${r.distance}km`, type: "less" },
  { key: "rating", label: "Student Rating", format: (r: Room) => `${r.rating}/5 ⭐`, type: "more" },
  { key: "safetyScore", label: "Safety Score", format: (r: Room) => `${r.safetyScore}/10`, type: "more" },
  { key: "aiMatchScore", label: "AI Match Score", format: (r: Room) => `${r.aiMatchScore}%`, type: "more" },
  { key: "wifi", label: "WiFi", format: (r: Room) => r.wifi ? "✓ Yes" : "✗ No", type: "bool" },
  { key: "food", label: "Food/Mess", format: (r: Room) => r.food ? "✓ Yes" : "✗ No", type: "bool" },
  { key: "ac", label: "Air Conditioning", format: (r: Room) => r.ac ? "✓ Yes" : "✗ No", type: "bool" },
  { key: "parking", label: "Parking", format: (r: Room) => r.parking ? "✓ Yes" : "✗ No", type: "bool" },
  { key: "laundry", label: "Laundry", format: (r: Room) => r.laundry ? "✓ Yes" : "✗ No", type: "bool" },
  { key: "attachedBathroom", label: "Attached Bathroom", format: (r: Room) => r.attachedBathroom ? "✓ Yes" : "✗ No", type: "bool" },
  { key: "security", label: "Security Guard", format: (r: Room) => r.security ? "✓ Yes" : "✗ No", type: "bool" },
  { key: "cctv", label: "CCTV", format: (r: Room) => r.cctv ? "✓ Yes" : "✗ No", type: "bool" },
  { key: "powerBackup", label: "Power Backup", format: (r: Room) => r.powerBackup ? "✓ Yes" : "✗ No", type: "bool" },
  { key: "furnished", label: "Furnished", format: (r: Room) => r.furnished ? "✓ Yes" : "✗ No", type: "bool" },
  { key: "verified", label: "Verified Owner", format: (r: Room) => r.verified ? "✓ Verified" : "✗ Not verified", type: "bool" },
  { key: "deposit", label: "Security Deposit", format: (r: Room) => formatRent(r.deposit), type: "cost" },
  { key: "reviewsCount", label: "No. of Reviews", format: (r: Room) => `${r.reviewsCount} reviews`, type: "more" },
];

function getBestIndex(feature: typeof COMPARE_FEATURES[0], rooms: Room[]): number {
  if (rooms.length < 2) return 0;
  const values = rooms.map((r) => {
    const val = r[feature.key as keyof Room];
    return typeof val === "boolean" ? (val ? 1 : 0) : Number(val) || 0;
  });
  if (feature.type === "less") return values.indexOf(Math.min(...values));
  if (feature.type === "cost") return values.indexOf(Math.min(...values));
  return values.indexOf(Math.max(...values));
}

export default function ComparePage() {
  const { compareList, removeFromCompare, addToCompare } = useApp();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [aiVerdict, setAiVerdict] = useState("");
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    setSelectedIds(compareList.slice(0, 3));
  }, [compareList]);

  const selectedRooms = selectedIds.map((id) => rooms.find((r) => r.id === id)).filter(Boolean) as Room[];

  const handleGenerateVerdict = () => {
    const verdict = getAIVerdict(selectedRooms);
    setAiVerdict(verdict);
  };

  const filteredSearch = rooms.filter((r) =>
    !selectedIds.includes(r.id) &&
    (searchQ === "" || r.name.toLowerCase().includes(searchQ.toLowerCase()) || r.city.toLowerCase().includes(searchQ.toLowerCase()))
  ).slice(0, 8);

  const highlightMap = {
    bestValue: selectedRooms.reduce((best, room, i) => {
      const score = room.rating / (room.rent / 1000);
      const bestScore = selectedRooms[best] ? selectedRooms[best].rating / (selectedRooms[best].rent / 1000) : -1;
      return score > bestScore ? i : best;
    }, 0),
    cheapest: selectedRooms.reduce((idx, room, i) => room.rent < (selectedRooms[idx]?.rent ?? Infinity) ? i : idx, 0),
    safest: selectedRooms.reduce((idx, room, i) => room.safetyScore > (selectedRooms[idx]?.safetyScore ?? 0) ? i : idx, 0),
    highest: selectedRooms.reduce((idx, room, i) => room.rating > (selectedRooms[idx]?.rating ?? 0) ? i : idx, 0),
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <GitCompare className="w-8 h-8" />
            AI Room Comparison
          </h1>
          <p className="text-white/80">Select up to 3 rooms and get an AI-powered verdict</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Selected Rooms Bar */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[0, 1, 2].map((slot) => {
            const room = selectedRooms[slot];
            return (
              <div key={slot} className={cn(
                "rounded-2xl border-2 border-dashed p-4 text-center transition-all",
                room ? "bg-white dark:bg-slate-900 border-indigo-300 dark:border-indigo-700" : "bg-white/50 dark:bg-slate-900/50 border-slate-300 dark:border-slate-700"
              )}>
                {room ? (
                  <div>
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="w-full h-20 object-cover rounded-xl mb-2"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">{room.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{room.city}</p>
                    <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{formatRent(room.rent)}/mo</p>
                    {slot === highlightMap.safest && selectedRooms.length > 1 && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-[10px] rounded-full">Safest</span>
                    )}
                    {slot === highlightMap.cheapest && selectedRooms.length > 1 && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-[10px] rounded-full">Cheapest</span>
                    )}
                    {slot === highlightMap.highest && selectedRooms.length > 1 && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-[10px] rounded-full">Top Rated</span>
                    )}
                    <button
                      onClick={() => {
                        removeFromCompare(room.id);
                        setSelectedIds((prev) => prev.filter((id) => id !== room.id));
                      }}
                      className="mt-2 p-1 text-rose-400 hover:text-rose-600 transition-colors"
                    >
                      <X className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAddRoom(true)}
                    className="w-full h-full flex flex-col items-center justify-center gap-2 py-6 text-slate-400 hover:text-indigo-500 transition-colors"
                  >
                    <PlusCircle className="w-8 h-8" />
                    <span className="text-sm">Add Room {slot + 1}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Add Room Search Panel */}
        <AnimatePresence>
          {showAddRoom && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Add Room to Compare</h3>
                  <button onClick={() => setShowAddRoom(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  placeholder="Search by name or city..."
                  className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none mb-3"
                />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {filteredSearch.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => {
                        if (selectedIds.length < 3) {
                          addToCompare(room.id);
                          setSelectedIds((prev) => [...prev, room.id].slice(0, 3));
                          setShowAddRoom(false);
                        }
                      }}
                      disabled={selectedIds.length >= 3}
                      className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-left hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors border border-slate-200 dark:border-slate-700"
                    >
                      <p className="text-xs font-medium text-slate-900 dark:text-white truncate">{room.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{room.city}</p>
                      <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{formatRent(room.rent)}/mo</p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Verdict Button */}
        {selectedRooms.length >= 2 && (
          <div className="text-center mb-8">
            <button
              onClick={handleGenerateVerdict}
              className="inline-flex items-center gap-2 gradient-bg text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              Generate AI Verdict
              <Trophy className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* AI Verdict */}
        {aiVerdict && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl border border-indigo-200 dark:border-indigo-800 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-200">AI Verdict</h3>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {aiVerdict.replace(/\*\*(.*?)\*\*/g, '$1')}
            </p>
          </motion.div>
        )}

        {/* Comparison Table */}
        {selectedRooms.length >= 2 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="py-4 px-5 text-left text-sm font-semibold text-slate-500 dark:text-slate-400 w-40">Feature</th>
                  {selectedRooms.map((room, i) => (
                    <th key={room.id} className="py-4 px-4 text-center">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{room.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{room.city}</div>
                      {i === highlightMap.bestValue && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 gradient-bg text-white text-[10px] rounded-full mt-1">
                          <Crown className="w-3 h-3" /> AI Winner
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_FEATURES.map((feature, fi) => {
                  const bestIdx = getBestIndex(feature, selectedRooms);
                  return (
                    <tr key={feature.key} className={cn(
                      "border-b border-slate-100 dark:border-slate-800",
                      fi % 2 === 0 ? "bg-slate-50/50 dark:bg-slate-800/20" : ""
                    )}>
                      <td className="py-3 px-5 text-sm text-slate-600 dark:text-slate-400 font-medium">{feature.label}</td>
                      {selectedRooms.map((room, ri) => {
                        const isBest = ri === bestIdx && selectedRooms.length > 1;
                        const val = room[feature.key as keyof Room];
                        const isPositiveBool = feature.type === "bool" && val === true;
                        const isNegativeBool = feature.type === "bool" && val === false;
                        return (
                          <td key={room.id} className={cn(
                            "py-3 px-4 text-center text-sm",
                            isBest ? "font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20" : "text-slate-700 dark:text-slate-300",
                            isNegativeBool ? "opacity-50" : ""
                          )}>
                            <div className="flex items-center justify-center gap-1">
                              {isBest && <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
                              {feature.format(room)}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/40 rounded-3xl flex items-center justify-center mx-auto mb-5">
              <GitCompare className="w-12 h-12 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">Select Rooms to Compare</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
              Add at least 2 rooms using the slots above or by clicking "Compare" on room cards.
            </p>
            <button onClick={() => setShowAddRoom(true)} className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold">
              Add Rooms to Compare
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
