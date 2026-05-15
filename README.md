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
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Push to **`main`** or **`master`** (or run **Actions → Deploy GitHub Pages → Run workflow**). The workflow in `.github/workflows/deploy-github-pages.yml` installs dependencies, runs `pnpm build`, and publishes `apps/web/dist`.

The Astro config sets `site` and `base` from `GITHUB_REPOSITORY_OWNER` and `GITHUB_REPOSITORY` in CI so project pages resolve assets at `https://<owner>.github.io/<repo>/`. For a repository named `<owner>.github.io`, `base` is `/`.

If your default branch is neither `main` nor `master`, update the `on.push.branches` list in the workflow file.
