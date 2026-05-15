// @ts-nocheck: Vite plugin typings can disagree between Astro's Vite and @tailwindcss/vite.
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

/**
 * GitHub Pages (static):
 * - Default: `site` + `base` from `GITHUB_REPOSITORY_*` in CI (repo slug lowercased for `/base/` URLs).
 * - Custom domain / non-matching path: set repo Actions variables `PUBLIC_SITE_URL` and optionally
 *   `PUBLIC_BASE_PATH` (e.g. `https://skylardryden.com` and `/personal-portfolio` when the URL path
 *   must differ from the repository name).
 */
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const repoFull = process.env.GITHUB_REPOSITORY;
const repo = repoFull?.includes('/') ? repoFull.split('/')[1] : undefined;

const publicSiteUrl = process.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || undefined;
const publicBasePathRaw = process.env.PUBLIC_BASE_PATH?.trim();

/** @param {string} input */
function normalizeBasePath(input) {
  if (!input || input === '/') return '/';
  const withLeading = input.startsWith('/') ? input : `/${input}`;
  const trimmed = withLeading.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/** @type {string | undefined} */
let site;
/** @type {string} */
let base = '/';

if (owner && repo) {
  const hostOwner = String(owner).toLowerCase();
  const rlow = repo.toLowerCase();
  site = publicSiteUrl || `https://${hostOwner}.github.io`;
  base = publicBasePathRaw
    ? normalizeBasePath(publicBasePathRaw)
    : rlow === `${hostOwner}.github.io`
      ? '/'
      : `/${rlow}`;
} else if (publicSiteUrl) {
  site = publicSiteUrl;
  if (publicBasePathRaw) base = normalizeBasePath(publicBasePathRaw);
} else if (publicBasePathRaw) {
  base = normalizeBasePath(publicBasePathRaw);
}

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
    base,
    plugins: [tailwindcss()],
  },
});
