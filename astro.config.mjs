import { defineConfig } from 'astro/config';
import DecapCMS from 'astro-decap-cms';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

const DEV_PORT = 2121;

export default defineConfig({
  site: process.env.CI
    ? 'https://themesberg.github.io'
    : `http://localhost:${DEV_PORT}`,
  base: process.env.CI ? '/flowbite-astro-admin-dashboard' : undefined,

  server: {
    port: DEV_PORT,
  },

  integrations: [
    sitemap(),
    tailwind(),
    DecapCMS({
      config: {
        backend: {
          name: 'git-gateway',
          branch: 'main',
        },
        collections: [
          {
            name: 'blog',
            label: 'Blog',
            folder: 'src/content/blog',
            create: true,
            slug: '{{slug}}',
            fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Publish Date', name: 'date', widget: 'datetime' },
              { label: 'Body', name: 'body', widget: 'markdown' },
            ],
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      external: [
        'shiki/themes/hc_light.json', // Add the JSON file here
      ],
    },
  },
});
