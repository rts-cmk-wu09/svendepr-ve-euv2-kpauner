"use server"
import { redirect } from "next/navigation"
import pb from "../pocketbase"

export async function signOut() {
  pb.authStore.clear()
  redirect("/")
}

export async function signIn(username: string, password: string) {
  const result = await pb.collection("users").authWithPassword(username, password)
  redirect("/")
}
