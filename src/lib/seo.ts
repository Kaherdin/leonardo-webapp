import { SeoData } from '@/types/global'
import { Metadata } from 'next'

interface GenerateMetadataOptions {
  data: SeoData | null
  type: 'project' | 'service' | 'blog'
  id: string
  siteName?: string
}

interface SlugPageData {
  data: Array<SeoData>
}

interface GenerateSlugMetadataOptions {
  page: SlugPageData | null
  siteName?: string
}

export function generatePageMetadata({
  data,
  type,
  id,
  siteName = 'Tagadart',
}: GenerateMetadataOptions): Metadata {
  if (!data) {
    return {
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} not found`,
    }
  }

  const title = data?.seo?.metaTitle
    ? `${data?.seo?.metaTitle} - ${siteName}`
    : `${data?.pageIntro?.title} - ${siteName}`

  const basePath = {
    project: 'projects',
    service: 'services',
    blog: 'blog',
  }[type]

  return {
    title,
    description: data?.seo?.metaDescription || data?.pageIntro?.content,
    openGraph: {
      title: title,
      description: data?.seo?.metaDescription || data?.pageIntro?.content,
      images: data?.pageIntro?.cover?.url
        ? [
            {
              url: data?.pageIntro?.cover.url,
              width: 800,
              height: 600,
              alt: data.pageIntro.title,
            },
          ]
        : [],
    },
    alternates: {
      canonical: `/${basePath}/${id}`,
    },
  }
}

export function generateSlugPageMetadata({
  page,
}: GenerateSlugMetadataOptions): Metadata {
  if (!page?.data?.[0]) {
    return {
      title: 'Page not found',
    }
  }

  const pageData = page.data[0]

  return {
    title: pageData?.seo?.metaTitle,
    description: pageData?.seo?.metaDescription,
    openGraph: {
      title: pageData?.seo?.metaTitle,
      description: pageData?.seo?.metaDescription,
      images: pageData?.seo?.metaImage?.url
        ? [
            {
              url: pageData.seo.metaImage.url,
              width: 800,
              height: 600,
              alt:
                pageData.seo.metaImage.alternativeText ||
                pageData?.seo?.metaTitle ||
                '',
            },
          ]
        : [],
    },
  }
}
