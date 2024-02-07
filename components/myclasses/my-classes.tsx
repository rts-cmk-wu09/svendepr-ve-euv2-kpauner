"use client"
import { getMyClasses } from "@/lib/queries"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { Icons } from "../icons"
import Link from "next/link"
import Bounded from "../global/bounded"

export default function MyClasses({ id }: { id: string }) {
  const { data: schedules, isLoading } = useQuery({
    queryKey: ["my_classes", { id }],
    queryFn: getMyClasses,
  })
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Icons.spinner className="block h-8 w-8" />
      </div>
    )
  }

  return (
    <Bounded className="flex flex-col gap-4">
      {schedules &&
        schedules.map((schedule, i) => (
          <Link
            href={`/classes/${schedule.classId}`}
            className="rounded-xl border-2 border-gray-200 bg-gray-100 px-6 py-4"
            key={i}
          >
            <h2 className="pb-6 text-xl font-bold">{schedule.expand.classId.className}</h2>
            <div className="flex gap-2">
              <span>{schedule.expand.classId.classDay}</span>-
              <span>{schedule.expand.classId.classTime}</span>
            </div>
          </Link>
        ))}
    </Bounded>
  )
}
