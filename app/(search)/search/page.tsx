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
    clearErrors,
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
      setSearchResults([])
      clearErrors("query")
    } else {
      clearErrors("query")
      const results = courses.filter(
        (course) =>
          course.className.toLowerCase().includes(e.target.value.toLowerCase()) ||
          course.classDescription.toLowerCase().includes(e.target.value.toLowerCase()),
      )
      if (results.length === 0) {
        setError("query", {
          type: "manual",
          message: "Your search did not return any results. Try to search for something else.",
        })
      }
      setSearchResults(results)
    }
  }

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
            {errors.query && <p>{errors.query.message as string}</p>}
          </form>
        </Bounded>
      </section>

      {searchResults.length === 0 ? (
        <SearchInitial courses={courses} />
      ) : (
        <Bounded className="flex flex-col gap-4 pt-8">
          {searchResults.map((course) => (
            <div
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_PB_URL}/api/files/${course.collectionId}/${course.id}/${course.assetId})`,
              }}
              key={course.id}
              className="h-12 overflow-hidden rounded-lg bg-secondary/10 bg-cover bg-center"
            >
              <span className="flex h-full max-w-fit items-center rounded-tr-xl bg-primary px-6 font-bold">
                {course.className}
              </span>
            </div>
          ))}
        </Bounded>
      )}
    </div>
  )
}
