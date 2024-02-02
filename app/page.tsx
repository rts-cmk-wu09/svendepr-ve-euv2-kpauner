import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex h-full flex-grow flex-col">
      <div className="flex h-[50vh] flex-col justify-end bg-teal-400 p-10">
        <h1>Believe Yourself</h1>
        <p>train like a pro</p>
      </div>
      <div className="h1 flex h-[50vh] flex-col items-center justify-end">
        <Button
          size="lg"
          className="mb-8 w-44 bg-primary font-semibold uppercase tracking-wider text-black"
        >
          Start training
        </Button>
      </div>
    </main>
  )
}
