import { MediaItem, PageIntro, PaginationMeta } from './global.d'

import { Tag } from './tag'
import { Post } from './post'
import { Testimonial } from './testimonial'
import { Service } from './service'

// Project.ts
export interface Project {
  id: string
  pageIntro: PageIntro
  logo: MediaItem
  year: string
  client: string
  service: string
  link: string
  structure: any
  tags: Tag[]
  slug: string
  // testimonials: Testimonial[]
  // our_services: Service[]
  // posts: Post[]
  // content: string
  // expertise: string
}

export interface ProjectsData {
  data: Project[]
  meta: PaginationMeta
}

export interface ProjectData {
  data: Project
  meta: PaginationMeta
}
