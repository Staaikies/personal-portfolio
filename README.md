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
2. Under **Build and deployment**, set **Source** to **GitHub Actions**. Do **not** use **Deploy from a branch**. Branch-based Pages runs **Jekyll** on your repository; it will try to parse every file (including `*.astro`) as Jekyll content. Astro pages start with `---`, which Jekyll treats as YAML front matter, so you get errors like `Invalid YAML front matter in .../index.astro`. This site is pre-built by the workflow; only the static output in `apps/web/dist` should be published.
3. After switching to GitHub Actions, wait for the **Deploy GitHub Pages** workflow to finish (or push again / run **Actions → Deploy GitHub Pages → Run workflow**). The workflow installs dependencies with **pnpm** (version comes from the `packageManager` field in the root `package.json`), runs `pnpm build`, and uploads `apps/web/dist` as the Pages artifact.

The Astro config sets `site` and `base` from `GITHUB_REPOSITORY_OWNER` and `GITHUB_REPOSITORY` in CI so project pages resolve assets at `https://<owner>.github.io/<repo>/`. For a repository named `<owner>.github.io`, `base` is `/`.

If your default branch is neither `main` nor `master`, update the `on.push.branches` list in the workflow file.
