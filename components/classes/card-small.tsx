"use client"
import React from "react"
import { calculateRating, cn } from "@/lib/utils"
import Image from "next/image"
import Ratings from "../global/ratings"
import { useQuery } from "@tanstack/react-query"
import { getRatingById } from "@/lib/queries"

interface CardSmallProps {
  title: string
  className?: string
  image: string
  collectionId: string
  id: string
}

export default function CardSmall({ title, className, image, collectionId, id }: CardSmallProps) {
  const { data: ratings } = useQuery({
    queryKey: ["ratings", { id }],
    queryFn: getRatingById,
  })

  let averageRating = 0
  if (ratings) {
    averageRating = calculateRating(ratings)
  }
  return (
    <article className={cn("relative h-full w-full overflow-hidden rounded-2xl", className)}>
      <Image
        height={500}
        width={500}
        src={`${process.env.NEXT_PUBLIC_PB_URL}/api/files/${collectionId}/${id}/${image}`}
        alt={image}
        className="h-full w-full object-cover"
      />
      <header className="absolute bottom-0 w-full space-y-1 rounded-tr-3xl bg-primary p-2">
        <h2 className="text-clip text-nowrap text-xs font-bold">{title}</h2>
        <div className="flex gap-1">
          <Ratings averageRating={averageRating} />
        </div>
      </header>
    </article>
  )
}
