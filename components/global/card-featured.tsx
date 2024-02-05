"use client"
import { cn } from "@/lib/utils"
import Image from "next/image"
import React from "react"

interface CardFeaturedProps {
  title: string
  className?: string
  rating: number
  image: string
  collectionId: string
  id: string
}

export default function CardFeatured({
  title,
  className,
  image,
  rating,
  collectionId,
  id,
}: CardFeaturedProps) {
  return (
    <article className={cn("relative h-[30rem] overflow-hidden rounded-2xl", className)}>
      <Image
        fill
        src={`${process.env.NEXT_PUBLIC_PB_URL}/api/files/${collectionId}/${id}/${image}`}
        alt={image}
        className="h-full w-full object-cover"
        priority
      />
      <header className="absolute bottom-0 bg-primary p-2">
        <h2 className="font-bold">{title}</h2>
        {rating && <p>{rating}</p>}
      </header>
    </article>
  )
}
