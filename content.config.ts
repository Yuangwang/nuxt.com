import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const Button = z.object({
  label: z.string(),
  icon: z.string(),
  trailingIcon: z.string(),
  to: z.string(),
  color: z.enum(['primary', 'neutral']).optional(),
  size: z.enum(['sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'link']).optional(),
  id: z.string().optional(),
  target: z.enum(['_blank', '_self']).optional()
})

const Author = z.object({
  name: z.string(),
  description: z.string().optional(),
  username: z.string().optional(),
  twitter: z.string().optional(),
  to: z.string().optional(),
  avatar: z.object({
    src: z.string(),
    alt: z.string()
  }).optional()
})

const Testimonial = z.object({
  quote: z.string(),
  author: Author
})

const PageFeature = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().editor({ input: 'icon' }),
  to: z.string().optional(),
  target: z.enum(['_blank', '_self']).optional(),
  soon: z.boolean().optional()
})

const PageSection = z.object({
  title: z.string(),
  description: z.string(),
  links: z.array(Button),
  features: z.array(PageFeature),
  image: z.object({
    light: z.string().editor({ input: 'media' }),
    dark: z.string().editor({ input: 'media' }),
    width: z.number().optional(),
    height: z.number().optional()
  })
})

const PageHero = z.object({
  title: z.string(),
  description: z.string(),
  image: z.object({
    width: z.number().optional(),
    height: z.number().optional(),
    light: z.string().editor({ input: 'media' }),
    dark: z.string().editor({ input: 'media' })
  }).optional(),
  headline: z.object({
    label: z.string(),
    to: z.string(),
    icon: z.string().optional().editor({ input: 'icon' })
  }).optional(),
  links: z.array(Button).optional()
})

/* const examplesSource = {
  repository: 'https://github.com/nuxt/examples/tree/main',
  include: 'docs/content/!**',
  prefix: '/docs/4.examples',
  authToken: process.env.NUXT_GITHUB_TOKEN
} */

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'data',
      source: 'index.yml',
      schema: z.object({
        hero: z.object({
          cta: z.object({
            label: z.string(),
            to: z.string(),
            icon: z.string()
          })
        }),
        logos: z.object({
          title: z.string()
        }),
        sections: z.array(
          z.object({
            title: z.string(),
            description: z.string().optional(),
            class: z.string(),
            align: z.enum(['left', 'right', 'center']).optional(),
            links: z.array(
              z.object({
                label: z.string().optional(),
                icon: z.string(),
                to: z.string(),
                color: z.string().optional(),
                size: z.string().optional(),
                variant: z.string().optional(),
                target: z.string().optional()
              })
            ).optional(),
            slot: z.string().optional(),
            code: z.string().optional(),
            features: z.array(
              z.object({
                title: z.string(),
                description: z.string(),
                icon: z.string(),
                to: z.string()
              })
            ).optional(),
            integrations: z.array(
              z.object({
                src: z.string(),
                alt: z.string(),
                to: z.string()
              })
            ).optional(),
            testimonials: z.array(
              z.object({
                quote: z.string(),
                author: z.object({
                  name: z.string(),
                  description: z.string(),
                  to: z.string(),
                  target: z.string().optional(),
                  avatar: z.object({
                    src: z.string(),
                    srcset: z.string().optional()
                  }).optional()
                })
              })
            ).optional()
          })
        )
      })
    }),
    docs: defineCollection({
      type: 'page',
      source: {
        repository: 'https://github.com/nuxt/nuxt/tree/feat/migrate-to-content-v3',
        include: 'docs/**/*'
      },
      schema: z.object({
        titleTemplate: z.string().optional(),
        links: z.array(Button)
      })
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*',
      schema: z.object({
        image: z.string().editor({ input: 'media' }),
        authors: z.array(Author),
        date: z.string().date(),
        category: z.enum(['Release', 'Tutorial']),
        tags: z.array(z.string())
      })
    }),
    landing: defineCollection({
      type: 'page',
      source: [{
        include: 'index.md'
      }, {
        include: 'blog.yml'
      }]
    })
  }
})
