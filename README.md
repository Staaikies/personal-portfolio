# Astro Website Demo

Astro portfolio/marketing site built as static HTML and deployed with GitHub Pages.

## Stack

- pnpm workspace
- Astro 5 (static output)
- React 19 islands
- Tailwind CSS v4
- shadcn/ui Base + Nova

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

## GitHub Pages

1. **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions** (not “Deploy from a branch”).
2. Push to **`main`** or **`master`**, or run **Actions → Deploy GitHub Pages**. The workflow builds `apps/web` and publishes **`apps/web/dist`**.

In CI, Astro gets **`site`** and **`base`** from `GITHUB_REPOSITORY_OWNER` and `GITHUB_REPOSITORY` (repo slug is lowercased for `base`). **`PUBLIC_SITE_URL`** and **`PUBLIC_BASE_PATH`** are optional Actions **Variables** if your public URL does not match that default (for example a custom domain or a path that is not the repo name).

**Static files** (favicon, profile photo) live in **`apps/web/public/`** and are referenced as **`import.meta.env.BASE_URL` + filename** in pages—no bundling step for those.

If your default branch is not `main` or `master`, update `on.push.branches` in `.github/workflows/deploy-github-pages.yml`.

### If the failing run is named “pages build and deployment”

That is Jekyll on a branch-based Pages source, not this Astro workflow. Switch Pages **Source** to **GitHub Actions**.

This repo includes a root **`.nojekyll`** so branch-based publishing does not run Jekyll on the repo by mistake. The live site content is always the Actions artifact from **`apps/web/dist`**.
