"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Search, GitCompare, Sparkles, Heart, Info,
  Moon, Sun, Menu, X, User, BrainCircuit
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/browse", label: "Browse", icon: Search },
  { href: "/compare", label: "Compare", icon: GitCompare },
  { href: "/ai-assistant", label: "AI Assistant", icon: Sparkles },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/about", label: "About", icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();
  const { darkMode, toggleDarkMode, favorites, compareList } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl shadow-[0_1px_20px_rgba(15,23,60,0.08)] border-b border-white/60 dark:border-slate-700/40"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-110 transition-transform duration-200">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-[1.05rem] hidden sm:block tracking-tight">
                <span className="gradient-text">AI</span>
                <span className="text-slate-800 dark:text-slate-100"> RoomFinder</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5 bg-slate-100/70 dark:bg-slate-800/50 rounded-2xl px-2 py-1.5">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[0.84rem] font-medium transition-all duration-200",
                      isActive
                        ? "gradient-bg text-white shadow-md shadow-indigo-500/20"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700/60"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                    {label === "Favorites" && favorites.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                        {favorites.length}
                      </span>
                    )}
                    {label === "Compare" && compareList.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-violet-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                        {compareList.length}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-[18px] h-[18px]" />}
              </button>

              <Link
                href="/dashboard"
                className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all"
                aria-label="Dashboard"
              >
                <User className="w-[18px] h-[18px]" />
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 px-5 py-3"
            >
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-[0.9rem] font-medium transition-all",
                    pathname === href
                      ? "gradient-bg text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {label === "Favorites" && favorites.length > 0 && (
                    <span className="ml-auto w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {favorites.length}
                    </span>
                  )}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-t border-slate-200/70 dark:border-slate-700/50 flex items-center justify-around py-2 px-3 safe-area-bottom">
        {navLinks.slice(0, 5).map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl relative transition-all",
                isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500"
              )}
            >
              <div className={cn(
                "w-8 h-8 flex items-center justify-center rounded-xl transition-all",
                isActive ? "gradient-bg shadow-md shadow-indigo-500/25" : ""
              )}>
                <Icon className={cn("w-4.5 h-4.5", isActive ? "text-white w-[18px] h-[18px]" : "w-[18px] h-[18px]")} />
              </div>
              <span className={cn("text-[9px] font-semibold tracking-wide uppercase", isActive ? "text-indigo-600 dark:text-indigo-400" : "")}>{label}</span>
              {label === "Favorites" && favorites.length > 0 && (
                <span className="absolute top-0.5 right-1 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] rounded-full flex items-center justify-center font-bold">
                  {favorites.length}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
