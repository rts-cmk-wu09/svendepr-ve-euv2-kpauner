"use client"
import React, { useEffect, useState } from "react"
import { getClasses } from "@/lib/queries"
import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import Bounded from "@/components/global/bounded"
import { Class } from "@/types/classes"
import SearchInitial from "@/components/search/search-initial"

export default function SearchPage() {
  const [courses, setCourses] = useState<Class[]>([])
  const [searchResults, setSearchResults] = useState<Class[]>([])
  const {
    register,
    setError,
    formState: { errors },
  } = useForm()

  const { data, isSuccess } = useQuery({
    queryKey: ["all-classes", { limit: 30 }],
    queryFn: getClasses,
  })

  useEffect(() => {
    if (isSuccess) {
      setCourses(data)
      setSearchResults([])
    }
  }, [data, isSuccess])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      return setSearchResults([])
    } else {
      const results = courses.filter(
        (course) =>
          course.className.toLowerCase().includes(e.target.value.toLowerCase()) ||
          course.classDescription.toLowerCase().includes(e.target.value.toLowerCase()),
      )
      if (results.length === 0) {
        setError("query", {
          type: "manual",
          message: "No results found",
        })
      }
      setSearchResults(results)
    }

    console.log("VAL", e.target.value)
  }
  console.log("COURSES", courses)
  return (
    <div>
      <Header title="Search" />
      <section>
        <Bounded>
          <form className="space-y-4">
            <Input
              {...register("query")}
              onChange={(e) => {
                handleSearchChange(e)
              }}
              placeholder="Search classes"
            />
            {errors.query?.message && <p>{errors.query?.message}</p>}
          </form>
        </Bounded>
      </section>

      {searchResults.length === 0 ? (
        <SearchInitial courses={courses} />
      ) : (
        searchResults.map((course) => (
          <div key={course.id} className="bg-gray-400 p-2">
            {course.className}
          </div>
        ))
      )}
    </div>
  )
}
