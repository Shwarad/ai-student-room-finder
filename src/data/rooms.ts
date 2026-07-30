import { Room } from "@/types/room";

const cities = ["Delhi", "Mumbai", "Bangalore", "Pune", "Chennai", "Hyderabad", "Kolkata", "Jaipur", "Ahmedabad", "Lucknow"];

const collegesByCity: Record<string, string[]> = {
  Delhi: ["Delhi University", "JNU", "IIT Delhi", "AIIMS", "Jamia Millia", "DTU", "NSIT"],
  Mumbai: ["IIT Bombay", "Mumbai University", "TISS", "ICT Mumbai", "Somaiya College", "SP College"],
  Bangalore: ["IISc", "IIT Bangalore", "Christ University", "BMS College", "RV College", "NMIT"],
  Pune: ["Pune University", "COEP", "VIT Pune", "MIT Pune", "Symbiosis", "PICT"],
  Chennai: ["IIT Madras", "Anna University", "Loyola College", "MCC", "SRM Chennai"],
  Hyderabad: ["IIT Hyderabad", "OU Hyderabad", "BITS Pilani Hyderabad", "JNTU", "Osmania University"],
  Kolkata: ["IIT Kharagpur", "Jadavpur University", "Presidency College", "St. Xavier's Kolkata"],
  Jaipur: ["IIT Jodhpur", "BITS Pilani", "Manipal Jaipur", "Poornima University"],
  Ahmedabad: ["IIM Ahmedabad", "CEPT", "Nirma University", "Gujarat University"],
  Lucknow: ["IIT Kanpur", "Lucknow University", "BBAU", "KGMU Lucknow"],
};

const roomNames = [
  "Sunrise PG", "Green Valley Hostel", "Metro Nest", "Scholar's Den", "Campus View",
  "Elite Residency", "Cozy Corner PG", "The Student Hub", "Urban Nest", "Calm Abode",
  "Harmony Hostel", "Prime Stay", "Smart Rooms", "Comfort Zone PG", "Peak View Hostel",
  "City Lights PG", "The Oasis", "Study Circle PG", "Bright Future Hostel", "Royal Residency",
  "Blue Ridge PG", "Silver Oak Hostel", "Nature's Nest", "Campus Connect", "Dream Stay",
  "The Knowledge Hub", "Bliss Residency", "Student's Paradise", "Quick Stay PG", "Alpha Hostel",
];

const ownerNames = [
  "Rajesh Kumar", "Sunita Sharma", "Amit Singh", "Priya Patel", "Vikram Mehta",
  "Anita Gupta", "Deepak Verma", "Meera Nair", "Suresh Reddy", "Kavita Joshi",
  "Rohit Agarwal", "Sneha Mishra", "Ashok Yadav", "Ritu Sinha", "Prakash Bhatt",
];

const nearbyTemplates = [
  { name: "City Metro Station", type: "metro" as const, distance: "0.3km", walkingTime: "4 min" },
  { name: "Main Bus Stand", type: "bus" as const, distance: "0.2km", walkingTime: "3 min" },
  { name: "Apollo Hospital", type: "hospital" as const, distance: "1.2km", walkingTime: "15 min" },
  { name: "Public Library", type: "library" as const, distance: "0.5km", walkingTime: "6 min" },
  { name: "Cafe Coffee Day", type: "cafe" as const, distance: "0.1km", walkingTime: "2 min" },
  { name: "Gold's Gym", type: "gym" as const, distance: "0.8km", walkingTime: "10 min" },
  { name: "Big Bazaar", type: "market" as const, distance: "0.6km", walkingTime: "8 min" },
  { name: "MedPlus Pharmacy", type: "pharmacy" as const, distance: "0.3km", walkingTime: "4 min" },
  { name: "Domino's Pizza", type: "restaurant" as const, distance: "0.4km", walkingTime: "5 min" },
  { name: "City Park", type: "park" as const, distance: "0.7km", walkingTime: "9 min" },
];

