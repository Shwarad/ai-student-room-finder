"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Send, Bot, User, Loader2, Brain, RefreshCw,
  MessageSquare, Lightbulb, Target, Star, MapPin, CheckCircle
} from "lucide-react";
import { rooms } from "@/data/rooms";
import { getAIRecommendations, getChatResponse, generateBudgetPlan } from "@/lib/aiEngine";
import { Room, AIRecommendation } from "@/types/room";
import { cn, formatRent } from "@/lib/utils";
import RoomCard from "@/components/rooms/RoomCard";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
  recommendations?: AIRecommendation[];
}

const QUICK_PROMPTS = [
  "Find me a room under ₹6000 with WiFi near Delhi University",
  "Best rooms for UPSC preparation in Delhi",
  "Safest rooms for female students in Bangalore",
  "Cheapest rooms near IIT Bombay with food",
  "Premium rooms near Pune University with AC",
  "Best value rooms near JNU with high safety",
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "ai",
      content: "👋 Welcome! I'm your AI Room Finder assistant powered by IBM Granite.\n\nTell me what you're looking for in natural language and I'll find the perfect room for you. For example:\n\n*\"I need a room under ₹7000 with WiFi and food near Delhi University\"*",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "recommend" | "budget">("chat");
  const [aiQuery, setAIQuery] = useState("");
  const [aiResults, setAIResults] = useState<AIRecommendation[]>([]);
  const [aiLoading, setAILoading] = useState(false);
  const [budget, setBudget] = useState(10000);
  const [budgetCity, setBudgetCity] = useState("Delhi");
  const [budgetPlan, setBudgetPlan] = useState<ReturnType<typeof generateBudgetPlan> | null>(null);
  const [lifestyleMode, setLifestyleMode] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await getChatResponse(text, rooms);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "ai", content: response, timestamp: new Date() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "ai", content: "Sorry, I ran into an error. Please try again!", timestamp: new Date() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const runAIRecommend = async () => {
    if (!aiQuery.trim()) return;
    setAILoading(true);
    setAIResults([]);
    try {
      const results = await getAIRecommendations(aiQuery, rooms);
      setAIResults(results);
    } finally {
      setAILoading(false);
    }
  };

  const runBudgetPlan = () => {
    const plan = generateBudgetPlan(budget, budgetCity);
    setBudgetPlan(plan);
  };

  const getRoom = (id: string): Room | undefined => rooms.find((r) => r.id === id);

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');
  };

  const lifestyleOptions = [
    { id: "Introvert", emoji: "🤫", label: "Introvert" },
    { id: "Extrovert", emoji: "🎉", label: "Extrovert" },
    { id: "Night Owl", emoji: "🦉", label: "Night Owl" },
    { id: "Early Bird", emoji: "🌅", label: "Early Bird" },
    { id: "Gym Lover", emoji: "🏋️", label: "Gym Lover" },
    { id: "Gamer", emoji: "🎮", label: "Gamer" },
    { id: "Research Scholar", emoji: "🔬", label: "Research Scholar" },
    { id: "Competitive Exam Student", emoji: "📚", label: "Exam Student" },
  ];

  const lifestyleRooms = lifestyleMode
    ? rooms.filter((r) => r.lifestyle.includes(lifestyleMode)).slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm mb-4"
          >
            <Sparkles className="w-4 h-4" />
            IBM Granite AI
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-2"
          >
            AI Room Finder Assistant
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80"
          >
            Ask anything, get personalized recommendations, plan your budget
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex bg-white dark:bg-slate-900 rounded-2xl p-1 shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
          {[
            { id: "chat", label: "AI Chat", icon: MessageSquare },
            { id: "recommend", label: "Get Recommendations", icon: Target },
            { id: "budget", label: "Budget Planner", icon: Brain },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all",
                activeTab === id ? "gradient-bg text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* CHAT TAB */}
        {activeTab === "chat" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar: Quick Prompts */}
            <div className="lg:col-span-1 space-y-3">
              <h3 className="font-semibold text-slate-700 dark:text-slate-300 text-sm">Quick Questions</h3>
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="w-full text-left px-3 py-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 hover:border-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all leading-relaxed"
                >
                  {prompt}
                </button>
              ))}

              {/* Lifestyle Match */}
              <div className="mt-4">
                <h3 className="font-semibold text-slate-700 dark:text-slate-300 text-sm mb-2">Lifestyle Match</h3>
                <div className="grid grid-cols-2 gap-1.5">
                  {lifestyleOptions.map(({ id, emoji, label }) => (
                    <button
                      key={id}
                      onClick={() => setLifestyleMode(lifestyleMode === id ? "" : id)}
                      className={cn(
                        "px-2 py-1.5 rounded-lg text-xs font-medium transition-all text-center",
                        lifestyleMode === id
                          ? "gradient-bg text-white"
                          : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300"
                      )}
                    >
                      {emoji} {label}
                    </button>
                  ))}
                </div>
                {lifestyleRooms.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Top picks for {lifestyleMode}:</p>
                    {lifestyleRooms.map((r) => (
                      <a key={r.id} href={`/rooms/${r.id}`} className="block p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
                        <div className="text-xs font-medium text-slate-800 dark:text-white truncate">{r.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">₹{r.rent}/mo · {r.aiMatchScore}% match</div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-3 flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden" style={{ height: "580px" }}>
              <div className="gradient-bg px-4 py-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">AI Room Assistant</div>
                  <div className="text-white/60 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Online · IBM Granite powered
                  </div>
                </div>
                <button
                  onClick={() => setMessages([{
                    id: "reset",
                    role: "ai",
                    content: "Chat cleared! Ask me anything about student rooms 🏠",
                    timestamp: new Date(),
                  }])}
                  className="ml-auto p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                  title="Clear chat"
                >
                  <RefreshCw className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                      msg.role === "ai" ? "gradient-bg" : "bg-slate-200 dark:bg-slate-700"
                    )}>
                      {msg.role === "ai" ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />}
                    </div>
                    <div className={cn(
                      "max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
                      msg.role === "ai"
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                        : "gradient-bg text-white"
                    )}
                      dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
                    />
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                      <span className="text-sm text-slate-500">Analyzing rooms...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                    placeholder="Ask about rooms, budgets, safety..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || loading}
                    className="p-2.5 gradient-bg text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RECOMMENDATIONS TAB */}
        {activeTab === "recommend" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-500" />
                AI Room Recommendations
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                Describe your requirements in natural language and AI will find the best matches.
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAIQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && runAIRecommend()}
                  placeholder='e.g. "Room under ₹7000 with WiFi and food near Delhi University"'
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
                <button
                  onClick={runAIRecommend}
                  disabled={!aiQuery.trim() || aiLoading}
                  className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                >
                  {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {aiLoading ? "Analyzing..." : "Get AI Picks"}
                </button>
              </div>

              {/* Sample queries */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  "Room under ₹6000 near IIT Bombay with WiFi",
                  "Safest room in Bangalore for girls",
                  "Best value room near JNU",
                  "Room with food and AC under ₹9000",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => setAIQuery(q)}
                    className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Results */}
            {aiLoading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4 pulse-glow">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium">AI is analyzing 600+ rooms...</p>
                <p className="text-slate-400 text-sm mt-1">Finding the best matches for you</p>
              </div>
            )}

            {aiResults.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  AI Recommendations for: <span className="text-indigo-600 dark:text-indigo-400">&quot;{aiQuery}&quot;</span>
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {aiResults.map((rec) => {
                    const room = getRoom(rec.roomId);
                    if (!room) return null;
                    return (
                      <motion.div
                        key={rec.roomId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{rec.category}</span>
                          <div className="flex items-center gap-2">
                            <div className="h-2 flex-1 w-32 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full gradient-bg" style={{ width: `${rec.confidence}%` }} />
                            </div>
                            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{rec.confidence}%</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">confidence</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-1">
                            <RoomCard room={room} showMatchScore />
                          </div>
                          <div className="sm:col-span-2 space-y-3">
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{rec.reason}</p>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3">
                                <div className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">✓ Pros</div>
                                <ul className="space-y-0.5">
                                  {rec.pros.filter((p) => p !== "None").map((pro) => (
                                    <li key={pro} className="text-xs text-green-600 dark:text-green-400 flex items-start gap-1">
                                      <CheckCircle className="w-3 h-3 mt-0.5 shrink-0" />
                                      {pro}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3">
                                <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">⚠ Cons</div>
                                <ul className="space-y-0.5">
                                  {rec.cons.filter((c) => c !== "None significant" && c !== "None").map((con) => (
                                    <li key={con} className="text-xs text-amber-600 dark:text-amber-400">{con}</li>
                                  ))}
                                  {rec.cons.every((c) => c === "None" || c === "None significant") && (
                                    <li className="text-xs text-green-600 dark:text-green-400">No significant cons!</li>
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* BUDGET PLANNER TAB */}
        {activeTab === "budget" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-500" />
                AI Budget Planner
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">
                Enter your monthly budget and city. AI will create a complete spending breakdown.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 block">Monthly Budget (₹)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    min={3000}
                    max={50000}
                    step={500}
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 block">City</label>
                  <select
                    value={budgetCity}
                    onChange={(e) => setBudgetCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none"
                  >
                    {["Delhi", "Mumbai", "Bangalore", "Pune", "Chennai", "Hyderabad", "Kolkata", "Jaipur", "Ahmedabad", "Lucknow"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={runBudgetPlan}
                    className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 flex items-center gap-2 whitespace-nowrap"
                  >
                    <Sparkles className="w-4 h-4" />
                    Plan My Budget
                  </button>
                </div>
              </div>
            </div>

            {budgetPlan && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {/* Chart */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">Budget Breakdown</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={budgetPlan.breakdown.filter((b) => b.amount > 0)}
                        dataKey="amount"
                        nameKey="label"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={(props: { name?: string; payload?: { percentage?: number } }) => {
                          const name = props.name ?? "";
                          const pct = props.payload?.percentage ?? 0;
                          return `${name} ${pct}%`;
                        }}
                        labelLine={false}
                      >
                        {budgetPlan.breakdown.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Breakdown List */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">Monthly Allocation for {budgetCity}</h3>
                  <div className="space-y-3">
                    {budgetPlan.breakdown.map(({ label, amount, percentage, color }) => (
                      <div key={label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                            {label}
                          </span>
                          <div className="text-right">
                            <span className="font-bold text-slate-900 dark:text-white">₹{amount.toLocaleString()}</span>
                            <span className="text-slate-400 ml-1 text-xs">({percentage}%)</span>
                          </div>
                        </div>
                        <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${percentage}%`, backgroundColor: color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">Total Budget</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">₹{budget.toLocaleString()}</span>
                  </div>
                  {budgetPlan.savings > 0 && (
                    <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <p className="text-sm text-green-700 dark:text-green-400">
                        💰 Great! You can save <strong>₹{budgetPlan.savings.toLocaleString()}/month</strong>. That&apos;s ₹{(budgetPlan.savings * 12).toLocaleString()} per year!
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
