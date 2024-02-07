"use client"
import React, { useEffect, useState } from "react"
import pb from "@/lib/pocketbase"
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
  const [initial, setInitial] = useState<Class[]>([])
  const [searchResults, setSearchResults] = useState<Class[]>([])
  const {
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  const { data, isSuccess } = useQuery({
    queryKey: ["all-classes", { limit: 30 }],
    queryFn: getClasses,
  })

  useEffect(() => {
    if (isSuccess) {
      setCourses(data)
      setInitial(data)
      setSearchResults(data)
    }
  }, [data, isSuccess])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      return setInitial(courses)
    }
    const results = courses.filter(
      (course) =>
        course.className.toLowerCase().includes(e.target.value.toLowerCase()) ||
        course.classDescription.toLowerCase().includes(e.target.value.toLowerCase()),
    )
    setInitial([])
    setSearchResults(results)
    console.log("VAL", e.target.value)
  }
  console.log("COURSES", courses, initial)
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
      <section>
        <Bounded>
          {searchResults?.map((course) => <div key={course.id}>{course.className}</div>)}
        </Bounded>
      </section>
      {searchResults.length === 0 ? (
        <SearchInitial courses={courses} />
      ) : (
        searchResults.map((course) => <div key={course.id}>{course.className}</div>)
      )}
    </div>
  )
}
