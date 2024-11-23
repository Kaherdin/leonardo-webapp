import React from 'react'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import { ButtonProps, PageIntro } from '@/types/global'
import Link from 'next/link'
import clsx from 'clsx'
import { Section } from '@/components/ui/Section'

interface CTAProps {
  designType?: Number

  ctaSection: {
    sectionIntro: PageIntro
    buttons?: ButtonProps[]
    align?: string
  }
}

const RenderContent: React.FC<CTAProps> = ({ ctaSection, designType }) => {
  switch (designType) {
    default:
      return (
        <div className="bg-white">
          <FadeIn>
            <div
              className={clsx('py-8', {
                'mx-auto text-center': ctaSection.align === 'center',
                'mr-auto text-left': ctaSection.align === 'left',
                'ml-auto text-right': ctaSection.align === 'right',
              })}
            >
              <h2 className="text-base font-semibold leading-7 text-primary-600">
                {ctaSection?.sectionIntro?.eyebrow}
              </h2>
              <p className="text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {ctaSection?.sectionIntro?.title}
              </p>
              <div
                className={clsx(
                  'mt-6 max-w-xl text-pretty text-lg/8 text-gray-600',
                  {
                    'mx-auto text-center': ctaSection.align === 'center',
                    'text-left': ctaSection.align === 'left',
                    'text-right': ctaSection.align === 'right',
                  },
                )}
              >
                <BasicMarkdown>
                  {ctaSection?.sectionIntro?.content}
                </BasicMarkdown>
              </div>
              {ctaSection?.buttons && ctaSection?.buttons?.length > 0 && (
                <div
                  className={clsx('mt-10 flex gap-x-6', {
                    'items-center justify-center':
                      ctaSection.align === 'center',
                    'items-start justify-start': ctaSection.align === 'left',
                    'items-end justify-end': ctaSection.align === 'right',
                  })}
                >
                  {ctaSection?.buttons?.map((button) => (
                    <Link
                      key={button.id}
                      href={button.link}
                      className={`${
                        button.type === 'primary'
                          ? 'rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                          : 'text-sm font-semibold leading-6 text-gray-900'
                      }`}
                    >
                      {button.text}
                      {button.type === 'secondary' && (
                        <span aria-hidden="true">→</span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      )
  }
}

const CTASection: React.FC<CTAProps> = ({ ctaSection, designType }) => {
  // console.log(ctaSection, 'ctaSection')
  return (
    <Section>
      <RenderContent ctaSection={ctaSection} designType={designType} />
    </Section>
  )
}

export default CTASection
