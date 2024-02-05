"use client"
import { getClasses } from "@/lib/queries"
import { useQuery } from "@tanstack/react-query"
import React from "react"

export default function AllClasses() {
  const { data: courses } = useQuery({
    queryKey: ["classes", { limit: 10 }],
    queryFn: getClasses,
  })
  console.log("RECORDS", courses)
  return (
    <section>
      <article>
        <h1>{courses[0].className || "no"}</h1>
      </article>
      <h2>Classes for you</h2>
      <div>
        {courses?.map((course) => (
          <div key={course.assetId}>
            <h2>{course.className}</h2>
          </div>
        ))}
      </div>
    </section>
  )
}
