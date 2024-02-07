import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Rating } from "@/types/ratings"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateRating(ratings: Rating[]) {
  if (ratings.length === 0) {
    return 0
  }
  let averageRating = 0
  return (averageRating = Math.round(
    ratings.reduce((sum, rating) => sum + (rating.rating || 0), 0) / ratings.length,
  ))
}
