import Header from "@/components/header"
import React from "react"

export default function ClassesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header title="Popular classes" />
      {children}
    </main>
  )
}
