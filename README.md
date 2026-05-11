# Astro Website Demo

Astro portfolio/marketing site deployed to Cloudflare Workers.

## Stack

- pnpm workspace
- Astro 6
- React 19 islands
- Tailwind CSS v4
- shadcn/ui Base + Nova
- Hono API under `/api/*`
- Cloudflare Workers via `@astrojs/cloudflare`

## Local Development

```sh
pnpm install
pnpm dev
```

The site runs at `http://localhost:4321/`.

Useful checks:

```sh
pnpm check
pnpm build
pnpm preview
```

## Cloudflare Git Deploy

This repository is a pnpm monorepo. Wrangler must deploy from `apps/web`, not from the workspace root, otherwise Wrangler will throw:

```txt
The Wrangler application detection logic has been run in the root of a workspace instead of targeting a specific project.
```

Use these settings in Cloudflare:

- **Root directory:** repository root
- **Install command:** `pnpm install --frozen-lockfile`
- **Build command:** `pnpm build`
- **Deploy command:** `pnpm deploy:wrangler`
- **Node version:** `22.12.0` or newer

If Cloudflare only gives you one command field, use:

```sh
pnpm install --frozen-lockfile && pnpm deploy
```

If you need the `npx` form, use:

```sh
pnpm install --frozen-lockfile && pnpm build && npx --yes wrangler@4.90.0 deploy --cwd apps/web
```

The important part is `--cwd apps/web`, which scopes Wrangler to the Astro Worker app.
