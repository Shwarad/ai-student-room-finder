"use client";

import Link from "next/link";
import { BrainCircuit, Code2, Share2, Network, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 mt-auto pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-[1.05rem] tracking-tight">
                <span className="gradient-text">AI</span>
                <span className="text-slate-800 dark:text-slate-100"> RoomFinder</span>
              </span>
            </Link>
            <p className="text-[0.875rem] text-slate-500 dark:text-slate-400 mb-5 leading-relaxed max-w-xs">
              AI-powered student accommodation finder. Find your perfect room near college with intelligent recommendations.
            </p>
            <div className="flex gap-2.5">
              {[Code2, Share2, Network].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-5 text-[0.9rem] tracking-tight">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Browse Rooms", href: "/browse" },
                { label: "AI Assistant", href: "/ai-assistant" },
                { label: "Compare Rooms", href: "/compare" },
                { label: "Dashboard", href: "/dashboard" },
                { label: "Favorites", href: "/favorites" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-[0.875rem] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-5 text-[0.9rem] tracking-tight">Top Cities</h3>
            <ul className="space-y-3">
              {["Delhi", "Mumbai", "Bangalore", "Pune", "Chennai", "Hyderabad", "Kolkata"].map((city) => (
                <li key={city}>
                  <Link href={`/browse?city=${city}`} className="text-[0.875rem] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                    PG in {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Features */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-5 text-[0.9rem] tracking-tight">AI Features</h3>
            <ul className="space-y-3">
              {[
                "AI Match Score",
                "AI Safety Score",
                "Scam Detection",
                "Budget Planner",
                "Rent Prediction",
                "Lifestyle Match",
                "Review Summary",
              ].map((feature) => (
                <li key={feature} className="text-[0.875rem] text-slate-500 dark:text-slate-400 font-medium">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divider mb-7" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[0.85rem] text-slate-500 dark:text-slate-400">
            © 2026 AI RoomFinder. Built with{" "}
            <Heart className="inline w-3.5 h-3.5 text-rose-500 mx-0.5 fill-rose-500" />
            for students.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Contact"].map((item) => (
              <a key={item} href="#" className="text-[0.85rem] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
