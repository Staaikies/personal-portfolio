import { Hono } from "hono"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.email(),
  message: z.string().min(10).max(4000),
})

export const api = new Hono().basePath("/api")

api.get("/health", (c) =>
  c.json({
    ok: true,
    service: "astro-website-demo",
    runtime: "cloudflare-workers",
  })
)

api.get("/profile", (c) =>
  c.json({
    name: "Skylar",
    headline: "Frontend and full-stack developer building modern TypeScript experiences.",
    stack: [
      "Astro",
      "React 19",
      "TypeScript",
      "Cloudflare Workers",
      "pnpm monorepo",
      "Vite",
      "React Router",
      "AI-assisted development",
    ],
  })
)

api.post("/contact", async (c) => {
  const body = await c.req.json().catch(() => null)
  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    return c.json(
      {
        ok: false,
        message: "Please provide a valid name, email, and message.",
        issues: parsed.error.issues,
      },
      400
    )
  }

  return c.json(
    {
      ok: true,
      message: "Thanks — your message was received. I will follow up when this endpoint is connected to mail or storage.",
    },
    202
  )
})
