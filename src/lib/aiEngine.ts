import { Room, AIRecommendation } from "@/types/room";

// Simulated AI scoring engine
export function calculateMatchScore(room: Room, preferences: {
  budget: number;
  distance: number;
  needsWifi: boolean;
  needsFood: boolean;
  needsAC: boolean;
  gender: string;
}): number {
  let score = 0;
  const weights = { budget: 30, distance: 25, amenities: 25, safety: 10, rating: 10 };

  // Budget score
  if (room.rent <= preferences.budget) {
    score += weights.budget;
  } else {
    const overBudget = (room.rent - preferences.budget) / preferences.budget;
    score += Math.max(0, weights.budget * (1 - overBudget));
  }

  // Distance score
  if (room.distance <= preferences.distance) {
    score += weights.distance * (1 - room.distance / preferences.distance);
  }

  // Amenities score
  let amenityScore = 0;
  if (preferences.needsWifi && room.wifi) amenityScore += 8;
  if (preferences.needsFood && room.food) amenityScore += 8;
  if (preferences.needsAC && room.ac) amenityScore += 5;
  if (room.security) amenityScore += 4;
  score += Math.min(amenityScore, weights.amenities);

  // Safety score
  score += (room.safetyScore / 10) * weights.safety;

  // Rating score
  score += (room.rating / 5) * weights.rating;

  // Gender match bonus
  if (preferences.gender && (room.gender === preferences.gender || room.gender === "Co-ed")) {
    score += 5;
  }

  return Math.min(100, Math.round(score));
}

export async function getAIRecommendations(query: string, rooms: Room[]): Promise<AIRecommendation[]> {
  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const lowerQuery = query.toLowerCase();

  // Extract intent from query
  const budgetMatch = lowerQuery.match(/₹?(\d+)/);
  const budget = budgetMatch ? parseInt(budgetMatch[1]) : 8000;
  const needsWifi = lowerQuery.includes("wifi") || lowerQuery.includes("internet");
  const needsFood = lowerQuery.includes("food") || lowerQuery.includes("mess");
  const needsAC = lowerQuery.includes("ac") || lowerQuery.includes("air");
  const cityMatch = ["delhi", "mumbai", "bangalore", "pune", "chennai", "hyderabad"].find((c) => lowerQuery.includes(c));
  const collegeMatch = rooms.find((r) => lowerQuery.includes(r.college.toLowerCase()));

  let filteredRooms = [...rooms];
  if (cityMatch) filteredRooms = filteredRooms.filter((r) => r.city.toLowerCase() === cityMatch);
  if (collegeMatch) filteredRooms = filteredRooms.filter((r) => r.college === collegeMatch.college);

  // Score and sort
  const scored = filteredRooms.map((room) => ({
    room,
    score: calculateMatchScore(room, { budget, distance: 3, needsWifi, needsFood, needsAC, gender: "" }),
  })).sort((a, b) => b.score - a.score);

  const top = scored.slice(0, 10);
  const budgetRooms = [...filteredRooms].filter((r) => r.rent <= budget).sort((a, b) => a.rent - b.rent);
  const premiumRooms = [...filteredRooms].filter((r) => r.rating >= 4.5).sort((a, b) => b.rating - a.rating);
  const quietRooms = [...filteredRooms].filter((r) => r.safetyScore >= 8.5).sort((a, b) => b.safetyScore - a.safetyScore);

  const recommendations: AIRecommendation[] = [];

  if (top[0]) {
    recommendations.push({
      roomId: top[0].room.id,
      category: "🏆 Top Recommendation",
      reason: `This room scores ${top[0].score}% match based on your requirements. It offers ${top[0].room.wifi ? "WiFi, " : ""}${top[0].room.food ? "food, " : ""}and is just ${top[0].room.distance}km from ${top[0].room.college}.`,
      confidence: top[0].score,
      pros: [
        top[0].room.wifi ? "High-speed WiFi included" : "Good connectivity nearby",
        `Safety score: ${top[0].room.safetyScore}/10`,
        `Rated ${top[0].room.rating}/5 by students`,
        top[0].room.verified ? "Owner verified" : "Popular choice",
      ],
      cons: [
        top[0].room.rent > budget ? `₹${top[0].room.rent - budget} over budget` : "None significant",
        !top[0].room.food ? "Food not included" : "None significant",
      ],
    });
  }

  if (budgetRooms[0]) {
    recommendations.push({
      roomId: budgetRooms[0].id,
      category: "💰 Budget Pick",
      reason: `At just ₹${budgetRooms[0].rent}/month, this is the most affordable option that meets your basic needs.`,
      confidence: Math.round(70 + Math.random() * 15),
      pros: [
        `₹${budget - budgetRooms[0].rent} under your budget`,
        budgetRooms[0].wifi ? "WiFi included" : "Low cost",
        `${budgetRooms[0].distance}km from college`,
      ],
      cons: [
        budgetRooms[0].rating < 4 ? "Average reviews" : "None",
        !budgetRooms[0].ac ? "No AC" : "None",
      ],
    });
  }

  if (premiumRooms[0]) {
    recommendations.push({
      roomId: premiumRooms[0].id,
      category: "⭐ Premium Choice",
      reason: `Rated ${premiumRooms[0].rating}/5 by students, this premium option offers top-tier facilities for the best experience.`,
      confidence: Math.round(75 + Math.random() * 20),
      pros: [
        `Outstanding rating: ${premiumRooms[0].rating}/5`,
        premiumRooms[0].ac ? "Air conditioned" : "Premium facilities",
        premiumRooms[0].verified ? "Verified trusted owner" : "Highly recommended",
        premiumRooms[0].food ? "Meals included" : "Premium amenities",
      ],
      cons: [
        premiumRooms[0].rent > budget ? `${Math.round(((premiumRooms[0].rent - budget) / budget) * 100)}% over budget` : "Higher deposit",
      ],
    });
  }

  if (quietRooms[0]) {
    recommendations.push({
      roomId: quietRooms[0].id,
      category: "📚 Quiet & Safe",
      reason: `With a safety score of ${quietRooms[0].safetyScore}/10, this is the ideal study-focused accommodation.`,
      confidence: Math.round(72 + Math.random() * 18),
      pros: [
        `Excellent safety: ${quietRooms[0].safetyScore}/10`,
        quietRooms[0].security ? "24/7 security guard" : "Safe locality",
        quietRooms[0].cctv ? "CCTV surveillance" : "Secure building",
        "Perfect for focused study",
      ],
      cons: [
        quietRooms[0].distance > 2 ? `${quietRooms[0].distance}km from college` : "Limited social activities",
      ],
    });
  }

  return recommendations;
}

