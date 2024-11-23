import { MetadataRoute } from 'next'
import { fetchPosts, fetchProjects, fetchServices } from '@/request/fetch'

type SitemapRoute = {
  url: string
  lastModified: Date
  changeFrequency: 'yearly' | 'monthly' | 'weekly' | 'daily'
  priority: number
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Define static routes
  const staticRoutes: SitemapRoute[] = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  const [projects, posts, services] = await Promise.all([
    fetchProjects(),
    fetchPosts(),
    fetchServices(),
  ])

  const postRoutes = posts.map((post: any) => ({
    url: `${baseUrl}/posts/${post.id}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const serviceRoutes = services.map((service: any) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date(service.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const projectRoutes = projects.map((project: any) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes, ...postRoutes]
}
