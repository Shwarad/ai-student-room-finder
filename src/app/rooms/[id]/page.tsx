"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin, Star, Wifi, Utensils, Car, ShieldCheck, Zap, Wind,
  Heart, GitCompare, ArrowLeft, Phone, CheckCircle, AlertTriangle,
  TrendingUp, TrendingDown, Minus, Sparkles, ThumbsUp, ThumbsDown,
  BedDouble, Building, Calendar, Droplets, Plug, Cigarette, PawPrint,
  Users, ChevronLeft, ChevronRight, ExternalLink
} from "lucide-react";
import { rooms } from "@/data/rooms";
import RoomCard from "@/components/rooms/RoomCard";
import { useApp } from "@/context/AppContext";
import { cn, formatRent, formatDistance } from "@/lib/utils";
import { generateAIReviewSummary, predictRentTrend } from "@/lib/aiEngine";

export default function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { toggleFavorite, isFavorite, addToCompare, isInCompare, addToRecentlyViewed } = useApp();
  const [imgIndex, setImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [showBookModal, setShowBookModal] = useState(false);

  const room = rooms.find((r) => r.id === id);

  useEffect(() => {
    if (room) addToRecentlyViewed(room.id);
  }, [room?.id]);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Room Not Found</h2>
          <Link href="/browse" className="text-indigo-600 hover:underline">← Back to Browse</Link>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(room.id);
  const inCompare = isInCompare(room.id);
  const aiReview = generateAIReviewSummary(room);
  const rentTrend = predictRentTrend(room);
  const similarRooms = rooms.filter((r) => r.id !== room.id && r.college === room.college).slice(0, 3);

  const amenities = [
    { label: "WiFi", icon: Wifi, active: room.wifi, detail: room.internetSpeed },
    { label: "Food/Mess", icon: Utensils, active: room.food },
    { label: "AC", icon: Wind, active: room.ac },
    { label: "Parking", icon: Car, active: room.parking },
    { label: "Security", icon: ShieldCheck, active: room.security },
    { label: "Power Backup", icon: Zap, active: room.powerBackup },
    { label: "Laundry", icon: Building, active: room.laundry },
    { label: "Attached Bath", icon: Droplets, active: room.attachedBathroom },
    { label: "Electricity Incl.", icon: Plug, active: room.electricityIncluded },
    { label: "Pet Friendly", icon: PawPrint, active: room.petFriendly },
    { label: "Guests Allowed", icon: Users, active: room.guestAllowed },
    { label: "Smoking Allowed", icon: Cigarette, active: room.smokingAllowed },
  ];

  const safetyItems = [
    { label: "Security Guard", active: room.security },
    { label: "CCTV Surveillance", active: room.cctv },
    { label: "Power Backup", active: room.powerBackup },
    { label: "Women Friendly", active: room.gender === "Female" || room.gender === "Co-ed" },
    { label: "Verified Owner", active: room.verified },
  ];

  const TrendIcon = room.rentTrend === "rising" ? TrendingUp :
    room.rentTrend === "falling" ? TrendingDown : Minus;
  const trendColor = room.rentTrend === "rising" ? "text-rose-500" :
    room.rentTrend === "falling" ? "text-green-500" : "text-amber-500";

  const nearbyTypeIcons: Record<string, string> = {
    metro: "🚇", bus: "🚌", hospital: "🏥", library: "📚",
    cafe: "☕", gym: "🏋️", market: "🛒", pharmacy: "💊",
    restaurant: "🍽️", park: "🌳",
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Back Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(room.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border",
                favorite
                  ? "bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-900/30 dark:border-rose-800 dark:text-rose-400"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-rose-300"
              )}
            >
              <Heart className={cn("w-4 h-4", favorite && "fill-current")} />
              {favorite ? "Saved" : "Save"}
            </button>
            <button
              onClick={() => addToCompare(room.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border",
                inCompare
                  ? "bg-purple-50 border-purple-200 text-purple-600 dark:bg-purple-900/30 dark:border-purple-800 dark:text-purple-400"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-purple-300"
              )}
            >
              <GitCompare className="w-4 h-4" />
              {inCompare ? "In Compare" : "Compare"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="relative h-64 sm:h-96 overflow-hidden">
                <img
                  src={room.images[imgIndex]}
                  alt={`${room.name} - Image ${imgIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800"; }}
                />
                {room.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setImgIndex((prev) => Math.max(0, prev - 1))}
                      disabled={imgIndex === 0}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full disabled:opacity-30 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setImgIndex((prev) => Math.min(room.images.length - 1, prev + 1))}
                      disabled={imgIndex === room.images.length - 1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full disabled:opacity-30 transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {room.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImgIndex(i)}
                          className={cn(
                            "w-2 h-2 rounded-full transition-all",
                            i === imgIndex ? "bg-white scale-125" : "bg-white/50"
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="flex gap-2 p-3">
                {room.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={cn("w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all", i === imgIndex ? "border-indigo-500" : "border-transparent")}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Room Header */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 text-xs font-semibold rounded-full">
                      {room.roomType}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-full">
                      {room.gender}
                    </span>
                    {room.verified && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{room.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {formatDistance(room.distance)} from {room.college}, {room.city}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-extrabold gradient-text">{formatRent(room.rent)}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">per month</div>
                  <div className="text-xs text-slate-400 mt-0.5">Deposit: {formatRent(room.deposit)}</div>
                </div>
              </div>

              {/* Scores Row */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{room.rating}</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{room.reviewsCount} reviews</div>
                </div>
                <div className="text-center border-x border-slate-200 dark:border-slate-700">
                  <div className="text-lg font-bold text-green-600 dark:text-green-400 mb-1">{room.safetyScore}/10</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Safety Score</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-1">{room.aiMatchScore}%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">AI Match</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="flex border-b border-slate-200 dark:border-slate-700">
                {["overview", "amenities", "safety", "reviews", "nearby"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "flex-1 py-3 text-sm font-medium capitalize transition-all",
                      activeTab === tab
                        ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Overview */}
                {activeTab === "overview" && (
                  <div className="space-y-4">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{room.description}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { label: "Floor", value: `${room.floorNumber}/${room.totalFloors}` },
                        { label: "Building Age", value: `${room.buildingAge} yrs` },
                        { label: "Available From", value: room.availableFrom },
                        { label: "Internet Speed", value: room.internetSpeed },
                        { label: "Electricity", value: room.electricityIncluded ? "Included" : "Extra" },
                        { label: "Water", value: room.waterIncluded ? "Included" : "Extra" },
                      ].map(({ label, value }) => (
                        <div key={label} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                          <div className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{label}</div>
                          <div className="text-sm font-semibold text-slate-800 dark:text-white">{value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Lifestyle Match */}
                    <div>
                      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Ideal For</h3>
                      <div className="flex flex-wrap gap-2">
                        {room.lifestyle.map((l) => (
                          <span key={l} className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs rounded-full font-medium">
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Highlights</h3>
                      <div className="flex flex-wrap gap-2">
                        {room.highlights.map((h) => (
                          <span key={h} className="flex items-center gap-1 px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">
                            <CheckCircle className="w-3 h-3" /> {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Rent Trend */}
                    <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                      <TrendIcon className={cn("w-5 h-5 mt-0.5 shrink-0", trendColor)} />
                      <p className="text-sm text-amber-900 dark:text-amber-200">{rentTrend}</p>
                    </div>
                  </div>
                )}

                {/* Amenities */}
                {activeTab === "amenities" && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {amenities.map(({ label, icon: Icon, active, detail }) => (
                      <div
                        key={label}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl border transition-all",
                          active
                            ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                            : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-50"
                        )}
                      >
                        <Icon className={cn("w-5 h-5 shrink-0", active ? "text-green-600 dark:text-green-400" : "text-slate-400")} />
                        <div>
                          <div className={cn("text-sm font-medium", active ? "text-green-700 dark:text-green-300" : "text-slate-500")}>{label}</div>
                          {detail && active && <div className="text-xs text-green-600 dark:text-green-400">{detail}</div>}
                          {!active && <div className="text-xs text-slate-400">Not available</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Safety */}
                {activeTab === "safety" && (
                  <div className="space-y-4">
                    {/* Safety Score */}
                    <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl font-extrabold text-green-600 dark:text-green-400">{room.safetyScore}</span>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-700 dark:text-green-300">Safety Score</div>
                        <div className="text-sm text-green-600 dark:text-green-400">out of 10 — {room.safetyScore >= 8 ? "Excellent" : room.safetyScore >= 6 ? "Good" : "Average"}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {safetyItems.map(({ label, active }) => (
                        <div key={label} className={cn(
                          "flex items-center gap-3 p-3 rounded-xl border",
                          active ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                            : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-60"
                        )}>
                          {active ? <CheckCircle className="w-5 h-5 text-green-500 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-slate-400 shrink-0" />}
                          <span className={cn("text-sm font-medium", active ? "text-green-700 dark:text-green-300" : "text-slate-500")}>{label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Scam Risk */}
                    <div className={cn(
                      "p-4 rounded-xl border",
                      room.scamRisk === "low" ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                        : room.scamRisk === "medium" ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800"
                          : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                    )}>
                      <div className="font-semibold mb-1">
                        Scam Risk: <span className={cn(
                          room.scamRisk === "low" ? "text-green-700 dark:text-green-400"
                            : room.scamRisk === "medium" ? "text-yellow-700 dark:text-yellow-400"
                              : "text-red-700 dark:text-red-400"
                        )}>{room.scamRisk.toUpperCase()}</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {room.scamRisk === "low" ? "This listing appears genuine. Owner is verified and listing details are consistent."
                          : room.scamRisk === "medium" ? "Exercise caution. Some details need verification before booking."
                            : "High risk detected. Please verify all details in person before making any payment."}
                      </p>
                    </div>
                  </div>
                )}

                {/* Reviews */}
                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    {/* AI Summary */}
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">AI Review Summary</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="flex items-start gap-2">
                          <ThumbsUp className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          <p className="text-xs text-slate-700 dark:text-slate-300">{aiReview.positive}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <ThumbsDown className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                          <p className="text-xs text-slate-700 dark:text-slate-300">{aiReview.negative}</p>
                        </div>
                      </div>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 font-medium">{aiReview.overall}</p>
                    </div>

                    {room.reviews.map((review) => (
                      <div key={review.id} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <span className="font-semibold text-sm text-slate-900 dark:text-white">{review.userName}</span>
                            <span className="text-xs text-slate-400 ml-2">{review.college}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{review.comment}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">{review.date}</span>
                          <span className="text-xs text-slate-400">👍 {review.helpful} found helpful</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Nearby */}
                {activeTab === "nearby" && (
                  <div className="space-y-3">
                    {room.nearbyPlaces.map((place, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                        <span className="text-2xl">{nearbyTypeIcons[place.type] || "📍"}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm text-slate-900 dark:text-white">{place.name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">{place.type}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{place.distance}</div>
                          <div className="text-xs text-slate-400">{place.walkingTime} walk</div>
                        </div>
                      </div>
                    ))}

                    {/* Map Placeholder */}
                    <div className="mt-4 h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700">
                      <div className="text-center">
                        <MapPin className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Map View</p>
                        <p className="text-xs text-slate-400">Lat: {room.latitude.toFixed(4)}, Lng: {room.longitude.toFixed(4)}</p>
                        <a
                          href={`https://maps.google.com/?q=${room.latitude},${room.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 text-xs text-indigo-600 hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" /> Open in Google Maps
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Similar Rooms */}
            {similarRooms.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Similar Rooms near {room.college}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similarRooms.map((r) => (
                    <RoomCard key={r.id} room={r} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Booking Panel */}
          <div className="lg:col-span-1 space-y-4">
            {/* Booking Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 sticky top-24">
              <div className="text-center mb-5">
                <div className="text-3xl font-extrabold gradient-text">{formatRent(room.rent)}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">per month</div>
              </div>

              <div className="space-y-2 mb-5 text-sm">
                {[
                  { label: "Deposit", value: formatRent(room.deposit) },
                  { label: "Available From", value: room.availableFrom },
                  { label: "Room Type", value: room.roomType },
                  { label: "For", value: room.gender },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">{label}</span>
                    <span className="font-medium text-slate-800 dark:text-white">{value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowBookModal(true)}
                className="w-full gradient-bg text-white py-3 rounded-xl font-bold text-base hover:opacity-90 transition-opacity mb-3"
              >
                Book Now
              </button>
              <a
                href={`tel:${room.ownerPhone}`}
                className="w-full flex items-center justify-center gap-2 border border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 py-3 rounded-xl font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Contact Owner
              </a>
            </div>

            {/* Owner Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Owner Details</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white font-bold">
                  {room.ownerName.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">{room.ownerName}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    {room.verified && <><CheckCircle className="w-3 h-3 text-green-500" /> Verified Owner</>}
                    {!room.verified && "Not Verified"}
                  </div>
                </div>
              </div>
              <div className="mt-3 text-sm text-slate-600 dark:text-slate-400">{room.ownerPhone}</div>
            </div>

            {/* AI Match Panel */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <h3 className="font-semibold text-slate-900 dark:text-white">AI Match Analysis</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Budget Fit", score: Math.min(100, 100 - Math.max(0, (room.rent - 7000) / 100)), color: "bg-green-400" },
                  { label: "Safety", score: room.safetyScore * 10, color: "bg-emerald-400" },
                  { label: "Amenities", score: [room.wifi, room.food, room.ac, room.security, room.laundry].filter(Boolean).length * 20, color: "bg-blue-400" },
                  { label: "Reviews", score: room.rating * 20, color: "bg-amber-400" },
                  { label: "Distance", score: Math.max(0, 100 - room.distance * 20), color: "bg-purple-400" },
                ].map(({ label, score, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 dark:text-slate-400">{label}</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">{Math.round(score)}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.round(score)}%` }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className={cn("h-full rounded-full", color)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <div className="text-2xl font-extrabold gradient-text">{room.aiMatchScore}%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Overall AI Match</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Now Modal */}
      {showBookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Book {room.name}</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
              Contact the owner to proceed with your booking. This is a demo — backend integration coming soon.
            </p>
            <div className="space-y-3">
              <a href={`tel:${room.ownerPhone}`} className="w-full flex items-center justify-center gap-2 gradient-bg text-white py-3 rounded-xl font-semibold">
                <Phone className="w-4 h-4" /> Call Owner: {room.ownerPhone}
              </a>
              <button onClick={() => setShowBookModal(false)} className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