export function getAIVerdict(rooms: Room[]): string {
  if (rooms.length === 0) return "No rooms selected for comparison.";
  if (rooms.length === 1) return `${rooms[0].name} is a solid choice with a ${rooms[0].rating}/5 rating.`;

  const winner = rooms.reduce((best, room) => {
    const score = room.aiMatchScore + room.safetyScore * 5 + room.rating * 10 - room.rent / 1000;
    const bestScore = best.aiMatchScore + best.safetyScore * 5 + best.rating * 10 - best.rent / 1000;
    return score > bestScore ? room : best;
  });

  const sorted = [...rooms].sort((a, b) => {
    const scoreA = a.aiMatchScore + a.safetyScore * 5 + a.rating * 10 - a.rent / 1000;
    const scoreB = b.aiMatchScore + b.safetyScore * 5 + b.rating * 10 - b.rent / 1000;
    return scoreB - scoreA;
  });

  const secondBest = sorted[1];

  return `🏆 AI Verdict: **${winner.name}** wins the comparison! It offers the best overall value with a ${winner.rating}/5 rating, ${winner.safetyScore}/10 safety score, and comprehensive amenities at ₹${winner.rent}/month. ${winner.verified ? "The owner is verified, giving you extra peace of mind. " : ""}${secondBest ? `${secondBest.name} is a close second, especially if budget is your priority.` : ""}`;
}

