import React from "react"
import MyClasses from "@/components/myclasses/my-classes"
import Header from "@/components/header"

export default function UserSchedulePage({ params }: { params: { userid: string } }) {
  return (
    <>
      <Header title="My Schedule" />
      <MyClasses id={params.userid} />
    </>
  )
}
