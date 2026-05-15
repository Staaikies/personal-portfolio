// @ts-nocheck — Vite plugin typings can disagree between Astro's Vite and @tailwindcss/vite.
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

/**
 * GitHub Pages: project sites live at https://OWNER.github.io/REPO/
 * In GitHub Actions, GITHUB_REPOSITORY_OWNER and GITHUB_REPOSITORY are set automatically.
 * For a user/org site repo named OWNER.github.io, base is "/".
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
  // Emit hashed assets under `astro/` instead of `_astro/`. Jekyll (and some branch-based
  // Pages setups) ignore paths starting with `_`, which breaks CSS/JS if `.nojekyll` is absent.
  build: {
    assets: 'astro',
  },
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
