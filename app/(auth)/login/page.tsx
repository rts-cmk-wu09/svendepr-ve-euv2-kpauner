import React from "react"
import AuthForm from "@/components/auth/auth-form"
import Bounded from "@/components/global/bounded"
import { signOut } from "@/lib/actions/auth-actions"
import { Button } from "@/components/ui/button"

export default function Loginpage() {
  return (
    <div>
      <section className="flex h-[30vh] flex-col justify-end">
        <h1 className="px-10 pb-4 text-6xl font-bold leading-[3.5rem] text-primary">
          Believe Yourself
        </h1>
        <span className="flex items-center gap-3 pb-10">
          <span className="block h-px w-8 bg-black"></span>
          <p className="text-xl font-bold capitalize text-black">train like a pro</p>
        </span>
      </section>
      <Bounded className="pt-8">
        <form>
          <Button formAction={signOut} />
        </form>
        <h2 className="pb-4 font-bold">Log in with your credentials</h2>
        <AuthForm />
      </Bounded>
    </div>
  )
}
