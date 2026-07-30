"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, SlidersHorizontal, Grid3X3, List, X
} from "lucide-react";
import { rooms as allRooms, allCities, allColleges, roomTypes, genderOptions } from "@/data/rooms";
import { Room, SearchFilters } from "@/types/room";
import { cn } from "@/lib/utils";
import RoomCard from "@/components/rooms/RoomCard";
import RoomSkeleton from "@/components/rooms/RoomSkeleton";

const defaultFilters: SearchFilters = {
  city: "", college: "", budgetMin: 0, budgetMax: 20000, gender: "",
  roomType: "", wifi: false, food: false, laundry: false, parking: false,
  attachedBathroom: false, ac: false, furnished: false, security: false,
  maxDistance: 10, minRating: 0, verifiedOnly: false,
};

const SORT_OPTIONS = [
  { value: "match", label: "AI Match Score" },
  { value: "rent_asc", label: "Rent: Low to High" },
  { value: "rent_desc", label: "Rent: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "distance", label: "Nearest First" },
  { value: "safety", label: "Safest First" },
];

function FilterCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group" onClick={() => onChange(!checked)}>
      <div className={cn(
        "w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0",
        checked ? "bg-indigo-600 border-indigo-600" : "border-slate-300 dark:border-slate-600 group-hover:border-indigo-400"
      )}>
        {checked && <span className="text-white text-[10px] font-bold">✓</span>}
      </div>
      <span className="text-sm text-slate-700 dark:text-slate-300 select-none">{label}</span>
    </label>
  );
}

