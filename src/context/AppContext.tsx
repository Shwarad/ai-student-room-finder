"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  compareList: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  recentlyViewed: string[];
  addToRecentlyViewed: (id: string) => void;
  user: User | null;
  signOut: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Hydrate from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") setDarkMode(true);
    const savedFavs = localStorage.getItem("favorites");
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    const savedCompare = localStorage.getItem("compareList");
    if (savedCompare) setCompareList(JSON.parse(savedCompare));
    const savedRecent = localStorage.getItem("recentlyViewed");
    if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));
  }, []);

  // Supabase auth listener
  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Dark mode sync
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const addToCompare = (id: string) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length >= 3) return [...prev.slice(1), id];
      const updated = [...prev, id];
      localStorage.setItem("compareList", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCompare = (id: string) => {
    setCompareList((prev) => {
      const updated = prev.filter((c) => c !== id);
      localStorage.setItem("compareList", JSON.stringify(updated));
      return updated;
    });
  };

  const isInCompare = (id: string) => compareList.includes(id);

  const addToRecentlyViewed = (id: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((r) => r !== id);
      const updated = [id, ...filtered].slice(0, 10);
      localStorage.setItem("recentlyViewed", JSON.stringify(updated));
      return updated;
    });
  };

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AppContext.Provider value={{
      darkMode, toggleDarkMode,
      favorites, toggleFavorite, isFavorite,
      compareList, addToCompare, removeFromCompare, isInCompare,
      recentlyViewed, addToRecentlyViewed,
      user, signOut,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
