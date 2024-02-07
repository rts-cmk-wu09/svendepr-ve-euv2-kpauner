"use client"
import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import pb from "@/lib/pocketbase"
import { Icons } from "../icons"
import { AuthSchema, AuthSchemaType } from "@/types/auth"

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
  })

  async function onSubmit(values: AuthSchemaType) {
    await pb.collection("users").authWithPassword(values.username, values.password)
    if (errors.username || errors.password) {
      setError("username", { message: "Invalid username or password" })
      setError("password", { message: "Invalid username or password" })
    }
    window.location.reload()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register("username")} placeholder="Enter your username..." />
      {errors.username?.message && <p>{errors.username?.message}</p>}
      <Input type="password" {...register("password")} placeholder="Enter your password..." />
      {errors.password?.message && <p>{errors.password?.message}</p>}
      <Button
        size="lg"
        disabled={isSubmitting}
        className="mb-8 w-full uppercase tracking-wider text-black"
      >
        {isSubmitting ? <Icons.spinner /> : "Log in"}
      </Button>
    </form>
  )
}
