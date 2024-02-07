import pb from "@/lib/pocketbase"
import React from "react"
import { useForm } from "react-hook-form"
import { Icons } from "../icons"
import { Button } from "../ui/button"
import { z } from "zod"
import { useQuery } from "@tanstack/react-query"
import { getMyClasses } from "@/lib/queries"

type SignupClass = {
  userId: string
  classId: string
  classDay: string
}

export default function SignupClassButton({ classId, userId, classDay }: SignupClass) {
  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  const { data: schedules, isLoading } = useQuery({
    queryKey: ["my_classes", { id: userId }],
    queryFn: getMyClasses,
  })

  const signedUpSchedule = schedules?.find((schedule) => schedule.classId === classId)
  const signedUpClassId = signedUpSchedule ? signedUpSchedule.id : ""

  const findDay = schedules?.some((schedule) => schedule.expand.classId.classDay === classDay)
  console.log("Woot", findDay)
  if (findDay && signedUpSchedule === undefined) {
    return (
      <Button
        size="lg"
        disabled
        className="mb-8 w-full bg-slate-200 uppercase tracking-wider text-black"
      >
        <p>You already booked {classDay}</p>
      </Button>
    )
  }

  async function onSignup() {
    const data = {
      userId: userId,
      classId: classId,
    }
    await pb.collection("user_classes").create(data)
    if (errors) {
      setError("root.serverError", {
        type: "400",
        message: "Something went wrong, please try again",
      })
    }
    window.location.reload()
  }

  async function onLeave() {
    await pb.collection("user_classes").delete(signedUpClassId)
    if (errors) {
      setError("root.serverError", {
        type: "400",
        message: "Something went wrong, please try again",
      })
    }
    window.location.reload()
  }

  return (
    <>
      {signedUpSchedule ? (
        <form onSubmit={handleSubmit(onLeave)} className="space-y-4">
          {errors.root?.message && <p>{errors.root?.message}</p>}
          <Button
            size="lg"
            disabled={isSubmitting}
            className="mb-8 w-full uppercase tracking-wider text-black"
          >
            {isSubmitting ? <Icons.spinner /> : <p>Leave</p>}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSignup)} className="space-y-4">
          {errors.root?.message && <p>{errors.root?.message}</p>}
          <Button
            size="lg"
            disabled={isSubmitting}
            className="mb-8 w-full uppercase tracking-wider text-black"
          >
            {isSubmitting ? <Icons.spinner /> : <p>Sign up</p>}
          </Button>
        </form>
      )}
    </>
  )
}
