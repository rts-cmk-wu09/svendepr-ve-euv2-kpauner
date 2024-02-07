"use server"
import { redirect } from "next/navigation"
import pb from "../pocketbase"
import { AuthSchema, AuthSchemaType } from "@/types/auth"

export async function signOut() {
  pb.authStore.clear()
  redirect("/")
}

export async function SigninAction(data: AuthSchemaType) {
  const result = AuthSchema.safeParse(data)
  if (result.success) {
    await pb.collection("users").authWithPassword(data.username, data.password)
    redirect("/")
  }
  return null
}
