"use client"
import { getClasses } from "@/lib/queries"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import CardSmall from "./card-small"
import Bounded from "../global/bounded"
import CardFeatured from "../global/card-featured"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"

export default function AllClasses() {
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classes", { limit: 10 }],
    queryFn: getClasses,
  })
  if (isLoading) return "Loading..."
  if (error) return "An error has occurred: " + error.message
  console.log("RECORDS", courses)
  return (
    <section>
      <Bounded>
        {courses
          ?.filter((course) => course.isFeatured)
          .map((course) => (
            <CardFeatured
              key={course.assetId}
              title={course.className}
              rating={5}
              image={course.assetId}
              collectionId={course.collectionId}
              id={course.id}
            />
          ))}
      </Bounded>
      <Bounded className="pt-10">
        <h2 className="font-bold">Classes for you</h2>
        <div>
          <Carousel>
            <CarouselContent>
              {courses
                ?.filter((course) => !course.isFeatured)
                .map((course) => (
                  <CarouselItem
                    key={course.assetId}
                    className="aspect-square basis-1/2 overflow-hidden bg-amber-500"
                  >
                    <CardSmall
                      title={course.className}
                      rating={5}
                      image={course.assetId}
                      collectionId={course.collectionId}
                      id={course.id}
                    />
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </div>
      </Bounded>
    </section>
  )
}