const reviewComments = [
  "Great place to stay, very clean and well maintained. Owner is helpful and responsive.",
  "WiFi speed is excellent, perfect for online classes and assignments.",
  "Food quality is good and hygienic. Mess timings are convenient.",
  "Very safe locality, security guard is always present. CCTV cameras installed.",
  "AC works perfectly and rooms are well furnished. Highly recommend.",
  "Good location, close to college and public transport. Very convenient.",
  "Affordable rent with good facilities. Perfect for students on a budget.",
  "Quiet environment, great for studying and focused work.",
  "Management is responsive and maintenance is prompt.",
  "Clean bathrooms and regular housekeeping. Very comfortable stay.",
  "Parking available for two-wheelers. Very convenient.",
  "Power backup ensures no disruption during studies.",
  "Nice community of students, everyone is friendly and cooperative.",
  "The study room is spacious and well lit. Great for group studies.",
  "Water supply is regular. No issues at all during my stay.",
];

const reviewerNames = [
  "Aryan Kapoor", "Neha Singh", "Rohit Sharma", "Priya Verma", "Raj Patel",
  "Ananya Mishra", "Karan Mehta", "Simran Kaur", "Vivek Gupta", "Pooja Nair",
  "Aditya Kumar", "Shruti Joshi", "Yash Agarwal", "Divya Reddy", "Manish Yadav",
];

const collegeList = ["Delhi University", "JNU", "IIT Delhi", "AIIMS", "IIT Bombay", "Mumbai University"];

const lifestyleOptions = [
  ["Introvert", "Night Owl", "Research Scholar"],
  ["Extrovert", "Early Bird", "Gym Lover"],
  ["Competitive Exam Student", "Introvert", "Night Owl"],
  ["Gamer", "Extrovert", "Night Owl"],
  ["Research Scholar", "Early Bird", "Introvert"],
  ["Gym Lover", "Extrovert", "Early Bird"],
];

const highlights = [
  ["Best Value", "Near College", "High Speed WiFi"],
  ["Premium Facilities", "Verified Owner", "High Safety"],
  ["Budget Friendly", "Clean Environment", "Good Food"],
  ["Quiet Zone", "Study Friendly", "Peaceful"],
  ["Sports Facilities", "Social Community", "Modern Infrastructure"],
];

const roomImages: Record<string, string[]> = {
  Single: [
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
  ],
  Double: [
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
  ],
  Triple: [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800&q=80",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
  ],
  Studio: [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
  ],
  PG: [
    "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
  ],
  Shared: [
    "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=800&q=80",
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
  ],
};

function generateReviews(count: number) {
  return Array.from({ length: Math.min(count, 5) }, (_, i) => ({
    id: `rev-${i}`,
    userName: reviewerNames[i % reviewerNames.length],
    rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
    comment: reviewComments[i % reviewComments.length],
    date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN"),
    helpful: Math.floor(Math.random() * 20),
    college: collegeList[i % collegeList.length],
  }));
}

function generateNearby() {
  const count = 4 + Math.floor(Math.random() * 4);
  return nearbyTemplates.slice(0, count);
}

function getRentForType(type: string, city: string): number {
  const cityMultiplier: Record<string, number> = {
    Delhi: 1.3, Mumbai: 1.5, Bangalore: 1.4, Pune: 1.2,
    Chennai: 1.1, Hyderabad: 1.1, Kolkata: 1.0, Jaipur: 0.9,
    Ahmedabad: 0.95, Lucknow: 0.85,
  };
  const typeRent: Record<string, number> = {
    Single: 7000, Double: 5000, Triple: 4000, Studio: 9000, PG: 6000, Shared: 3500,
  };
  const base = typeRent[type] || 5000;
  const mult = cityMultiplier[city] || 1;
  const variance = 0.7 + Math.random() * 0.6;
  return Math.round((base * mult * variance) / 100) * 100;
}

