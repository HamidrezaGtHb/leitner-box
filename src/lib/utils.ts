import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date utilities
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function isToday(timestamp: number): boolean {
  const today = new Date();
  const date = new Date(timestamp);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

// Gender color mapping
export function getGenderColor(article?: 'der' | 'die' | 'das'): string {
  switch (article) {
    case 'der':
      return 'text-blue-600 dark:text-blue-400';
    case 'die':
      return 'text-red-600 dark:text-red-400';
    case 'das':
      return 'text-green-600 dark:text-green-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
