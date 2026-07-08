// @ts-check

import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField } from 'astro/config'
import robotsTxt from 'astro-robots-txt'
import { visualizer } from 'rollup-plugin-visualizer'
import starlightThemeBlack from 'starlight-theme-black'
import { loadEnv } from 'vite'

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV is not set.')
}

const { PUBLIC_SITE_URL, PUBLIC_GITHUB_REPO_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), '')

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PUBLIC_GITHUB_REPO_URL: envField.string({
        access: 'public',
        context: 'server',
        min: 1,
        url: true
      }),
      PUBLIC_SHADCN_URL: envField.string({
        access: 'public',
        context: 'server',
        min: 1,
        url: true
      }),
      PUBLIC_SITE_URL: envField.string({
        access: 'public',
        context: 'server',
        min: 1,
        url: true
      })
    }
  },
  integrations: [
    starlight({
      customCss: ['./src/styles/global.css'],
      head: [
        // Add ICO favicon fallback for Safari.
        {
          attrs: {
            href: '/favicon.ico',
            rel: 'icon',
            type: 'image/vnd.microsoft.icon'
          },
          tag: 'link'
        },
        // Add dark mode favicon.
        {
          attrs: {
            href: '/favicon-32x32.png',
            media: '(prefers-color-scheme: dark)',
            rel: 'icon',
            type: 'image/png'
          },
          tag: 'link'
        },
        // Add light mode favicon.
        {
          attrs: {
            href: '/favicon-32x32.png',
            media: '(prefers-color-scheme: light)',
            rel: 'icon',
            type: 'image/png'
          },
          tag: 'link'
        }
      ],
      logo: {
        dark: './src/assets/images/logo-dark.svg',
        light: './src/assets/images/logo-light.svg',
        replacesTitle: true
      },
      plugins: [
        starlightThemeBlack({
          footerText:
            'Built by [Nguyen The Truong](https://ntt-portfolio.vercel.app) for use with [Shadcn](https://ui.shadcn.com)',
          navLinks: [
            {
              label: 'Docs',
              link: '/getting-started/introduction'
            },
            {
              label: 'Components',
              link: '/components'
            }
          ]
        })
      ],
      sidebar: [
        {
          items: [
            { label: 'Introduction', slug: 'getting-started/introduction' },
            { label: 'Installation', slug: 'getting-started/installation' }
          ],
          label: 'Getting Started'
        },
        {
          items: [
            {
              items: [{ autogenerate: { directory: 'components/atoms' } }],
              label: 'Atoms'
            },
            {
              items: [{ autogenerate: { directory: 'components/molecules' } }],
              label: 'Molecules'
            },
            {
              items: [{ autogenerate: { directory: 'components/organisms' } }],
              label: 'Organisms'
            }
          ],
          label: 'Components'
        }
      ],
      social: [
        {
          href: PUBLIC_GITHUB_REPO_URL,
          icon: 'github',
          label: 'GitHub'
        }
      ],
      title: 'NTT Shadcn Registry'
    }),
    react(),
    sitemap(),
    robotsTxt({
      sitemap: `${PUBLIC_SITE_URL}/sitemap-index.xml`
    })
  ],
  site: PUBLIC_SITE_URL,
  vite: {
    build: {
      cssMinify: 'esbuild'
    },
    plugins: [
      tailwindcss(),
      visualizer({
        filename: 'dist/stats.html',
        gzipSize: true
      })
    ],
    ssr: {
      // FIXME: Once starlight supports Zod 4 we can probably remove this.
      // Zod should normally be imported from astro, but I want my code to use its own zod version to reflect the version used in the shadcn components.
      noExternal: ['zod']
    }
  }
})