export function generateBudgetPlan(monthlyBudget: number, city: string): {
  rent: number; food: number; electricity: number; internet: number;
  travel: number; stationery: number; emergency: number; savings: number;
  breakdown: Array<{ label: string; amount: number; percentage: number; color: string }>;
} {
  const cityMultiplier: Record<string, number> = {
    Delhi: 1.2, Mumbai: 1.4, Bangalore: 1.3, Pune: 1.1,
    Chennai: 1.0, Hyderabad: 1.0, Kolkata: 0.9, Jaipur: 0.85,
    Ahmedabad: 0.9, Lucknow: 0.85,
  };
  const m = cityMultiplier[city] || 1;

  const rent = Math.round(monthlyBudget * 0.4);
  const food = Math.round(monthlyBudget * 0.25 * m);
  const electricity = Math.round(500 * m);
  const internet = Math.round(300 * m);
  const travel = Math.round(monthlyBudget * 0.08 * m);
  const stationery = Math.round(300 * m);
  const emergency = Math.round(monthlyBudget * 0.05);
  const savings = Math.max(0, monthlyBudget - rent - food - electricity - internet - travel - stationery - emergency);

  const total = rent + food + electricity + internet + travel + stationery + emergency + savings;

  return {
    rent, food, electricity, internet, travel, stationery, emergency, savings,
    breakdown: [
      { label: "Rent", amount: rent, percentage: Math.round((rent / total) * 100), color: "#6366f1" },
      { label: "Food", amount: food, percentage: Math.round((food / total) * 100), color: "#8b5cf6" },
      { label: "Electricity", amount: electricity, percentage: Math.round((electricity / total) * 100), color: "#a855f7" },
      { label: "Internet", amount: internet, percentage: Math.round((internet / total) * 100), color: "#3b82f6" },
      { label: "Travel", amount: travel, percentage: Math.round((travel / total) * 100), color: "#06b6d4" },
      { label: "Stationery", amount: stationery, percentage: Math.round((stationery / total) * 100), color: "#10b981" },
      { label: "Emergency Fund", amount: emergency, percentage: Math.round((emergency / total) * 100), color: "#f59e0b" },
      { label: "Savings", amount: savings, percentage: Math.round((savings / total) * 100), color: "#22c55e" },
    ],
  };
}

export function generateAIReviewSummary(room: Room) {
  const positives = [
    room.wifi ? "Students praise the fast WiFi connectivity." : "",
    room.food ? "The food quality and variety get consistent praise." : "",
    room.security ? "Security arrangements are frequently mentioned as excellent." : "",
    room.ac ? "Air conditioning keeps the room comfortable year-round." : "",
    room.rating >= 4 ? "Overall living experience is rated highly." : "",
  ].filter(Boolean);

  const negatives = [
    !room.food ? "Some students wished food was included." : "",
    !room.parking ? "Parking can be difficult in the area." : "",
    room.buildingAge > 10 ? "Building shows some age-related wear." : "",
    !room.powerBackup ? "Power cuts can be an issue." : "",
  ].filter(Boolean);

  return {
    positive: positives.length > 0 ? positives.join(" ") : "Students generally appreciate the facilities.",
    negative: negatives.length > 0 ? negatives.join(" ") : "No significant complaints reported.",
    overall: `${room.name} is a ${room.rating >= 4.2 ? "highly recommended" : room.rating >= 3.7 ? "well-regarded" : "decent"} accommodation near ${room.college}. The ${room.safetyScore >= 8 ? "excellent" : "reasonable"} safety measures and ${room.distance < 1 ? "very close" : "convenient"} location make it suitable for most students.`,
    complaints: [
      !room.food ? "No in-house food" : null,
      !room.laundry ? "No laundry facility" : null,
      !room.parking ? "Limited parking" : null,
    ].filter(Boolean) as string[],
  };
}

export function predictRentTrend(room: Room): string {
  const trends: Record<string, string> = {
    rising: `📈 Rent may increase by 10–15% next semester due to high demand near ${room.college}. Book now to lock in current rates.`,
    stable: `📊 Rent is expected to remain stable around ₹${room.rent}/month. This area has consistent demand.`,
    falling: `📉 Rent in this area may slightly decrease due to new PGs opening nearby. Good time to negotiate.`,
  };
  return trends[room.rentTrend] || trends.stable;
}

