import { ReactNode } from "react"

import { SiteHeader } from "@/components/site-header"
import Background from "@/components/background/background"

export default async function marketingLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main>
      <header className="max-w-8xl sticky mb-16 w-full top-0 z-50 bg-white/60 backdrop-blur-sm  dark:bg-slate-950/80 py-4 border-b dark:border-slate-800 border-slate-300">
        <SiteHeader />
      </header>
      <div className=" px-4 md:px-16">{children}</div>
    </main>
  )
}
