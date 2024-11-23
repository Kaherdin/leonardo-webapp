import clsx from 'clsx'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { PageIntro } from '@/types/global'
import BasicMarkdown from '../ui/BasicMarkdown'
import NextCloudinaryImage from '../images/ImageNextCloudinary'

export function PageIntroSections({
  eyebrow,
  title,
  content,
  cover,
  centered = false,
  showCover = true,
}: PageIntro & { centered?: boolean; showCover?: boolean }) {
  return (
    <div className={clsx('mt-24', centered && 'text-center')}>
      <FadeIn>
        {/* <div className="grid gap-8"> */}
        <div className={`grid gap-8 ${showCover && 'grid-cols-6'}`}>
          <div className="col-span-4">
            <h1>
              <span className="block font-display text-base font-semibold text-neutral-950">
                {eyebrow}
              </span>
              <span className="sr-only"> - </span>
              <span
                className={clsx(
                  'mt-6 block max-w-5xl font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl',
                  centered && 'mx-auto',
                )}
              >
                {title}
              </span>
            </h1>
            <div
              className={clsx(
                'mt-6 max-w-3xl text-xl text-neutral-600',
                centered && 'mx-auto',
              )}
            >
              <BasicMarkdown>{content}</BasicMarkdown>
            </div>
          </div>
          {showCover && cover && (
            <div className="col-span-2">
              <NextCloudinaryImage
                src={cover.url}
                alt={cover.alternativeText}
                width={600}
                height={500}
                crop="auto"
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  )
}