export async function getChatResponse(message: string, rooms: Room[]): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("safest") || lowerMsg.includes("safe")) {
    const safest = [...rooms].sort((a, b) => b.safetyScore - a.safetyScore)[0];
    return `🛡️ The **safest room** in our database is **${safest.name}** in ${safest.city} with a safety score of **${safest.safetyScore}/10**. It features ${safest.security ? "24/7 security guard" : "secure premises"}${safest.cctv ? ", CCTV cameras" : ""}, and is well-lit. Located near ${safest.college}. Rent: ₹${safest.rent}/month.`;
  }

  if (lowerMsg.includes("wifi") || lowerMsg.includes("internet") || lowerMsg.includes("fastest")) {
    const wifiRooms = rooms.filter((r) => r.wifi && r.internetSpeed !== "Not available")
      .sort((a, b) => {
        const speedA = parseInt(a.internetSpeed) || 0;
        const speedB = parseInt(b.internetSpeed) || 0;
        return speedB - speedA;
      });
    const top = wifiRooms[0];
    if (top) return `🌐 **${top.name}** offers the fastest WiFi at **${top.internetSpeed}** in ${top.city}. Perfect for online classes, coding, and research. Rent: ₹${top.rent}/month near ${top.college}.`;
    return "I couldn't find rooms with confirmed fast WiFi. Please use filters to browse WiFi-enabled rooms.";
  }

  if (lowerMsg.includes("cheap") || lowerMsg.includes("affordable") || lowerMsg.includes("budget") || lowerMsg.includes("lowest")) {
    const cheapest = [...rooms].sort((a, b) => a.rent - b.rent)[0];
    return `💰 The **most affordable room** is **${cheapest.name}** at just **₹${cheapest.rent}/month** in ${cheapest.city}, ${cheapest.distance}km from ${cheapest.college}. It has a ${cheapest.rating}/5 rating.${cheapest.food ? " Food included!" : ""}`;
  }

  if (lowerMsg.includes("upsc") || lowerMsg.includes("exam") || lowerMsg.includes("study") || lowerMsg.includes("quiet")) {
    const studyRooms = rooms.filter((r) => r.safetyScore >= 8 && r.wifi && r.lifestyle.includes("Competitive Exam Student"))
      .sort((a, b) => b.safetyScore - a.safetyScore);
    const top = studyRooms[0] || rooms.sort((a, b) => b.safetyScore - a.safetyScore)[0];
    return `📚 For **UPSC/competitive exam preparation**, I recommend **${top.name}** in ${top.city}. It's in a quiet locality (safety: ${top.safetyScore}/10)${top.wifi ? ", has WiFi" : ""}${top.food ? ", meals included" : ""}. The ${top.distance}km distance from ${top.college} means minimal commute time for focused studying. Rent: ₹${top.rent}/month.`;
  }

  if (lowerMsg.includes("value") || lowerMsg.includes("best") || lowerMsg.includes("recommend")) {
    const bestValue = [...rooms]
      .filter((r) => r.verified && r.rating >= 4)
      .sort((a, b) => (b.rating * 1000 - b.rent / 10) - (a.rating * 1000 - a.rent / 10))[0]
      || rooms[0];
    return `⭐ **Best overall value**: **${bestValue.name}** in ${bestValue.city}. Rated **${bestValue.rating}/5** with ${bestValue.reviewsCount} reviews. At ₹${bestValue.rent}/month with a ${bestValue.safetyScore}/10 safety score, it offers exceptional value. ${bestValue.verified ? "Owner is verified. " : ""}${bestValue.wifi ? "WiFi included. " : ""}${bestValue.food ? "Meals provided." : ""}`;
  }

  if (lowerMsg.includes("delhi")) {
    const delhiRooms = rooms.filter((r) => r.city === "Delhi").sort((a, b) => b.aiMatchScore - a.aiMatchScore);
    if (delhiRooms.length > 0) {
      const top = delhiRooms[0];
      return `🏙️ In **Delhi**, the top-rated option is **${top.name}** near ${top.college} at ₹${top.rent}/month. Delhi has ${delhiRooms.length} available rooms in our database. Notable colleges covered: Delhi University, JNU, IIT Delhi, AIIMS. Want me to filter by budget or amenities?`;
    }
  }

  if (lowerMsg.includes("women") || lowerMsg.includes("female") || lowerMsg.includes("girls")) {
    const femaleRooms = rooms.filter((r) => r.gender === "Female" || r.gender === "Co-ed")
      .sort((a, b) => b.safetyScore - a.safetyScore);
    const top = femaleRooms[0];
    if (top) return `🌸 For **female students**, **${top.name}** in ${top.city} is highly recommended with a safety score of ${top.safetyScore}/10. It's ${top.gender === "Female" ? "exclusively for female students" : "co-ed but women-friendly"}. ${top.security ? "24/7 security guard present." : ""} Rent: ₹${top.rent}/month.`;
  }

  if (lowerMsg.includes("food") || lowerMsg.includes("mess")) {
    const foodRooms = rooms.filter((r) => r.food).sort((a, b) => b.rating - a.rating);
    const top = foodRooms[0];
    if (top) return `🍽️ **${top.name}** in ${top.city} offers the best in-house food service. Rated ${top.rating}/5 by students. Monthly rent including meals: ₹${top.rent}. Located ${top.distance}km from ${top.college}.`;
    return "Looking for rooms with food? Use the 'Food' filter in the Browse section to find all options with in-house meals!";
  }

  // General fallback
  return `🤖 I understand you're asking about "${message}". I can help you find rooms based on:\n\n• **Safety** - "Which room is safest?"\n• **WiFi** - "Fastest WiFi rooms"\n• **Budget** - "Cheapest rooms in Delhi"\n• **Study** - "Best for UPSC preparation"\n• **Value** - "Best value for money"\n• **Food** - "Rooms with meals included"\n\nTry one of these queries and I'll find the perfect match! 🏠`;
}
