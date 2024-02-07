"use client"
import React from "react"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"
import CardSmall from "../classes/card-small"
import { useQuery } from "@tanstack/react-query"
import { getTrainers } from "@/lib/queries"
import Bounded from "../global/bounded"
import Image from "next/image"

export default function SearchInitial({ courses }: { courses: any[] }) {
  const { data: trainers, isSuccess } = useQuery({
    queryKey: ["all-trainers", { role: "trainer" }],
    queryFn: getTrainers,
  })
  return (
    <>
      <section className="pt-4">
        <h2 className="py-4 pl-4 text-xl font-bold">Popular classes</h2>

        <Carousel
          className="pl-4"
          opts={{
            align: "start",
          }}
        >
          <CarouselContent>
            {courses
              ?.filter((course) => !course.isFeatured)
              .map((course) => (
                <CarouselItem
                  key={course.assetId}
                  className="aspect-square basis-[40%] overflow-hidden"
                >
                  <CardSmall
                    title={course.className}
                    image={course.assetId}
                    collectionId={course.collectionId}
                    id={course.id}
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </section>
      <section className="pb-6">
        <h2 className="pl-4 pt-10 text-xl font-bold">Popular Trainers</h2>
        <Bounded className="flex flex-col gap-4 pt-4">
          {trainers?.map((trainer) => (
            <div key={trainer.id}>
              <div className="relative flex">
                <Image
                  height={150}
                  width={150}
                  src={`${process.env.NEXT_PUBLIC_PB_URL}/api/files/${trainer.collectionId}/${trainer.id}/${trainer.avatar}`}
                  alt={trainer.name}
                  className="aspect-square h-32 w-32 rounded-xl object-cover"
                />
                <h3 className="pl-6 pt-6 font-bold">{trainer.name}</h3>
              </div>
            </div>
          ))}
        </Bounded>
      </section>
    </>
  )
}
