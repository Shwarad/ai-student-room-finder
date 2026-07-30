"use client";

export default function RoomSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 animate-pulse">
      <div className="skeleton h-48 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="flex gap-2">
          <div className="skeleton h-5 w-12 rounded-md" />
          <div className="skeleton h-5 w-12 rounded-md" />
          <div className="skeleton h-5 w-12 rounded-md" />
        </div>
        <div className="flex justify-between items-center pt-1">
          <div className="skeleton h-6 w-20 rounded" />
          <div className="skeleton h-8 w-16 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
