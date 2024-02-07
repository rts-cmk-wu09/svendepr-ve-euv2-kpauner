"use client"
import React, { useEffect } from "react"
import { getClassById, getRatingById } from "@/lib/queries"
import pb from "@/lib/pocketbase"
import { calculateRating } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import Bounded from "../global/bounded"
import Ratings from "../global/ratings"
import { Button } from "../ui/button"
import { Icons } from "../icons"
import Image from "next/image"
import SignupClassButton from "./signup-class-button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Rating } from "@/types/ratings"
import { useForm } from "react-hook-form"

export default function ClassDetails({ id }: { id: string }) {
  const [averageRating, setAverageRating] = React.useState(0)
  const [sliderValue, setSliderValue] = React.useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const { data } = useQuery({
    queryKey: ["class-by-id", { id }],
    queryFn: getClassById,
  })

  const { data: ratings, isLoading } = useQuery({
    queryKey: ["ratings", { id }],
    queryFn: getRatingById,
  })

  useEffect(() => {
    const calculatedRating = calculateRating(ratings as Rating[])
    setAverageRating(calculatedRating)
  }, [ratings])

  if (isLoading || !data || !ratings) {
    return (
      <div className="flex h-full items-center justify-center">
        <Icons.spinner className="block h-8 w-8" />
      </div>
    )
  }

  const classdetails = data[0]

  const handleSliderChange = (event: any) => {
    setAverageRating(event.target.value)
    setSliderValue(event.target.value)
  }
  const userId = pb.authStore.model?.id
  const userRating = ratings.find((rating) => rating.userId === userId)
  console.log("DATA", userRating?.id, classdetails.id, userId, averageRating)

  async function onSubmit() {
    try {
      if (!userRating) {
        const data = {
          classId: classdetails.id,
          userId: userId,
          rating: sliderValue as number,
        }
        await pb.collection("ratings").create(data)
      } else {
        const data = {
          classId: classdetails.id,
          userId: userId,
          rating: sliderValue as number,
        }
        const results = await pb.collection("ratings").update(userRating.id, data)

        return console.log("RESULTS", results)
      }
    } catch (error) {
      console.error("Error updating rating", error)
    }
    // window.location.reload()
  }

  return (
    <>
      <div className="absolute flex h-full w-full flex-grow flex-col">
        <section
          className="flex h-[50vh] flex-col justify-end bg-cover bg-center"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_PB_URL}/api/files/${classdetails.collectionId}/${classdetails.id}/${classdetails.assetId})`,
          }}
        >
          <div className="bg-gradient-to-t from-black/60 to-transparent px-4">
            <h1 className="max-w-xs pb-8 text-4xl font-bold tracking-wide text-primary">
              {classdetails.className}
            </h1>
            <div className="flex items-center justify-between pb-10">
              <div className="flex gap-2">
                <Ratings averageRating={averageRating} className="fill-primary" />
              </div>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="outline" className="w-24 uppercase">
                      Rate
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-sm space-y-4 rounded-xl py-8">
                    <DialogHeader>
                      <DialogTitle className="text-sm">
                        Rate the {classdetails.className} class
                      </DialogTitle>

                      <div className="flex flex-col items-center justify-center space-y-2 pt-4">
                        <div className="flex items-center justify-center">
                          <Ratings averageRating={averageRating} className="fill-primary" />
                        </div>
                        <div>your rating {averageRating}/5</div>
                      </div>
                    </DialogHeader>
                    <div>
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <input
                          {...register("averageRating")}
                          type="range"
                          min="0"
                          max="5"
                          value={averageRating}
                          onChange={handleSliderChange}
                          className="slider w-full bg-amber-500"
                        />
                        <DialogFooter>
                          <Button className="uppercase" type="submit">
                            {isSubmitting ? <Icons.spinner /> : "Submit"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>
        <Bounded className="flex flex-grow flex-col justify-between py-6">
          <section>
            <div className="flex gap-2 pb-4 font-semibold">
              <span>{classdetails.classDay}</span>-<span>{classdetails.classTime}</span>
            </div>
            <p>{classdetails.classDescription}</p>
          </section>
          <section>
            <h2 className="pb-4 text-xl font-bold">Trainer</h2>
            <div className="relative flex">
              <Image
                height={150}
                width={150}
                src={`${process.env.NEXT_PUBLIC_PB_URL}/api/files/${classdetails.expand.trainerId.collectionId}/${classdetails.expand.trainerId.id}/${classdetails.expand.trainerId.avatar}`}
                alt={classdetails.expand.trainerId.name}
                className="aspect-square h-32 w-32 rounded-xl object-cover"
              />
              <h3 className="pl-6 pt-6 font-bold">{classdetails.expand.trainerId.name}</h3>
            </div>
          </section>

          {pb.authStore.isValid && pb.authStore.model !== null ? (
            <SignupClassButton
              classId={classdetails.id}
              userId={pb.authStore.model.id}
              classDay={classdetails.classDay}
            />
          ) : null}
        </Bounded>
      </div>
    </>
  )
}
