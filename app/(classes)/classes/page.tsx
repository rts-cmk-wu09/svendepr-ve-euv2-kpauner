import React from "react"
import AllClasses from "@/components/classes/all-classes"
import { getClasses } from "@/lib/queries"
import { QueryClient } from "@tanstack/react-query"

export default async function ClassesPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["classes", { limit: 10 }],
    queryFn: getClasses,
  })
  return <AllClasses />
}