export default function BrowseContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<SearchFilters>({
    ...defaultFilters,
    city: searchParams.get("city") || "",
    college: searchParams.get("college") || "",
  });
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState("match");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [filters, searchQuery, sortBy]);

  const filterRoom = useCallback((room: Room): boolean => {
    if (filters.city && room.city !== filters.city) return false;
    if (filters.college && room.college !== filters.college) return false;
    if (room.rent < filters.budgetMin || room.rent > filters.budgetMax) return false;
    if (filters.gender && room.gender !== filters.gender && room.gender !== "Co-ed") return false;
    if (filters.roomType && room.roomType !== filters.roomType) return false;
    if (filters.wifi && !room.wifi) return false;
    if (filters.food && !room.food) return false;
    if (filters.laundry && !room.laundry) return false;
    if (filters.parking && !room.parking) return false;
    if (filters.attachedBathroom && !room.attachedBathroom) return false;
    if (filters.ac && !room.ac) return false;
    if (filters.furnished && !room.furnished) return false;
    if (filters.security && !room.security) return false;
    if (room.distance > filters.maxDistance) return false;
    if (room.rating < filters.minRating) return false;
    if (filters.verifiedOnly && !room.verified) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!room.name.toLowerCase().includes(q) && !room.city.toLowerCase().includes(q) &&
          !room.college.toLowerCase().includes(q) && !room.roomType.toLowerCase().includes(q)) return false;
    }
    return true;
  }, [filters, searchQuery]);

  const sortedRooms = [...allRooms].filter(filterRoom).sort((a, b) => {
    switch (sortBy) {
      case "rent_asc": return a.rent - b.rent;
      case "rent_desc": return b.rent - a.rent;
      case "rating": return b.rating - a.rating;
      case "distance": return a.distance - b.distance;
      case "safety": return b.safetyScore - a.safetyScore;
      default: return b.aiMatchScore - a.aiMatchScore;
    }
  });

  const totalPages = Math.ceil(sortedRooms.length / PER_PAGE);
  const visibleRooms = sortedRooms.slice(0, page * PER_PAGE);

  const updateFilter = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const resetFilters = () => { setFilters(defaultFilters); setSearchQuery(""); setPage(1); };

  const activeFilterCount = [
    filters.city, filters.college, filters.gender, filters.roomType,
    filters.wifi, filters.food, filters.laundry, filters.parking,
    filters.attachedBathroom, filters.ac, filters.furnished, filters.security,
    filters.verifiedOnly, filters.minRating > 0, filters.maxDistance < 10,
    filters.budgetMax < 20000,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sticky Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-[64px] z-40 shadow-[0_2px_12px_rgba(15,23,60,0.04)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text" value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                placeholder="Search by name, city, college..."
                className="flex-1 bg-transparent text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none font-medium"
              />
              {searchQuery && <button onClick={() => setSearchQuery("")}><X className="w-4 h-4 text-slate-400 hover:text-slate-600" /></button>}
            </div>

            <select value={filters.city} onChange={(e) => updateFilter("city", e.target.value)}
              className="px-3.5 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white rounded-xl text-sm focus:outline-none font-medium">
              <option value="">All Cities</option>
              {allCities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white rounded-xl text-sm focus:outline-none font-medium">
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                showFilters || activeFilterCount > 0
                  ? "gradient-bg text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white"
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-white text-indigo-600 text-xs rounded-full flex items-center justify-center font-bold">{activeFilterCount}</span>
              )}
            </button>

            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
              <button onClick={() => setViewMode("grid")} className={cn("p-1.5 rounded-lg transition-all", viewMode === "grid" ? "gradient-bg text-white" : "text-slate-400")}>
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode("list")} className={cn("p-1.5 rounded-lg transition-all", viewMode === "list" ? "gradient-bg text-white" : "text-slate-400")}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
                    <div>
                      <label className="text-xs font-medium text-slate-500 mb-1 block">College</label>
                      <select value={filters.college} onChange={(e) => updateFilter("college", e.target.value)} className="w-full px-2.5 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs text-slate-700 dark:text-white focus:outline-none">
                        <option value="">All Colleges</option>
                        {allColleges.slice(0, 20).map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 mb-1 block">Room Type</label>
                      <select value={filters.roomType} onChange={(e) => updateFilter("roomType", e.target.value)} className="w-full px-2.5 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs text-slate-700 dark:text-white focus:outline-none">
                        <option value="">All Types</option>
                        {roomTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 mb-1 block">Gender</label>
                      <select value={filters.gender} onChange={(e) => updateFilter("gender", e.target.value)} className="w-full px-2.5 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs text-slate-700 dark:text-white focus:outline-none">
                        <option value="">All</option>
                        {genderOptions.map((g) => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-medium text-slate-500 mb-1 block">
                        Budget: ₹{filters.budgetMin.toLocaleString()} – ₹{filters.budgetMax.toLocaleString()}
                      </label>
                      <input type="range" min={0} max={20000} step={500} value={filters.budgetMax}
                        onChange={(e) => updateFilter("budgetMax", Number(e.target.value))}
                        className="w-full accent-indigo-600" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 mb-1 block">Min Rating</label>
                      <select value={filters.minRating} onChange={(e) => updateFilter("minRating", Number(e.target.value))} className="w-full px-2.5 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs text-slate-700 dark:text-white focus:outline-none">
                        <option value={0}>Any</option>
                        <option value={3}>3+</option>
                        <option value={4}>4+</option>
                        <option value={4.5}>4.5+</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-3">
                    {[
                      { key: "wifi" as const, label: "WiFi" },
                      { key: "food" as const, label: "Food" },
                      { key: "ac" as const, label: "AC" },
                      { key: "laundry" as const, label: "Laundry" },
                      { key: "parking" as const, label: "Parking" },
                      { key: "attachedBathroom" as const, label: "Attached Bath" },
                      { key: "furnished" as const, label: "Furnished" },
                      { key: "security" as const, label: "Security" },
                      { key: "verifiedOnly" as const, label: "Verified" },
                    ].map(({ key, label }) => (
                      <FilterCheckbox key={key} label={label} checked={filters[key] as boolean} onChange={(v) => updateFilter(key, v)} />
                    ))}
                  </div>
                  {activeFilterCount > 0 && (
                    <button onClick={resetFilters} className="mt-3 text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1">
                      <X className="w-3 h-3" /> Clear all filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {loading ? "Searching…" : `${sortedRooms.length} rooms found`}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {filters.city ? `in ${filters.city}` : "across all cities"}
              {searchQuery && ` · "${searchQuery}"`}
            </p>
          </div>
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
              <Filter className="w-4 h-4" />
              {activeFilterCount} active filter{activeFilterCount > 1 ? "s" : ""}
            </div>
          )}
        </div>

        {loading ? (
          <div className={cn("grid gap-7", viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1")}>
            {Array.from({ length: 8 }).map((_, i) => <RoomSkeleton key={i} />)}
          </div>
        ) : sortedRooms.length === 0 ? (
          <div className="text-center py-28">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Search className="w-11 h-11 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-3 tracking-tight">No rooms found</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 text-[0.95rem]">Try adjusting your filters or search query</p>
            <button onClick={resetFilters} className="gradient-bg text-white px-8 py-3 rounded-xl font-bold shadow-md shadow-indigo-500/20 hover:opacity-90">Reset Filters</button>
          </div>
        ) : (
          <>
            <div className={cn("grid gap-7", viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 max-w-3xl")}>
              {visibleRooms.map((room, i) => (
                <motion.div key={room.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.04, 0.4) }}>
                  <RoomCard room={room} />
                </motion.div>
              ))}
            </div>
            {page < totalPages && (
              <div className="text-center mt-12">
                <button onClick={() => setPage((p) => p + 1)} className="gradient-bg text-white px-10 py-3.5 rounded-xl font-bold hover:opacity-90 shadow-lg shadow-indigo-500/20">
                  Load More ({sortedRooms.length - visibleRooms.length} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
