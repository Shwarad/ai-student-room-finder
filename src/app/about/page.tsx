"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Sparkles, Shield, Star, Target, TrendingUp, Users, Building2, Award } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const team = [
    { name: "AI Architecture", role: "IBM Granite LLM", desc: "Powering intelligent room recommendations, safety analysis, and natural language understanding." },
    { name: "Smart Matching", role: "ML Scoring Engine", desc: "Multi-factor AI algorithm scoring rooms on 10+ parameters for perfect student-room matching." },
    { name: "Scam Detection", role: "Pattern Analysis", desc: "Real-time listing analysis to identify suspicious patterns and protect students from fraud." },
    { name: "Budget AI", role: "Financial Planning", desc: "City-aware budget planning that helps students allocate funds across all expenses smartly." },
  ];

  const techStack = [
    "Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4",
    "Framer Motion", "IBM Granite AI", "Recharts", "Lucide Icons",
    "Radix UI Components", "Local JSON Data", "Context API",
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-60 h-60 bg-indigo-500 rounded-full filter blur-3xl float-animation" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl float-animation" style={{ animationDelay: "1s" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="w-20 h-20 gradient-bg rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl float-animation">
            <BrainCircuit className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About <span className="gradient-text">AI RoomFinder</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            A next-generation, AI-powered student accommodation platform built for modern India. Helping students find safe, affordable, and perfect rooms near their colleges.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Mission */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Students spend countless hours searching for accommodation that fits their budget, preferences, and safety requirements. AI RoomFinder uses artificial intelligence to eliminate this struggle — providing instant, personalized room recommendations that feel like having a smart friend who knows every PG in the city.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { icon: Building2, value: "600+", label: "Room Listings" },
            { icon: Users, value: "10+", label: "Cities Covered" },
            { icon: Shield, value: "97%", label: "Scam Detection" },
            { icon: Star, value: "4.8/5", label: "Avg Satisfaction" },
          ].map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center shadow-sm border border-slate-200 dark:border-slate-800"
            >
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-extrabold gradient-text mb-1">{value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
            </motion.div>
          ))}
        </section>

        {/* AI Features */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">AI Technology</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {team.map(({ name, role, desc }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{name}</h3>
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 mb-2">{role}</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Built With</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span key={tech} className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium shadow-sm hover:border-indigo-300 transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Start Finding Rooms</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Join students across India using AI to find their perfect accommodation</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/browse" className="gradient-bg text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
              Browse Rooms
            </Link>
            <Link href="/ai-assistant" className="border border-indigo-500 text-indigo-600 dark:text-indigo-400 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Try AI Assistant
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
