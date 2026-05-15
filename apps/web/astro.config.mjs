// @ts-nocheck: Vite plugin typings can disagree between Astro's Vite and @tailwindcss/vite.
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

/** CI sets these. Optional vars override domain or path when they differ from the repo slug. */
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const repoFull = process.env.GITHUB_REPOSITORY;
const repo = repoFull?.includes('/') ? repoFull.split('/')[1] : undefined;
const siteUrl = process.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || undefined;
const baseOverride = process.env.PUBLIC_BASE_PATH?.trim();

function basePath(/** @type {string} */ raw) {
  if (!raw || raw === '/') return '/';
  const s = (raw.startsWith('/') ? raw : `/${raw}`).replace(/\/+$/, '');
  return s || '/';
}

let site;
let base = '/';
if (owner && repo) {
  const ow = String(owner).toLowerCase();
  const slug = repo.toLowerCase();
  site = siteUrl || `https://${ow}.github.io`;
  base = baseOverride ? basePath(baseOverride) : slug === `${ow}.github.io` ? '/' : `/${slug}`;
} else if (siteUrl) {
  site = siteUrl;
  if (baseOverride) base = basePath(baseOverride);
} else if (baseOverride) {
  base = basePath(baseOverride);
}

export default defineConfig({
  ...(site ? { site } : {}),
  base,
  trailingSlash: base === '/' ? 'ignore' : 'always',
  output: 'static',
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
