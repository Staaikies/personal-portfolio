# Astro Website Demo

Astro portfolio/marketing site built as static HTML and deployed with GitHub Pages.

## Stack

- pnpm workspace
- Astro 5 (static output)
- Tailwind CSS v4

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

Astro is configured for the live URL **`https://skylardryden.com/personal-portfolio/`**.

The build is intentionally simple: CSS is inlined into `index.html`, the stack section is static Astro, and the only external files are **`favicon.svg`** and **`skylardryden.jpg`** copied from **`apps/web/public/`**.

If your default branch is not `main` or `master`, update `on.push.branches` in `.github/workflows/deploy-github-pages.yml`.

### If the failing run is named “pages build and deployment”

That is Jekyll on a branch-based Pages source, not this Astro workflow. Switch Pages **Source** to **GitHub Actions**.

This repo includes a root **`.nojekyll`** so branch-based publishing does not run Jekyll on the repo by mistake. The live site content is always the Actions artifact from **`apps/web/dist`**.
