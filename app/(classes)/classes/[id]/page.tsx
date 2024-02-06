import ClassDetails from "@/components/classes/class-details"
import React from "react"

export default function ClassDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="absolute flex h-full w-full flex-grow flex-col">
      <ClassDetails id={params.id} />
    </div>
  )
}
