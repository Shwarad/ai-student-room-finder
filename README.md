<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=6366f1,8b5cf6,a855f7&height=200&section=header&text=AI%20RoomFinder&fontSize=60&fontColor=ffffff&fontAlignY=38&desc=Find%20Your%20Perfect%20Student%20Room%20with%20AI&descAlignY=58&descSize=18&animation=fadeIn" width="100%"/>

<br/>

<p>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/IBM_Granite_AI-Powered-0062ff?style=for-the-badge&logo=ibm&logoColor=white"/>
</p>

<p>
  <img src="https://img.shields.io/badge/Challenge-Wildcard-blueviolet?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Built_with-IBM_Bob-0062ff?style=for-the-badge&logo=ibm&logoColor=white"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square"/>
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square"/>
  <img src="https://img.shields.io/badge/Made%20with-❤️-red?style=flat-square"/>
</p>

<br/>

> **AI-powered student accommodation finder** — Get intelligent room recommendations based on budget, safety, amenities, and lifestyle preferences. Built for Indian students. Powered by IBM Granite AI.

<br/>

[🚀 Live Demo](#) · [📖 Docs](#getting-started) · [🐛 Report Bug](https://github.com/Shwarad/ai-student-room-finder/issues) · [✨ Request Feature](https://github.com/Shwarad/ai-student-room-finder/issues)

</div>

---

## 📌 Table of Contents

- [Challenge Theme](#-challenge-theme)
- [Problem Statement](#-problem-statement)
- [Solution Description](#-solution-description)
- [AI Approach & Architecture](#-ai-approach--architecture)
- [How IBM Bob Was Used](#-how-ibm-bob-was-used)
- [What Is This?](#-what-is-this)
- [How It Helps](#-how-it-helps)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🏆 Challenge Theme

**Selected Theme: Wildcard Challenge**

This project was built for the **Wildcard Challenge** — an open-ended track that invites builders to identify a real-world problem and solve it creatively using AI. AI RoomFinder tackles one of the most universally stressful experiences for students in India: finding safe, affordable accommodation near their college — and solves it with a purpose-built AI engine, natural language understanding, and intelligent multi-factor scoring.

---

## 🚨 Problem Statement

Every year, **millions of students** across India relocate to new cities for higher education. Finding suitable accommodation — a PG (Paying Guest), hostel, or shared flat — is one of the most time-consuming, stressful, and risky challenges they face.

### The Core Problems

| Problem | Impact |
|---|---|
| **Fragmented listings** | Students must manually check OLX, MagicBricks, Facebook groups, and word-of-mouth — with no single trusted source |
| **Scam listings** | First-year students unfamiliar with the city frequently fall victim to fraudulent listings with fake photos and inflated prices |
| **No personalisation** | Generic search filters (city, price range) cannot match students' nuanced needs: quiet for exams, vegetarian food, female-only, near a specific metro station |
| **No safety signal** | There is no standard way to evaluate the safety of a PG — students have no reliable indicator of CCTV coverage, security staff, or neighbourhood safety |
| **Information overload** | Hundreds of listings make decision-making exhausting. Students spend 2–4 weeks on average before finalising a room |
| **No financial planning** | Students rarely understand how rent interacts with food, travel, electricity, and other living costs in a new city |

---

## ✅ Solution Description

**AI RoomFinder** is a full-stack, AI-powered student accommodation platform that eliminates the friction of room hunting through intelligent automation and natural language interaction.

### How It Solves the Problem

1. **Single unified platform** — 600+ verified listings across 10+ Indian cities, covering 40+ top colleges, accessible through one interface.

2. **AI Match Scoring** — Every room is evaluated against the student's stated preferences (budget, distance, amenities, lifestyle) using a weighted multi-factor algorithm that produces a 0–100% compatibility score. Students see the *right* rooms first, not just *all* rooms.

3. **Natural Language Search** — Instead of filling in complex forms, students type plain English queries like *"I want a furnished PG near IIT Delhi under ₹8000 with WiFi and food"*. The AI parses intent, extracts constraints, and returns ranked recommendations with explanations.

4. **Safety Score** — Each listing carries a calculated safety score (0–10) derived from security guard presence, CCTV, power backup, building age, and neighbourhood data. Students can filter by minimum safety score.

5. **Scam Detection** — Listings are flagged `low / medium / high` risk using heuristic pattern analysis on price anomalies, verification status, and description characteristics. High-risk listings are visually de-emphasised.

6. **AI Comparison** — Up to 3 rooms can be compared side-by-side with a feature-by-feature breakdown. An AI verdict identifies the winner and explains its reasoning in plain language.

7. **Budget Planner** — City-aware financial planning tool that distributes a monthly budget across rent, food, electricity, internet, travel, stationery, and emergency fund — helping students set realistic expectations before relocating.

8. **Rent Trend Prediction** — Each listing carries a rent trend tag (`rising / stable / falling`) with a natural-language explanation to help students time their decisions.

9. **AI Chatbot** — A persistent chat assistant available on every page answers student queries in real-time: *"Safest room in Mumbai?"*, *"Best WiFi for remote study?"*, *"Cheapest option near Osmania University?"*

---

## 🤖 AI Approach & Architecture

### Overview

The AI layer in this project is a **simulated IBM Granite-style inference engine** built entirely in TypeScript (`src/lib/aiEngine.ts`). It demonstrates the reasoning patterns and output formats that a production IBM Granite LLM integration would produce, making the system ready for a live API swap with minimal changes.

### Architecture Diagram

```
User Query / Preferences
         │
         ▼
┌─────────────────────────────────────────┐
│           AI Engine (aiEngine.ts)        │
│                                         │
│  ┌───────────────┐  ┌─────────────────┐ │
│  │  NL Intent    │  │  Match Scoring  │ │
│  │  Extractor    │  │  Engine         │ │
│  │               │  │                 │ │
│  │ • Budget      │  │ • Budget weight │ │
│  │ • City        │  │ • Distance wt.  │ │
│  │ • College     │  │ • Amenity wt.   │ │
│  │ • Amenities   │  │ • Safety wt.    │ │
│  │ • Lifestyle   │  │ • Rating wt.    │ │
│  └──────┬────────┘  └────────┬────────┘ │
│         │                    │          │
│         ▼                    ▼          │
│  ┌──────────────────────────────────┐   │
│  │         Room Ranker              │   │
│  │  Filters → Scores → Sorts → Top N│   │
│  └──────────────────┬───────────────┘   │
│                     │                   │
│  ┌──────────────────▼───────────────┐   │
│  │    Response Generator            │   │
│  │  • AI Recommendations (4 types)  │   │
│  │  • AI Verdict (compare)          │   │
│  │  • Chat Response (8 intents)     │   │
│  │  • Review Summary                │   │
│  │  • Rent Trend Prediction         │   │
│  │  • Budget Breakdown              │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
         │
         ▼
  Structured Output → UI Components
```

### AI Modules

#### 1. `calculateMatchScore(room, preferences)` → `0–100`
A weighted scoring function that evaluates a room against a student's stated preferences:

| Factor | Weight | Logic |
|---|---|---|
| **Budget** | 30% | Full score if within budget; linearly decays as rent exceeds budget |
| **Distance** | 25% | Score inversely proportional to distance from college |
| **Amenities** | 25% | +8 pts WiFi, +8 pts food, +5 pts AC, +4 pts security (capped at 25) |
| **Safety** | 10% | `safetyScore / 10 × 10` |
| **Rating** | 10% | `rating / 5 × 10` |
| **Gender bonus** | +5 | Applied when room gender matches student preference or is Co-ed |

#### 2. `getAIRecommendations(query, rooms)` → `AIRecommendation[]`
Parses a natural language query to extract budget, city, college, WiFi/food/AC needs via regex and keyword matching. Returns 4 curated recommendation categories:
- 🏆 **Top Recommendation** — highest composite match score
- 💰 **Budget Pick** — most affordable option meeting basic needs
- ⭐ **Premium Choice** — highest student rating (≥ 4.5)
- 📚 **Quiet & Safe** — highest safety score (≥ 8.5), ideal for exam preparation

Each recommendation includes a confidence score, `pros[]`, and `cons[]` for transparent reasoning.

#### 3. `getAIVerdict(rooms)` → `string`
Compares 2–3 rooms using a composite formula:
```
score = aiMatchScore + (safetyScore × 5) + (rating × 10) − (rent / 1000)
```
Returns a winner with a natural-language explanation identifying runner-up and key differentiators.

#### 4. `getChatResponse(message, rooms)` → `string`
Intent-based chat engine recognising 8 query types:
- Safety queries → ranked by `safetyScore`
- WiFi/speed queries → ranked by parsed `internetSpeed` (Mbps)
- Budget/affordable queries → ranked by `rent` ascending
- Study/exam queries → filtered by lifestyle tag + safety score
- Best-value queries → filtered by `verified + rating ≥ 4`, sorted by rating/rent ratio
- City-specific queries → filtered by city name
- Gender/female queries → filtered by `gender === "Female" || "Co-ed"`
- Food queries → filtered by `food === true`

#### 5. `generateBudgetPlan(budget, city)` → Breakdown object
Produces a city-multiplier-adjusted (10 cities) monthly budget split across 8 expense categories with colour-coded Recharts data ready for visualisation.

#### 6. `generateAIReviewSummary(room)` → `{ positive, negative, overall, complaints }`
Synthesises a structured review summary from room attributes, generating human-readable positive/negative highlights and an overall verdict.

#### 7. `predictRentTrend(room)` → `string`
Maps the room's `rentTrend` field (`rising / stable / falling`) to a natural-language forecast with actionable advice.

### Why IBM Granite

IBM Granite is designed for trustworthy, enterprise-grade AI with strong instruction-following and structured output capabilities. The AI engine architecture mirrors Granite's approach: **transparent reasoning** (every recommendation includes explicit pros/cons and a confidence score), **deterministic scoring** (reproducible match scores from well-defined weights), and **safety-first design** (scam risk and safety scores are surfaced prominently). The codebase is architected so that replacing the simulated engine with live IBM Granite API calls requires only swapping the `getChatResponse` and `getAIRecommendations` implementations — all interfaces and output types remain the same.

---

## 🤖 How IBM Bob Was Used

**IBM Bob** (the AI software engineering assistant) was used extensively as the primary development partner throughout the entire build of this project. Here is exactly how:

### 1. Full Codebase Architecture & Scaffolding
Bob was used to design the full project structure from scratch — deciding the Next.js 16 App Router layout, the separation of concerns between `data/`, `lib/`, `components/`, `context/`, and `app/` directories, and establishing the TypeScript interfaces in `src/types/room.ts` that every other module depends on.

### 2. AI Engine Design
The entire `src/lib/aiEngine.ts` was architected with Bob's guidance — from the weighted scoring formula in `calculateMatchScore()` to the intent-parsing logic in `getChatResponse()`. Bob helped define the 8 chat intents, the 4 recommendation categories, and the composite verdict formula used in `getAIVerdict()`.

### 3. Data Generation
Bob designed the procedural room generation system in `src/data/rooms.ts` — including city multipliers for rent, randomised but realistic amenity distributions, the review system, nearby places templates, and image assignments by room type — producing a realistic 600-room dataset without a database.

### 4. Component Development
Bob wrote and iterated on the core UI components:
- [`RoomCard.tsx`](src/components/rooms/RoomCard.tsx) — the primary card with hover effects, badge system, and action buttons
- [`AIChatbot.tsx`](src/components/ai/AIChatbot.tsx) — the floating chat widget with message formatting and suggestion chips
- [`BrowseContent.tsx`](src/app/browse/BrowseContent.tsx) — the full filtering, sorting, and pagination system

### 5. Authentication Integration
Bob integrated Supabase OAuth (Google + GitHub) across the full auth flow: client/server Supabase clients, the OAuth callback route handler, session management in `AppContext.tsx`, and the split-panel login UI in `src/app/login/page.tsx`.

### 6. State Management
Bob designed the `AppContext` with all persistence logic — localStorage sync for dark mode, favorites, compare list, and recently viewed rooms, plus Supabase auth state subscription and clean teardown.

### 7. Codebase Exploration & Documentation
Bob read and analysed every file in the project to produce this comprehensive README — understanding the architecture, AI logic, and design patterns from the source code directly, without any manual explanation from the developer.

### 8. README Authoring
This README itself was written by Bob — including the problem statement, solution description, AI architecture diagram, module documentation, and this section.

---

## 🎯 What Is This?

**AI Student Room Finder** is a next-generation student accommodation platform that eliminates the stress of finding a place to stay near your college. Traditional room-hunting is time-consuming, unsafe, and overwhelming — this app solves all of that using **AI**.

Students simply describe what they need in plain English — *"I want a furnished PG near IIT Delhi under ₹8000 with WiFi and food"* — and the AI instantly finds, scores, and explains the best matching rooms from a database of **600+ verified listings** across 10+ Indian cities.

No more scrolling through endless listings. No more falling for scams. No more guessing if a room is safe.

---

## 💡 How It Helps

<table>
<tr>
<td width="50%">

### 😤 The Problem
- Students waste **days** browsing unverified listings
- **Scam listings** trap unsuspecting first-year students
- No way to compare rooms across **safety, price & amenities**
- Generic search filters miss **lifestyle preferences**
- No insight into **future rent trends**

</td>
<td width="50%">

### ✅ Our Solution
- AI finds the **best match in seconds** using natural language
- **Scam detection** flags suspicious listings automatically
- Side-by-side comparison with an **AI verdict**
- Personalised recommendations based on **lifestyle & budget**
- **Rent prediction** to plan finances ahead of time

</td>
</tr>
</table>

---

## ✨ Key Features

<table>
<tr>
<td align="center" width="33%">
<br/>
🧠<br/>
<b>AI Match Score</b><br/>
<sub>Every room is scored 0–100% based on your budget, location, college proximity, and lifestyle preferences.</sub>
</td>
<td align="center" width="33%">
<br/>
🛡️<br/>
<b>Safety Score</b><br/>
<sub>AI-calculated ratings using CCTV presence, security guards, street lighting, and nearby emergency services.</sub>
</td>
<td align="center" width="33%">
<br/>
⚠️<br/>
<b>Scam Detection</b><br/>
<sub>Advanced AI flags suspicious listings using price anomalies, image analysis, and description patterns.</sub>
</td>
</tr>
<tr>
<td align="center" width="33%">
<br/>
📊<br/>
<b>Rent Prediction</b><br/>
<sub>Forecasts rent trends for the next 3–6 months so you can lock in the best deal at the right time.</sub>
</td>
<td align="center" width="33%">
<br/>
⚖️<br/>
<b>Instant Comparison</b><br/>
<sub>Compare up to 3 rooms side by side with an AI-generated verdict on which is the best overall value.</sub>
</td>
<td align="center" width="33%">
<br/>
💬<br/>
<b>AI Chatbot</b><br/>
<sub>Ask anything in plain text — "safest room in Delhi under ₹7000" — and get instant smart answers.</sub>
</td>
</tr>
<tr>
<td align="center" width="33%">
<br/>
❤️<br/>
<b>Favourites & History</b><br/>
<sub>Save rooms you love and revisit your recently viewed listings with a personalised dashboard.</sub>
</td>
<td align="center" width="33%">
<br/>
🏙️<br/>
<b>10+ Cities</b><br/>
<sub>Covering Delhi, Mumbai, Bangalore, Pune, Hyderabad, Chennai, Kolkata and more.</sub>
</td>
<td align="center" width="33%">
<br/>
🌙<br/>
<b>Dark Mode</b><br/>
<sub>Full dark/light mode with smooth transitions and a premium glass-morphism UI throughout.</sub>
</td>
</tr>
</table>

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16 (App Router) | SSR, routing, API routes |
| **UI Library** | React 19 | Component architecture |
| **Language** | TypeScript 5 | Type safety across the codebase |
| **Styling** | Tailwind CSS 4 | Utility-first responsive design |
| **Animations** | Framer Motion 12 | Page transitions, micro-interactions |
| **Charts** | Recharts 3 | Rent trend visualisations |
| **Icons** | Lucide React | Consistent icon system |
| **UI Primitives** | Radix UI | Accessible dialogs, sliders, tabs |
| **AI Engine** | IBM Granite (simulated) | Match scoring, chat, scam detection |
| **Auth** | Supabase (OAuth) | Google & GitHub sign-in, session management |
| **Fonts** | Inter + Plus Jakarta Sans | Premium typography |
| **Package Manager** | npm | Dependency management |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18.x`
- npm `>= 9.x`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Shwarad/ai-student-room-finder.git

# 2. Navigate into the project
cd ai-student-room-finder

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env.local
# Add your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 📁 Project Structure

```
ai-student-room-finder/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage (Hero, Features, CTA)
│   │   ├── layout.tsx            # Root layout (Navbar, Footer)
│   │   ├── globals.css           # Global styles & design tokens
│   │   ├── browse/               # Room browsing with filters
│   │   ├── rooms/[id]/           # Individual room detail page
│   │   ├── compare/              # Side-by-side room comparison
│   │   ├── ai-assistant/         # AI chat interface + budget planner
│   │   ├── favorites/            # Saved rooms
│   │   ├── dashboard/            # Personalised dashboard
│   │   ├── login/                # OAuth login (Google + GitHub)
│   │   ├── auth/callback/        # Supabase OAuth callback
│   │   └── about/                # About page
│   ├── components/
│   │   ├── layout/               # Navbar, Footer
│   │   ├── rooms/                # RoomCard, RoomSkeleton
│   │   └── ai/                   # AIChatbot
│   ├── context/
│   │   └── AppContext.tsx        # Global state (favourites, dark mode, auth)
│   ├── data/
│   │   └── rooms.ts              # 600+ procedurally generated room dataset
│   ├── lib/
│   │   ├── aiEngine.ts           # AI scoring, chat, budget & review logic
│   │   ├── utils.ts              # Helper utilities (cn, formatRent, etc.)
│   │   └── supabase/             # Client & server Supabase instances
│   └── types/
│       └── room.ts               # TypeScript interfaces
└── public/                       # Static assets
```

---

## 🗺️ Future Roadmap

```
2026 Q3 ── Real IBM Granite AI Integration
            └── Live API calls to IBM Granite LLM
            └── Semantic room search via embeddings
            └── AI-generated review summaries

2026 Q3 ── Real-time Listings
            └── Landlord portal to list rooms
            └── Live availability status
            └── In-app messaging between students & landlords

2026 Q4 ── Advanced AI Features
            └── Roommate matching algorithm
            └── Neighbourhood vibe score
            └── Commute time calculator (Google Maps API)

2027 Q1 ── Mobile App
            └── React Native / Expo app
            └── Push notifications for new listings
            └── AR room preview

2027 Q1 ── Payment Integration
            └── Online rent payment via Razorpay
            └── Rental agreement e-signing
            └── Deposit escrow system

2027 Q2 ── Community Features
            └── Student reviews & photo uploads
            └── College community boards
            └── Verified student badges
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feat/amazing-feature

# 3. Commit your changes
git commit -m "feat: add amazing feature"

# 4. Push to the branch
git push origin feat/amazing-feature

# 5. Open a Pull Request
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=6366f1,8b5cf6,a855f7&height=100&section=footer&animation=fadeIn" width="100%"/>

Made with ❤️ by [Shwarad](https://github.com/Shwarad) · Built with [IBM Bob](https://www.ibm.com/products/watsonx-code-assistant) · © 2026 AI RoomFinder

<br/>

⭐ **Star this repo if you found it useful!** ⭐

</div>
