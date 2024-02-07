"use client"
import React from "react"
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

export default function ClassDetails({ id }: { id: string }) {
  const { data } = useQuery({
    queryKey: ["class-by-id", { id }],
    queryFn: getClassById,
  })

  const { data: ratings, isLoading } = useQuery({
    queryKey: ["ratings", { id }],
    queryFn: getRatingById,
  })

  if (isLoading || !data) {
    return (
      <div className="flex h-full items-center justify-center">
        <Icons.spinner className="block h-8 w-8" />
      </div>
    )
  }

  const classdetails = data[0]

  let averageRating = 0
  if (ratings) {
    averageRating = calculateRating(ratings)
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
                <Button size="lg" variant="outline" className="w-24 uppercase">
                  Rate
                </Button>
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
