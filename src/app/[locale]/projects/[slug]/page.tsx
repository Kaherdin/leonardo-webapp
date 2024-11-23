import type { Metadata } from 'next'
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import { Testimonial } from '@/components/elements/Testimonial'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { GrayscaleTransitionImage } from '@/components/ui/GrayscaleTransitionImage'

import { Project } from '@/types/project'
import { fetchProject } from '@/request/fetch'
import { PageIntroSections } from '@/components/sections/PageIntro'
import { getTranslations } from 'next-intl/server'
import { componentResolver } from '@/lib/componentResolver'
import { generatePageMetadata } from '@/lib/seo'

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await fetchProject(params.slug)
  console.log('paramas: ', params)
  return generatePageMetadata({
    data: project,
    type: 'project',
    id: params.slug,
  })
}

export default async function ViewProjectPage({ params: { slug } }: Props) {
  const project: Project = await fetchProject(slug)
  if (!project) return null

  const contentSections = project?.structure
  const { pageIntro } = project || ''
  const t = await getTranslations('Project')

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <header>
          <PageIntroSections showCover={false} centered={true} {...pageIntro} />
          <FadeIn>
            <div className="mt-24 border-t border-neutral-200 bg-white/50 sm:mt-32 lg:mt-24">
              <>
                <div className="mx-auto max-w-5xl">
                  <dl className="-mx-6 grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-4">
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">{t('client')}</dt>
                      <dd>{project.client}</dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">{t('year')}</dt>
                      <dd>
                        <time dateTime={project.year}>{project.year}</time>
                      </dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">{t('service')}</dt>
                      <dd>{project.service}</dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">{t('website')}</dt>
                      <dd>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.link}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </>
            </div>

            {project?.pageIntro?.cover?.url && (
              <div className="max-w-[76rem0 -my-px mx-auto">
                <GrayscaleTransitionImage
                  src={`${project?.pageIntro?.cover?.url}`}
                  quality={90}
                  className="w-full py-6"
                  sizes="(min-width: 1216px) 76rem, 100vw"
                  priority
                  alt={project.pageIntro?.title}
                  width={800}
                  height={600}
                />
              </div>
            )}
          </FadeIn>
        </header>
      </FadeIn>

      <FadeIn key={slug} style={{ opacity: 1, transform: 'none' }}>
        <div className="[&>*]:mx-auto [&>*]:max-w-5xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0">
          {contentSections?.map((section: any) =>
            componentResolver({ section, designType: 1 }),
          )}
        </div>
      </FadeIn>
    </Container>
  )
}
