import ClassDetails from "@/components/classes/class-details"
import Header from "@/components/header"
import React from "react"

export default function ClassDetailsPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Header arrow="stroke-gray-200" burgerstyles="bg-gray-200" />
      <ClassDetails id={params.id} />
    </>
  )
}
