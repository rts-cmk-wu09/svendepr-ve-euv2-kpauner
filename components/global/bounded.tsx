import { cn } from "@/lib/utils"
import React from "react"

type BoundedProps = {
  className?: string
  children: React.ReactNode
}

export default function Bounded({ className, children }: BoundedProps) {
  return <div className={cn("px-4", className)}>{children}</div>
}
