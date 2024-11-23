import React from 'react'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import { Check, X } from 'lucide-react'
import { PageIntro } from '@/types/global'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'

export interface PricingFeature {
  id: number
  text: string
  included: boolean
}

export interface PricingCard {
  id: number
  name: string
  link: string
  price: string
  frequency: string
  content: string
  features: PricingFeature[]
  popular?: boolean
}

export interface PricingProps {
  designType?: Number
  pricingSection: {
    sectionIntro: PageIntro
    cards: PricingCard[]
  }
}

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

const RenderContent: React.FC<PricingProps> = ({
  pricingSection,
  designType,
}) => {
  const t = useTranslations('Pricing')
  switch (designType) {
    default:
      return (
        <>
          <FadeIn>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-base font-semibold leading-7 text-primary-600">
                  {pricingSection?.sectionIntro?.eyebrow}
                </h2>
                <p className="text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {pricingSection?.sectionIntro?.title}
                </p>
                <div className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
                  <BasicMarkdown>
                    {pricingSection?.sectionIntro?.content}
                  </BasicMarkdown>
                </div>
              </div>

              <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {pricingSection?.cards.map((card, cardIdx) => (
                  <div
                    key={card.id}
                    className={classNames(
                      card?.popular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
                      cardIdx === 0 ? 'lg:rounded-r-none' : '',
                      cardIdx === pricingSection?.cards?.length - 1
                        ? 'lg:rounded-l-none'
                        : '',
                      'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10',
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-x-4">
                        <h3
                          id={`tier-${card.id}`}
                          className={classNames(
                            card.popular ? 'text-primary-600' : 'text-gray-900',
                            'text-lg font-semibold leading-8',
                          )}
                        >
                          {card.name}
                        </h3>
                        {card.popular && (
                          <p className="rounded-full bg-primary-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary-600">
                            {t('most_popular')}
                          </p>
                        )}
                      </div>
                      <div className="mt-4 text-sm leading-6 text-gray-600">
                        <BasicMarkdown>{card.content}</BasicMarkdown>
                      </div>
                      <p className="mt-6 flex items-baseline gap-x-1">
                        <span className="text-4xl font-semibold tracking-tight text-gray-900">
                          {card.price}
                        </span>
                        <span className="text-sm font-semibold leading-6 text-gray-600">
                          /{card.frequency}
                        </span>
                      </p>
                      <ul
                        role="list"
                        className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                      >
                        {card.features.map((feature) => (
                          <li key={feature.id} className="flex gap-x-3">
                            {feature.included ? (
                              <Check className="h-6 w-5 flex-none text-primary-600" />
                            ) : (
                              <X className="h-6 w-5 flex-none text-gray-400" />
                            )}
                            {feature.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {card.link && (
                      <a
                        href={card.link}
                        aria-describedby={`tier-${card.id}`}
                        className={classNames(
                          card.popular
                            ? 'bg-primary-600 text-white shadow-sm hover:bg-primary-500'
                            : 'text-primary-600 ring-1 ring-inset ring-primary-200 hover:ring-primary-300',
                          'mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
                        )}
                      >
                        {t('btn_pricing')}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </>
      )
  }
}

const PricingSection: React.FC<PricingProps> = ({
  pricingSection,
  designType,
}) => {
  return (
    <Section>
      <RenderContent pricingSection={pricingSection} designType={designType} />
    </Section>
  )
}

export default PricingSection
