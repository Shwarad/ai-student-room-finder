"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { BrainCircuit, Sparkles, AlertCircle, Wifi, ShieldCheck, Zap, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const features = [
  { icon: ShieldCheck, text: "Verified rooms only" },
  { icon: Wifi, text: "AI-powered matching" },
  { icon: MapPin, text: "10+ cities across India" },
  { icon: Zap, text: "Instant scam detection" },
];

function LoginContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<"google" | "github" | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("error") === "auth_failed") {
      setError("Authentication failed. Please try again.");
    }
  }, [searchParams]);

  const signIn = async (provider: "google" | "github") => {
    setLoading(provider);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex overflow-hidden">

      {/* ── Left panel — branding ──────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050918] via-[#0d1440] to-[#180c35]" />
        {/* Orbs */}
        <div className="absolute top-[15%] left-[10%] w-80 h-80 bg-indigo-600/20 rounded-full blur-[120px] float-animation" />
        <div className="absolute bottom-[15%] right-[5%] w-96 h-96 bg-violet-600/15 rounded-full blur-[140px] float-animation" style={{ animationDelay: "2s" }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }} />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative z-10"
        >
          <Link href="/" className="flex items-center gap-2.5 w-fit group">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              <span className="gradient-text">AI</span>
              <span className="text-white"> RoomFinder</span>
            </span>
          </Link>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/15 rounded-full text-white/75 text-[0.78rem] font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            Powered by IBM Granite AI
          </div>
          <h1 className="text-4xl xl:text-5xl font-extrabold text-white mb-5 display-text leading-tight">
            Your Perfect<br />
            <span className="gradient-text">Student Room</span><br />
            Awaits You
          </h1>
          <p className="text-white/55 text-[1rem] leading-relaxed max-w-sm">
            Sign in to unlock personalised AI recommendations, save your favourite rooms, and track listings across 10+ cities.
          </p>

          {/* Feature pills */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 px-3.5 py-2.5 bg-white/8 border border-white/10 rounded-xl backdrop-blur-sm">
                <Icon className="w-4 h-4 text-indigo-300 shrink-0" />
                <span className="text-white/70 text-[0.8rem] font-medium">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative z-10 text-white/30 text-[0.78rem]"
        >
          © 2026 AI RoomFinder · Built for students across India
        </motion.p>
      </div>

      {/* ── Right panel — auth form ────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#f6f8ff] dark:bg-[#080e1f] px-6 py-12 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                <span className="gradient-text">AI</span>
                <span className="text-slate-800 dark:text-white"> RoomFinder</span>
              </span>
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 display-text tracking-tight">
              Welcome back
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-[0.9rem]">
              Sign in to continue to your AI room dashboard
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-4 py-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 rounded-xl mb-6 text-rose-700 dark:text-rose-400 text-sm"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </motion.div>
          )}

          {/* OAuth Buttons */}
          <div className="space-y-3">
            {/* Google */}
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => signIn("google")}
              disabled={!!loading}
              className="w-full flex items-center justify-center gap-3.5 px-5 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-semibold text-slate-800 dark:text-white text-[0.92rem] shadow-[0_2px_12px_rgba(15,23,60,0.07)] hover:shadow-[0_4px_20px_rgba(15,23,60,0.12)] hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading === "google" ? (
                <svg className="w-5 h-5 animate-spin text-slate-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Continue with Google
            </motion.button>

            {/* GitHub */}
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => signIn("github")}
              disabled={!!loading}
              className="w-full flex items-center justify-center gap-3.5 px-5 py-3.5 bg-[#24292e] hover:bg-[#2f363d] border border-[#24292e] hover:border-[#2f363d] rounded-2xl font-semibold text-white text-[0.92rem] shadow-[0_2px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading === "github" ? (
                <svg className="w-5 h-5 animate-spin text-white/50" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              )}
              Continue with GitHub
            </motion.button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-7">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700/60" />
            <span className="text-[0.75rem] text-slate-400 font-medium tracking-wider uppercase">Secured by Supabase</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700/60" />
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {[
              { label: "OAuth 2.0", color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30" },
              { label: "End-to-end encrypted", color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30" },
              { label: "No password stored", color: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30" },
            ].map(({ label, color }) => (
              <span key={label} className={`text-[0.72rem] font-semibold px-2.5 py-1 rounded-full ${color}`}>
                {label}
              </span>
            ))}
          </div>

          {/* Footer */}
          <p className="text-center text-[0.78rem] text-slate-400 dark:text-slate-500 mt-8 leading-relaxed">
            By signing in you agree to our{" "}
            <a href="#" className="text-indigo-500 hover:underline underline-offset-2">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-indigo-500 hover:underline underline-offset-2">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
