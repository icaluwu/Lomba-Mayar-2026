import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: false },
    imageService: false,
  }),
  integrations: [tailwind()],
  site: process.env.SITE_URL ?? 'https://kamusners.vercel.app',
});

