"use client"
import { cn } from "@/lib/utils"
import Image from "next/image"
import React from "react"
import { Icons } from "../icons"

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
      <header className="absolute bottom-0 w-2/3 space-y-1 rounded-tr-[3rem] bg-primary p-4">
        <h2 className="text-clip text-nowrap font-bold">{title}</h2>
        <div className="flex gap-1">
          {[...Array(rating)].map((_, i) => (
            <Icons.star key={i} className="h-4" />
          ))}
        </div>
      </header>
    </article>
  )
}
