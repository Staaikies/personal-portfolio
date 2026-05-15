import { useState } from "react"

import { Button } from "@/components/ui/button"

const groups = {
  Frontend: ["React 19", "React Router", "Vite", "Astro"],
  Platform: ["Edge & static hosting", "TypeScript", "Edge deployment", "pnpm monorepo"],
  Workflow: ["AI-assisted development", "Design systems", "Performance", "DX automation"],
} as const

type Group = keyof typeof groups

export function StackShowcase() {
  const [active, setActive] = useState<Group>("Frontend")

  return (
    <div className="rounded-3xl border border-orange-100/90 bg-white/85 p-4 shadow-[0_18px_48px_-14px_rgba(251,146,60,0.14),0_8px_24px_-10px_rgba(167,139,250,0.07)] backdrop-blur-md">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(groups) as Group[]).map((group) => (
          <Button
            key={group}
            type="button"
            variant={active === group ? "default" : "outline"}
            size="sm"
            onClick={() => setActive(group)}
            className={
              active === group
                ? "border-transparent bg-gradient-to-br from-orange-600 via-orange-600 to-orange-700 text-white shadow-md shadow-orange-900/25 hover:from-orange-700 hover:via-orange-700 hover:to-orange-800 hover:shadow-orange-900/35"
                : "border-stone-200/90 bg-stone-50/90 text-stone-700 hover:border-orange-200/70 hover:bg-orange-50/70"
            }
          >
            {group}
          </Button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {groups[active].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-stone-200/70 bg-gradient-to-br from-white via-orange-50/30 to-violet-50/25 px-4 py-3 text-sm text-stone-700 shadow-sm shadow-orange-100/40"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
