import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex h-full flex-grow flex-col">
      <section className="flex h-[52vh] flex-col justify-end bg-welcome-background bg-[length:1400px] bg-top">
        <h1 className="px-10 pb-4 text-6xl font-bold leading-[3.5rem] text-primary">
          Believe Yourself
        </h1>
        <span className="flex items-center gap-3 pb-10">
          <span className="block h-px w-8 bg-white"></span>
          <p className="text-xl font-bold capitalize text-white">train like a pro</p>
        </span>
      </section>
      <div className="flex h-[48vh] flex-col items-center justify-end bg-welcome-center bg-[length:700px] bg-top">
        <Button size="lg" className="mb-8 w-44 font-semibold uppercase tracking-wider text-black">
          <Link href="/login">Start training</Link>
        </Button>
      </div>
    </div>
  )
}
