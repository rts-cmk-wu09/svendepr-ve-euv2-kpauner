import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import Header from "@/components/header"
import Providers from "@/lib/providers"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Fitness verden",
  description: "Dit online fitness community",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("relative h-full antialiased", poppins.className)}>
        <main className="relative flex min-h-screen flex-col">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  )
}
