"use client";

import { motion } from "framer-motion";
import { Heart, Trash2, GitCompare, Search } from "lucide-react";
import Link from "next/link";
import { rooms } from "@/data/rooms";
import { useApp } from "@/context/AppContext";
import RoomCard from "@/components/rooms/RoomCard";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useApp();
  const favoriteRooms = rooms.filter((r) => favorites.includes(r.id));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-600 to-rose-600 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Heart className="w-8 h-8 fill-current" />
            My Favorites
          </h1>
          <p className="text-white/80">{favoriteRooms.length} saved room{favoriteRooms.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favoriteRooms.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-rose-100 dark:bg-rose-900/40 rounded-3xl flex items-center justify-center mx-auto mb-5">
              <Heart className="w-12 h-12 text-rose-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No favorites yet</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Save rooms by clicking the heart icon on any room card.
            </p>
            <Link href="/browse" className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2">
              <Search className="w-4 h-4" />
              Browse Rooms
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Saved Rooms</h2>
              <div className="flex gap-3">
                <Link
                  href="/compare"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 rounded-xl text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/60 transition-colors"
                >
                  <GitCompare className="w-4 h-4" />
                  Compare Selected
                </Link>
                <button
                  onClick={() => {
                    if (confirm("Clear all favorites?")) favorites.forEach((id) => toggleFavorite(id));
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 rounded-xl text-sm font-medium hover:bg-rose-200 dark:hover:bg-rose-900/60 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteRooms.map((room, i) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <RoomCard room={room} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
