"use client"
import { cn } from "@/lib/utils"
import Image from "next/image"
import React from "react"
import { Icons } from "../icons"
import { useQuery } from "@tanstack/react-query"
import { getRatingById } from "@/lib/queries"
import { calculateRating } from "@/lib/utils"
import Ratings from "./ratings"
import Link from "next/link"

interface CardFeaturedProps {
  title: string
  className?: string
  image: string
  collectionId: string
  id: string
}

export default function CardFeatured({
  title,
  className,
  image,
  collectionId,
  id,
}: CardFeaturedProps) {
  const { data: ratings } = useQuery({
    queryKey: ["ratings", { id }],
    queryFn: getRatingById,
  })
  console.log("RATING", ratings, id)

  let averageRating = 0
  if (ratings) {
    averageRating = calculateRating(ratings)
  }

  console.log("ave", averageRating)
  return (
    <Link href={`/classes/${id}`}>
      <article className={cn("relative h-[30rem] overflow-hidden rounded-2xl", className)}>
        <Image
          fill
          src={`${process.env.NEXT_PUBLIC_PB_URL}/api/files/${collectionId}/${id}/${image}`}
          alt={image}
          className="h-full w-full object-cover"
          priority
        />
        <header className="absolute bottom-0 w-2/3 space-y-1 rounded-tr-[3rem] bg-primary p-4">
          <h2 className="text-clip text-nowrap font-bold">{title}</h2>
          <div className="flex gap-1">
            <Ratings averageRating={averageRating} />
          </div>
        </header>
      </article>
    </Link>
  )
}
