"use client"
import React from "react"
import { Icons } from "../icons"
import { getClassById } from "@/lib/queries"
import { useQuery } from "@tanstack/react-query"
import Bounded from "../global/bounded"
import Ratings from "../global/ratings"
import { Button } from "../ui/button"
import Link from "next/link"

export default function ClassDetails({ id }: { id: string }) {
  const { data: classData, isLoading } = useQuery({
    queryKey: ["class-by-id", { id }],
    queryFn: getClassById,
  })
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Icons.spinner className="block h-8 w-8" />
      </div>
    )
  }
  console.log(classData)
  return (
    <>
      <Bounded className="flex h-[50vh] flex-col justify-end bg-welcome-background bg-[length:1400px] bg-top">
        <h1 className="max-w-xs text-4xl font-bold tracking-wide text-primary">Believe Yourself</h1>
        <div className="flex items-center justify-between pb-10">
          <div className="flex gap-2">
            <Ratings averageRating={3} className="fill-primary" />
          </div>
          <div>
            <Button size="lg" variant="outline" className="w-24 uppercase">
              Rate
            </Button>
          </div>
        </div>
      </Bounded>
      <Bounded className="flex flex-grow flex-col items-center justify-end bg-welcome-center bg-[length:700px] bg-top">
        <Button size="lg" className="mb-8 w-full font-semibold uppercase tracking-wider text-black">
          <Link href="/login">Start training</Link>
        </Button>
      </Bounded>
    </>
  )
}
