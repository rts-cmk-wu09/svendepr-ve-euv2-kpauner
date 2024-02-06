"use client"
import React, { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import pb from "@/lib/pocketbase"
import { Icons } from "../icons"
import { usePathname, useRouter } from "next/navigation"

const AuthSchema = z.object({
  username: z.string().min(1, { message: "Username required" }),
  password: z.string().min(5, { message: "Password has to be atleast 5 characters" }),
})

type AuthSchemaType = z.infer<typeof AuthSchema>

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
    console.log(values)
    const authData = await pb.collection("users").authWithPassword(values.username, values.password)

    console.log(authData)
  }

  const router = useRouter()
  const authStatus = pb.authStore.isValid
  useEffect(() => {
    if (authStatus) {
      router.push("/classes")
    }
  }, [authStatus, router])

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
