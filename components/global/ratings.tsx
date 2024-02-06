import React from "react"
import { Icons } from "../icons"
import { cn } from "@/lib/utils"

interface RatingsProps {
  averageRating: number
  className?: string
}

export default function Ratings({ averageRating, className }: RatingsProps) {
  return (
    <>
      {[...Array(5)].map((_, i) => {
        return i < averageRating ? (
          <Icons.star key={i} className={cn("h-4", className)} /> // full star
        ) : (
          <Icons.star key={i} className="h-4 opacity-30" /> // empty star
        )
      })}
    </>
  )
}
