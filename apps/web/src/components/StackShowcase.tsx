import { useState } from "react"

import { Button } from "@/components/ui/button"

const groups = {
  Frontend: ["React 19", "React Router", "Vite", "Astro", "shadcn/ui", "Tailwind CSS v4"],
  Platform: ["Cloudflare Workers", "Hono", "TypeScript", "pnpm monorepo"],
  Workflow: ["AI-assisted development", "Design systems", "Performance", "DX automation"],
} as const

type Group = keyof typeof groups

export function StackShowcase() {
  const [active, setActive] = useState<Group>("Frontend")

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-cyan-950/20 backdrop-blur">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(groups) as Group[]).map((group) => (
          <Button
            key={group}
            type="button"
            variant={active === group ? "default" : "outline"}
            size="sm"
            onClick={() => setActive(group)}
            className={active === group ? "bg-cyan-300 text-slate-950 hover:bg-cyan-200" : "border-white/10 bg-white/5 text-white hover:bg-white/10"}
          >
            {group}
          </Button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {groups[active].map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
