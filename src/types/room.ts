export interface Room {
  id: string;
  name: string;
  city: string;
  college: string;
  rent: number;
  distance: number; // km from college
  latitude: number;
  longitude: number;
  roomType: "Single" | "Double" | "Triple" | "Studio" | "PG" | "Shared";
  gender: "Male" | "Female" | "Co-ed";
  wifi: boolean;
  food: boolean;
  laundry: boolean;
  parking: boolean;
  attachedBathroom: boolean;
  ac: boolean;
  furnished: boolean;
  powerBackup: boolean;
  security: boolean;
  cctv: boolean;
  rating: number;
  reviewsCount: number;
  ownerName: string;
  ownerPhone: string;
  verified: boolean;
  safetyScore: number; // 0-10
  aiMatchScore: number; // 0-100
  images: string[];
  description: string;
  nearbyPlaces: NearbyPlace[];
  reviews: Review[];
  rentTrend: "rising" | "stable" | "falling";
  scamRisk: "low" | "medium" | "high";
  availableFrom: string;
  deposit: number;
  electricityIncluded: boolean;
  waterIncluded: boolean;
  internetSpeed: string;
  floorNumber: number;
  totalFloors: number;
  buildingAge: number;
  petFriendly: boolean;
  smokingAllowed: boolean;
  guestAllowed: boolean;
  lifestyle: string[];
  highlights: string[];
}

export interface NearbyPlace {
  name: string;
  type: "metro" | "bus" | "hospital" | "library" | "cafe" | "gym" | "market" | "pharmacy" | "restaurant" | "park";
  distance: string;
  walkingTime: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  college: string;
}

export interface SearchFilters {
  city: string;
  college: string;
  budgetMin: number;
  budgetMax: number;
  gender: string;
  roomType: string;
  wifi: boolean;
  food: boolean;
  laundry: boolean;
  parking: boolean;
  attachedBathroom: boolean;
  ac: boolean;
  furnished: boolean;
  security: boolean;
  maxDistance: number;
  minRating: number;
  verifiedOnly: boolean;
}

export interface CompareRoom {
  id: string;
  slot: number;
}

export interface AIRecommendation {
  roomId: string;
  category: string;
  reason: string;
  confidence: number;
  pros: string[];
  cons: string[];
}
