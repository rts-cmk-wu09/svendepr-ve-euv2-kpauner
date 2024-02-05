import React from "react"
import { Icons } from "../icons"

export default function Ratings({ averageRating }: { averageRating: number }) {
  return (
    <>
      {[...Array(5)].map((_, i) => {
        return i < averageRating ? (
          <Icons.star key={i} className="h-4" /> // full star
        ) : (
          <Icons.star key={i} className="h-4 opacity-30" /> // empty star
        )
      })}
    </>
  )
}
