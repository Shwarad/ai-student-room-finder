"use client";

import { Suspense } from "react";
import BrowsePage from "./BrowseContent";

export default function BrowsePageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-3 animate-pulse">
            <span className="text-white text-xl">🔍</span>
          </div>
          <p className="text-slate-500">Loading rooms...</p>
        </div>
      </div>
    }>
      <BrowsePage />
    </Suspense>
  );
}
