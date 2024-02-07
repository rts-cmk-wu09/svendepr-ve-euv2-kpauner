import React from "react"
import AllClasses from "@/components/classes/all-classes"
import { getClasses } from "@/lib/queries"
import { QueryClient } from "@tanstack/react-query"
import Header from "@/components/header"

export default async function ClassesPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["classes", { limit: 10 }],
    queryFn: getClasses,
  })
  return (
    <>
      <Header title="Popular classes" arrow="stroke-gray-200" burgerstyles="bg-gray-200" />
      <AllClasses />
    </>
  )
}
