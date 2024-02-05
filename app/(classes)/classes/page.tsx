import AllClasses from "@/components/classes/all-classes"
import { getClasses } from "@/lib/queries"
import { QueryClient } from "@tanstack/react-query"
import React from "react"

export default async function ClassesPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["classes", { limit: 10 }],
    queryFn: getClasses,
  })
  return (
    <div>
      <h1>Classes</h1>
      <AllClasses />
    </div>
  )
}
