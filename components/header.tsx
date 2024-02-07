"use client"
import React, { useEffect, useState } from "react"
import { motion, useCycle } from "framer-motion"
import Link from "next/link"
import { nav } from "@/config/navigation"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import pb from "@/lib/pocketbase"
import { cn } from "@/lib/utils"
import AuthForm from "./auth/auth-form"
import Bounded from "./global/bounded"

const menuSlide = {
  initial: {
    x: "100%",
  },
  enter: {
    x: "0%",
    transition: {
      duration: 0.8,
      ease: [0.75, 0, 0.25, 1],
      staggerChildren: 0.2,
      staggerDelay: 0.8,
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.8,
      ease: [0.75, 0, 0.25, 1],
      staggerChildren: 0.1,
    },
  },
}

const items = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 80,
  },
  exit: {
    opacity: 0,
  },
}

type HeaderProps = {
  title?: string
  arrow?: string
  burgerstyles?: string
}

export default function Header({ title, arrow, burgerstyles }: HeaderProps) {
  const [href, setHref] = useState("")
  const [auth, setAuth] = useState(false)
  const [toggleNav, setToggleNav] = useCycle(false, true)
  const pathName = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (pb.authStore.model) {
      setHref(pb.authStore.model.id)
      setAuth(pb.authStore.isValid)
    }
  }, [])

  return (
    <header className="z-10 px-4 pb-8 pt-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {pathName !== "/classes" && (
            <Link href="/classes">
              <ArrowLeft className={cn("stroke-secondary", arrow)} />
            </Link>
          )}
          {title && <h1 className="text-2xl tracking-tight text-black">{title}</h1>}
        </div>
        <nav className="relative z-40 flex">
          <motion.button
            animate={toggleNav ? "open" : "closed"}
            onClick={() => setToggleNav()}
            className="ml-auto flex cursor-pointer flex-col items-end gap-1"
          >
            <motion.span
              animate={{ rotate: toggleNav ? 45 : 0, y: toggleNav ? 12 : 0, x: toggleNav ? 2 : 0 }}
              className={cn("block h-1 w-6 rounded-full bg-secondary", burgerstyles)}
            />
            <motion.span
              animate={{ opacity: toggleNav ? 0 : 1 }}
              className={cn("block h-1 w-6 rounded-full bg-secondary", burgerstyles)}
            />
            <motion.span
              animate={{
                rotate: toggleNav ? -45 : 0,
                y: toggleNav ? -12 : 0,
                x: toggleNav ? -2 : 0,
                scaleX: toggleNav ? 1 : 0.5,
              }}
              className={cn("block h-1 w-6 rounded-full bg-secondary", burgerstyles)}
              style={{ transformOrigin: "right" }}
            ></motion.span>
          </motion.button>
        </nav>
      </div>
      <motion.aside
        initial="initial"
        animate={toggleNav ? "enter" : "exit"}
        variants={menuSlide}
        className="fixed right-0 top-0 z-30 flex h-screen w-full flex-col justify-between bg-white"
      >
        {auth ? (
          <div className="container flex flex-grow flex-col justify-center space-y-8 ">
            {nav.map(({ name, path }, i) => (
              <motion.span variants={items} key={i}>
                <Link
                  href={path}
                  onClick={() => setToggleNav()}
                  className="duration-600 block text-center text-3xl uppercase tracking-tight text-black transition-colors hover:text-neutral-500 md:text-5xl"
                >
                  {name}
                </Link>
              </motion.span>
            ))}
            <motion.span variants={items}>
              <Link
                href={`${origin}/${href}`}
                onClick={() => setToggleNav()}
                className="duration-600 block text-center text-3xl uppercase tracking-tight text-black transition-colors hover:text-neutral-500 md:text-5xl"
              >
                My schedule
              </Link>
            </motion.span>
            <Button
              onClick={async () => {
                pb.authStore.clear()
                router.replace("/")
              }}
              type="submit"
              variant="link"
              className="duration-600 block text-center text-3xl font-normal uppercase tracking-tight text-black transition-colors hover:text-neutral-500 md:text-5xl"
            >
              Signout
            </Button>
          </div>
        ) : (
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
              <h2 className="pb-4 font-bold">Log in with your credentials</h2>
              <AuthForm />
            </Bounded>
          </div>
        )}
      </motion.aside>
    </header>
  )
}
