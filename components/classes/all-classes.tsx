"use client"
import React from "react"
import { getClasses } from "@/lib/queries"
import { useQuery } from "@tanstack/react-query"
import CardSmall from "./card-small"
import Bounded from "../global/bounded"
import CardFeatured from "../global/card-featured"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"
import { Icons } from "../icons"

export default function AllClasses() {
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classes", { limit: 10 }],
    queryFn: getClasses,
  })

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Icons.spinner className="block h-8 w-8" />
      </div>
    )
  }
  if (error) return "An error has occurred: " + error.message

  return (
    <section>
      <Bounded>
        {courses
          ?.filter((course) => course.isFeatured)
          .map((course) => (
            <CardFeatured
              key={course.assetId}
              title={course.className}
              image={course.assetId}
              collectionId={course.collectionId}
              id={course.id}
            />
          ))}
      </Bounded>
      <section className="pt-4">
        <h2 className="py-4 pl-4 text-xl font-bold">Classes for you</h2>

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
    </section>
  )
}