function generateRoom(id: number): Room {
  const city = cities[id % cities.length];
  const collegesInCity = collegesByCity[city];
  const college = collegesInCity[id % collegesInCity.length];
  const roomTypes = ["Single", "Double", "Triple", "Studio", "PG", "Shared"] as const;
  const genders = ["Male", "Female", "Co-ed"] as const;
  const trendOptions = ["rising", "stable", "falling"] as const;
  const riskOptions = ["low", "medium", "high"] as const;

  const roomType = roomTypes[id % roomTypes.length];
  const gender = genders[id % genders.length];
  const rent = getRentForType(roomType, city);
  const rating = Math.round((3.2 + Math.random() * 1.8) * 10) / 10;
  const safetyScore = Math.round((6 + Math.random() * 4) * 10) / 10;
  const aiMatchScore = Math.floor(50 + Math.random() * 50);

  const cityCoords: Record<string, [number, number]> = {
    Delhi: [28.6139, 77.2090], Mumbai: [19.0760, 72.8777],
    Bangalore: [12.9716, 77.5946], Pune: [18.5204, 73.8567],
    Chennai: [13.0827, 80.2707], Hyderabad: [17.3850, 78.4867],
    Kolkata: [22.5726, 88.3639], Jaipur: [26.9124, 75.7873],
    Ahmedabad: [23.0225, 72.5714], Lucknow: [26.8467, 80.9462],
  };

  const [baseLat, baseLng] = cityCoords[city] || [28.6, 77.2];
  const latitude = baseLat + (Math.random() - 0.5) * 0.1;
  const longitude = baseLng + (Math.random() - 0.5) * 0.1;
  const distance = Math.round((0.2 + Math.random() * 4.8) * 10) / 10;

  const hasWifi = Math.random() > 0.2;
  const hasFood = Math.random() > 0.4;
  const hasLaundry = Math.random() > 0.5;
  const hasParking = Math.random() > 0.6;
  const hasAttachedBath = roomType === "Single" || roomType === "Studio" ? true : Math.random() > 0.4;
  const hasAC = rent > 6000 ? true : Math.random() > 0.5;
  const isFurnished = Math.random() > 0.3;
  const hasPowerBackup = Math.random() > 0.4;
  const hasSecurity = Math.random() > 0.3;
  const hasCCTV = Math.random() > 0.4;
  const isVerified = Math.random() > 0.25;
  const scamRisk = isVerified ? "low" : (Math.random() > 0.5 ? "medium" : riskOptions[Math.floor(Math.random() * 3)]);

  const ownerName = ownerNames[id % ownerNames.length];
  const roomName = `${roomNames[id % roomNames.length]} ${city}`;
  const roomImages_for_type = roomImages[roomType];

  return {
    id: `room-${id}`,
    name: roomName,
    city,
    college,
    rent,
    distance,
    latitude,
    longitude,
    roomType,
    gender,
    wifi: hasWifi,
    food: hasFood,
    laundry: hasLaundry,
    parking: hasParking,
    attachedBathroom: hasAttachedBath,
    ac: hasAC,
    furnished: isFurnished,
    powerBackup: hasPowerBackup,
    security: hasSecurity,
    cctv: hasCCTV,
    rating,
    reviewsCount: Math.floor(5 + Math.random() * 95),
    ownerName,
    ownerPhone: `+91 9${Math.floor(100000000 + Math.random() * 900000000)}`,
    verified: isVerified,
    safetyScore,
    aiMatchScore,
    images: roomImages_for_type,
    description: `${roomName} is a well-maintained ${roomType.toLowerCase()} accommodation located just ${distance}km from ${college}. Ideal for students seeking comfort, safety, and convenience.${hasFood ? " Nutritious meals are provided by the in-house mess." : ""}${hasWifi ? " High-speed WiFi keeps you connected." : ""}${hasSecurity ? " 24/7 security ensures your safety." : ""}`,
    nearbyPlaces: generateNearby(),
    reviews: generateReviews(Math.floor(3 + Math.random() * 5)),
    rentTrend: trendOptions[id % trendOptions.length],
    scamRisk: scamRisk as "low" | "medium" | "high",
    availableFrom: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN"),
    deposit: rent * (1 + Math.floor(Math.random() * 2)),
    electricityIncluded: Math.random() > 0.5,
    waterIncluded: Math.random() > 0.3,
    internetSpeed: hasWifi ? `${[10, 20, 40, 50, 100][Math.floor(Math.random() * 5)]} Mbps` : "Not available",
    floorNumber: Math.floor(Math.random() * 5),
    totalFloors: 5,
    buildingAge: Math.floor(1 + Math.random() * 15),
    petFriendly: Math.random() > 0.7,
    smokingAllowed: Math.random() > 0.8,
    guestAllowed: Math.random() > 0.4,
    lifestyle: lifestyleOptions[id % lifestyleOptions.length],
    highlights: highlights[id % highlights.length],
  };
}

export const rooms: Room[] = Array.from({ length: 600 }, (_, i) => generateRoom(i));

export const allCities = [...new Set(rooms.map((r) => r.city))];
export const allColleges = [...new Set(rooms.map((r) => r.college))];
export const roomTypes = ["Single", "Double", "Triple", "Studio", "PG", "Shared"];
export const genderOptions = ["Male", "Female", "Co-ed"];
