import { defineMiddleware } from "astro:middleware"

import { api } from "@/server/api"

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = new URL(context.request.url)

  if (pathname === "/api" || pathname.startsWith("/api/")) {
    return api.fetch(context.request)
  }

  return next()
})
