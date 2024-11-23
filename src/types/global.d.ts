import { Member } from './member'

export type BaseItem = {
  id: number
  publishedAt: Date
}

export interface BasesData {
  data: BaseItem[]
  meta: PaginationMeta
}

export interface BaseData {
  data: BaseItem
  meta: PaginationMeta
}

export interface Data {
  data: any
  meta: PaginationMeta
}

//****** IMAGE ******\\
export interface MediaItem {
  id: string
  url: string
  provider_metadata?: any
  width: number
  height: number
  alternativeText: string
}

export interface SeoData {
  seo: {
    metaTitle: string
    metaDescription: string
    metaImage: MediaItem
  }
  pageIntro: PageIntro
}

//****** REQUEST ******\\
export interface RestQueryParams extends Partial<PaginationMeta> {
  fields?: string | string[]
  filters?: object
  sort?: string
  locale?: string
  populate?: string | object
  locale?: string | string[]
  publicationState?: 'live' | 'preview'
  cover?: MediaItem
}

export interface PaginationMeta {
  pagination: {
    page: number
    pageSize: number
    pageCount?: number
    total?: number
  }
}

//****** SECTIONS ******\\

export interface PageIntro {
  title: string
  eyebrow: string
  content: string
  cover: MediaItem | null
  pagination: boolean
  embedVideo?: string
}

export interface Culture {
  id: string
  title: string
  content: string
}

// Office.ts
export interface Office {
  name: string
  children: React.ReactNode
  invert: boolean
  phone?: string
}

// CTA.ts
export interface CTA {}

export interface ButtonProps {
  id: string
  link: string
  text: string
  type: string
}

export interface Pagination {
  id: number
  value: 'off' | 'infinite' | 'pagination'
}
