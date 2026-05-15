// @ts-nocheck: Vite plugin typings can disagree between Astro's Vite and @tailwindcss/vite.
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

/**
 * GitHub Pages only static build:
 * - `site` + `base` from `GITHUB_REPOSITORY_*` in CI (local dev defaults to `/`).
 * - `trailingSlash: 'always'` on project pages so URLs stay consistent under `/REPO/`.
 * - `build.assets: 'astro'` (no `_astro/`) and `inlineStylesheets: 'always'` so styles are not a separate fetch.
 */
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const repoFull = process.env.GITHUB_REPOSITORY;
const repo = repoFull?.includes('/') ? repoFull.split('/')[1] : undefined;

/** @type {string | undefined} */
let site;
/** @type {string} */
let base = '/';

if (owner && repo) {
  // Host is case-insensitive; normalize so canonical URLs match the live github.io host.
  const hostOwner = String(owner).toLowerCase();
  site = `https://${hostOwner}.github.io`;
  base =
    repo.toLowerCase() === `${hostOwner}.github.io` ? '/' : `/${repo}`;
}

/** GitHub project pages work more reliably with trailing-slash URLs and BASE_URL. */
const trailingSlash = base === '/' ? 'ignore' : 'always';

export default defineConfig({
  ...(site ? { site } : {}),
  base,
  trailingSlash,
  output: 'static',
  build: {
    assets: 'astro',
    inlineStylesheets: 'always',
  },
  integrations: [react()],

  vite: {
    // Keep Vite base aligned with Astro `base` (Tailwind + subpath deploys).
    base,
    plugins: [tailwindcss()],
  },
});
