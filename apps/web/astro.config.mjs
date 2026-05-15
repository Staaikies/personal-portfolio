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
  site = `https://${owner}.github.io`;
  base = repo === `${owner}.github.io` ? '/' : `/${repo}`;
}

export default defineConfig({
  ...(site ? { site } : {}),
  base,
  output: 'static',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
