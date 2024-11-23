// app/[locale]/services/[id]/page.tsx
import type { Metadata } from 'next'
import { Service } from '@/types/service'
import { fetchService } from '@/request/fetch'
import { Border } from '@/components/ui/Border'
import { FadeIn } from '@/components/ui/FadeIn'
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import { getTranslations } from 'next-intl/server'
import { PageIntroSections } from '@/components/sections/PageIntro'
import { generatePageMetadata } from '@/lib/seo'
import { notFound } from 'next/navigation'
import { componentResolver } from '@/lib/componentResolver'

type Props = {
  params: {
    slug: string
    locale: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await fetchService(params.slug)
  return generatePageMetadata({
    data: service,
    type: 'service',
    id: params.slug,
  })
}

async function getService(slug: string) {
  const service = await fetchService(slug)
  if (!service) return null
  return service
}

export default async function ViewServicePage({ params: { slug } }: Props) {
  const [service, t] = await Promise.all([
    getService(slug),
    getTranslations('Service'),
  ])

  if (!service) {
    notFound()
  }

  const contentSections = service?.structure

  return (
    <article>
      <Border className="pt-16">
        <div className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <header className="mx-auto flex max-w-5xl flex-col text-center">
              <PageIntroSections
                showCover={false}
                centered
                {...service.pageIntro}
              />
            </header>
          </FadeIn>
          <FadeIn
            className="[&>*]:mx-auto [&>*]:max-w-5xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0"
            key={slug}
            style={{ opacity: 1, transform: 'none' }}
          >
            <div>
              {contentSections?.map((section: any) =>
                componentResolver({ section, designType: 1 }),
              )}
            </div>
          </FadeIn>
          {/* <FadeIn className="main_content mt-24 sm:mt-32 lg:mt-40 [&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0">
            {service.content && (
              <div>
                <h2 className="text-xl">{t('content')}</h2>
                <BasicMarkdown>{service.content}</BasicMarkdown>
              </div>
            )}
          </FadeIn> */}
        </div>
      </Border>
    </article>
  )
}
