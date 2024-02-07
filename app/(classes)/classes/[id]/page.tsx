import ClassDetails from "@/components/classes/class-details"
import Header from "@/components/header"
import { getClassById } from "@/lib/queries"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import React from "react"

export default async function ClassDetailsPage({ params }: { params: { id: string } }) {
  const id = params.id
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["class-by-id", { id }],
    queryFn: getClassById,
  })
  return (
    <>
      <Header arrow="stroke-gray-200" burgerstyles="bg-gray-200" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClassDetails id={id} />
      </HydrationBoundary>
    </>
  )
}
