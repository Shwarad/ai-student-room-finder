import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRent(rent: number): string {
  return `₹${rent.toLocaleString("en-IN")}`;
}

export function formatDistance(distance: number): string {
  if (distance < 1) return `${Math.round(distance * 1000)}m`;
  return `${distance.toFixed(1)}km`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function getMatchColor(score: number): string {
  if (score >= 80) return "text-green-600 dark:text-green-400";
  if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

export function getSafetyColor(score: number): string {
  if (score >= 8) return "text-green-600 dark:text-green-400";
  if (score >= 6) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

export function getRiskColor(risk: string): string {
  switch (risk) {
    case "low": return "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400";
    case "medium": return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-400";
    case "high": return "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400";
    default: return "";
  }
}

export function debounce<T extends (...args: unknown[]) => unknown>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}
