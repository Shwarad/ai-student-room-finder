"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin, Star, Wifi, Utensils, Car, ShieldCheck, Zap, Wind,
  Heart, GitCompare, Eye, Sparkles, CheckCircle,
  BedDouble
} from "lucide-react";
import { Room } from "@/types/room";
import { useApp } from "@/context/AppContext";
import { cn, formatRent, formatDistance } from "@/lib/utils";

interface RoomCardProps {
  room: Room;
  showMatchScore?: boolean;
  className?: string;
}

export default function RoomCard({ room, showMatchScore = true, className }: RoomCardProps) {
  const { toggleFavorite, isFavorite, addToCompare, isInCompare } = useApp();
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  const favorite = isFavorite(room.id);
  const inCompare = isInCompare(room.id);

  const amenityIcons = [
    { show: room.wifi, icon: Wifi, label: "WiFi" },
    { show: room.food, icon: Utensils, label: "Food" },
    { show: room.ac, icon: Wind, label: "AC" },
    { show: room.parking, icon: Car, label: "Parking" },
    { show: room.security, icon: ShieldCheck, label: "Security" },
    { show: room.powerBackup, icon: Zap, label: "Backup" },
  ];

  const matchColor =
    room.aiMatchScore >= 80 ? "text-emerald-600 dark:text-emerald-400" :
    room.aiMatchScore >= 60 ? "text-amber-600 dark:text-amber-400" :
    "text-orange-600 dark:text-orange-400";

  const matchBg =
    room.aiMatchScore >= 80 ? "bg-emerald-50 dark:bg-emerald-900/30" :
    room.aiMatchScore >= 60 ? "bg-amber-50 dark:bg-amber-900/30" :
    "bg-orange-50 dark:bg-orange-900/30";

  const riskBadge = {
    low: "bg-emerald-500/90 text-white",
    medium: "bg-amber-500/90 text-white",
    high: "bg-red-500/90 text-white",
  }[room.scamRisk];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn(
        "bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/60",
        "shadow-[0_2px_12px_rgba(15,23,60,0.06)] hover:shadow-[0_16px_48px_rgba(15,23,60,0.14)]",
        "hover:border-indigo-200 dark:hover:border-indigo-700/50 transition-all duration-300",
        className
      )}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52 bg-slate-100 dark:bg-slate-800">
        {!imgError ? (
          <img
            src={room.images[0]}
            alt={room.name}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700",
              hovered && "scale-110"
            )}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50">
            <BedDouble className="w-14 h-14 text-indigo-200 dark:text-indigo-700" />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap max-w-[60%]">
          <span className="px-2.5 py-1 bg-white/92 backdrop-blur-md text-indigo-700 text-[11px] font-bold rounded-full shadow-sm">
            {room.roomType}
          </span>
          <span className="px-2.5 py-1 bg-white/92 backdrop-blur-md text-slate-600 text-[11px] font-semibold rounded-full shadow-sm">
            {room.gender}
          </span>
          {room.verified && (
            <span className="px-2.5 py-1 bg-emerald-500/92 backdrop-blur-md text-white text-[11px] font-semibold rounded-full flex items-center gap-1 shadow-sm">
              <CheckCircle className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <button
            onClick={(e) => { e.preventDefault(); toggleFavorite(room.id); }}
            className={cn(
              "w-8 h-8 rounded-xl backdrop-blur-md flex items-center justify-center shadow-sm transition-all duration-200",
              favorite
                ? "bg-rose-500 text-white scale-110"
                : "bg-white/85 text-slate-500 hover:bg-rose-50 hover:text-rose-500 hover:scale-110"
            )}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("w-3.5 h-3.5", favorite && "fill-current")} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); addToCompare(room.id); }}
            className={cn(
              "w-8 h-8 rounded-xl backdrop-blur-md flex items-center justify-center shadow-sm transition-all duration-200",
              inCompare
                ? "bg-violet-500 text-white scale-110"
                : "bg-white/85 text-slate-500 hover:bg-violet-50 hover:text-violet-500 hover:scale-110"
            )}
            aria-label={inCompare ? "Remove from compare" : "Add to compare"}
          >
            <GitCompare className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom overlay: risk + match */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 flex items-end justify-between">
          <span className={cn("px-2.5 py-0.5 text-[11px] font-semibold rounded-full backdrop-blur-md shadow-sm", riskBadge)}>
            {room.scamRisk === "low" ? "✓ Safe" : room.scamRisk === "medium" ? "⚠ Moderate" : "✗ High Risk"}
          </span>
          {showMatchScore && (
            <span className={cn(
              "px-2.5 py-0.5 bg-white/92 backdrop-blur-md text-[11px] font-bold rounded-full flex items-center gap-1 shadow-sm",
              matchColor
            )}>
              <Sparkles className="w-3 h-3" />
              {room.aiMatchScore}%
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name & Rating */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-slate-900 dark:text-white text-[0.95rem] leading-snug line-clamp-1 tracking-tight">
            {room.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-lg">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400">{room.rating}</span>
            <span className="text-[10px] text-slate-400">({room.reviewsCount})</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-[0.78rem] text-slate-500 dark:text-slate-400 mb-3.5">
          <MapPin className="w-3 h-3 shrink-0 text-indigo-400" />
          <span className="truncate">{formatDistance(room.distance)} from {room.college}</span>
        </div>

        {/* Safety + City row */}
        <div className="flex items-center justify-between mb-3.5 py-2 px-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[0.78rem] text-slate-600 dark:text-slate-400 font-medium">Safety</span>
            <span className="text-[0.78rem] font-bold text-emerald-600 dark:text-emerald-400">{room.safetyScore}/10</span>
          </div>
          <span className="text-[0.78rem] font-medium text-indigo-500 dark:text-indigo-400">{room.city}</span>
        </div>

        {/* Amenities */}
        <div className="flex gap-1.5 flex-wrap mb-4">
          {amenityIcons.filter((a) => a.show).slice(0, 4).map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1 px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-[11px] font-semibold">
              <Icon className="w-3 h-3" />
              {label}
            </span>
          ))}
          {amenityIcons.filter((a) => a.show).length > 4 && (
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 rounded-lg text-[11px] font-medium">
              +{amenityIcons.filter((a) => a.show).length - 4}
            </span>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/50">
          <div>
            <span className="text-[1.25rem] font-extrabold gradient-text tracking-tight">{formatRent(room.rent)}</span>
            <span className="text-[0.75rem] text-slate-400 dark:text-slate-500 font-medium">/mo</span>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/rooms/${room.id}`}
              className="flex items-center gap-1.5 px-3 py-1.5 gradient-bg text-white text-[0.78rem] font-bold rounded-lg hover:opacity-90 transition-opacity shadow-sm shadow-indigo-500/20"
            >
              <Eye className="w-3.5 h-3.5" />
              View
            </Link>
            <Link
              href={`/ai-assistant?room=${room.id}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-[0.78rem] font-bold rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ask AI
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
