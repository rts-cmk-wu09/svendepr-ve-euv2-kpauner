"use client"
import { cn } from "@/lib/utils"
import Image from "next/image"
import React from "react"
import { Icons } from "../icons"

interface CardSmallProps {
  title: string
  className?: string
  rating: number
  image: string
  collectionId: string
  id: string
}

export default function CardSmall({
  title,
  className,
  image,
  rating,
  collectionId,
  id,
}: CardSmallProps) {
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
          {[...Array(rating)].map((_, i) => (
            <Icons.star key={i} className="h-4" />
          ))}
        </div>
      </header>
    </article>
  )
}
