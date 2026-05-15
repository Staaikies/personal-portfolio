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

1. In the repository, go to **Settings → Pages**.
2. Under **Build and deployment**, open the **Source** dropdown and select **GitHub Actions**. Save if prompted. Do **not** leave **Deploy from a branch** selected (even temporarily): that path runs **Jekyll** on the whole repository and fails on `*.astro` files (`Invalid YAML front matter in .../index.astro`).
3. After the source is **GitHub Actions**, push to **`main`** or **`master`**, or open **Actions → Deploy GitHub Pages → Run workflow**. A successful publish is the workflow named **Deploy GitHub Pages** (this repository’s workflow file). The workflow uses **pnpm** from the root `packageManager` field, runs `pnpm build`, and uploads **`apps/web/dist`** as the Pages artifact.

The Astro config sets `site` and `base` in CI from `GITHUB_REPOSITORY_OWNER` and `GITHUB_REPOSITORY`. The **repository slug is lowercased** for `base` (for example `Owner/Personal-Portfolio` becomes `https://owner.github.io` and `base` `/personal-portfolio`) so asset URLs match GitHub Pages paths. For a repository named `<owner>.github.io`, `base` is `/`. Production builds **inline** the main stylesheet and emit hashed JS/fonts/images under **`/…/astro/`** (not `_astro/`) so GitHub Pages does not skip underscore paths.

### Custom domain (for example `skylardryden.com`)

In **Settings → Secrets and variables → Actions → Variables** (repository variables), you can set:

| Variable | Example | Purpose |
| -------- | ------- | ------- |
| `PUBLIC_SITE_URL` | `https://skylardryden.com` | Sets Astro `site` for canonical URLs and metadata (use your real public origin, no trailing slash). |
| `PUBLIC_BASE_PATH` | `/personal-portfolio` | Sets Astro `base` when the URL path **must not** match the GitHub repository name (leading slash optional). If unset, `base` is `/<lowercased-repo-name>/` for project sites. |

The deploy workflow passes these into `pnpm build`. After changing them, run the deploy workflow again.

If your live URL is `https://example.com/my-site/` but the repository is `my-org/different-repo-name`, set **`PUBLIC_BASE_PATH`** to `/my-site` so HTML requests `https://example.com/my-site/astro/...` instead of the wrong prefix.

If your default branch is neither `main` nor `master`, update the `on.push.branches` list in the workflow file.

### If the failing run is named “pages build and deployment”

That log line (`jekyll v3.10.0`, `Invalid YAML front matter in .../index.astro`) is **not** from the Astro build. It is GitHub’s **built-in** Pages job that still thinks the site is published **from a branch** (Jekyll over the repo). Fix it only in **Settings → Pages → Source → GitHub Actions**. Until that is saved, the **Deploy GitHub Pages** workflow cannot replace that pipeline.

This repo includes a root **`.nojekyll`** file so that if Pages were ever switched to “deploy from a branch,” GitHub would not run Jekyll on the repository (Jekyll treats `_*` paths and `---` in sources specially). The real site is always the **GitHub Actions** artifact from **`apps/web/dist`**.
