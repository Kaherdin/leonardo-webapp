'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRightIcon } from 'lucide-react'
import clsx from 'clsx'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { Section } from '@/components/ui/Section'
import NextCloudinaryImage from '@/components/images/ImageNextCloudinary'
import { ButtonProps, MediaItem, PageIntro } from '@/types/global'
import { SectionIntro } from '../../SectionIntro'

interface HeroProps {
  designType?: Number
  heroSection: {
    sectionIntro: PageIntro
    logo?: MediaItem
    buttons?: ButtonProps[]
    badge_text?: string
    version_text?: string
    embedVideo?: string
  }
}

// Common button component to avoid repetition
const HeroButton = ({ button }: { button: ButtonProps }) => (
  <Link
    href={button.link}
    className={clsx(
      button.type === 'primary'
        ? 'rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
        : 'text-sm font-semibold leading-6 text-gray-900',
    )}
  >
    {button.text}
    {button.type === 'secondary' && <span aria-hidden="true">→</span>}
  </Link>
)

// Gradient background decorative element
const GradientDecoration = () => (
  <>
    <div
      aria-hidden="true"
      className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    >
      <div
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
      />
    </div>
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    >
      <div
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
      />
    </div>
  </>
)

// Hero variants components
const CenteredHero = ({ heroSection }: HeroProps) => (
  <div className="relative isolate px-6 pt-14 lg:px-8">
    <GradientDecoration />
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="text-center">
        <SectionIntro
          {...heroSection.sectionIntro}
          embedVideo={heroSection?.sectionIntro?.embedVideo}
          centered
        />
        {heroSection.buttons && heroSection.buttons.length > 0 && (
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {heroSection.buttons.map((button) => (
              <HeroButton key={button.id} button={button} />
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
)

const SplitHero = ({ heroSection }: HeroProps) => (
  <div className="relative bg-white">
    <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
      <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-48 lg:pt-40 xl:col-span-6">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-lg lg:mx-0">
              {heroSection.logo && (
                <NextCloudinaryImage
                  src={heroSection.logo.url}
                  alt={heroSection.logo.alternativeText}
                  width={124}
                  height={48}
                  className="my-8"
                />
              )}
              <SectionIntro {...heroSection.sectionIntro} />
              {heroSection.buttons && heroSection.buttons.length > 0 && (
                <div className="mt-10 flex items-center gap-x-6">
                  {heroSection.buttons.map((button) => (
                    <HeroButton key={button.id} button={button} />
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
        </Container>
      </div>
      {/* <div className="flex items-center justify-center lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
        <SectionIntro
          {...heroSection.sectionIntro}
          embedVideo={heroSection?.sectionIntro?.embedVideo}
          // content={undefined}
          // title=""
          // eyebrow=""
        />
      </div> */}
    </div>
  </div>
)

const DefaultHero = ({ heroSection }: HeroProps) => (
  <div className="relative isolate overflow-hidden bg-white">
    <svg
      aria-hidden="true"
      className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
    >
      <defs>
        <pattern
          x="50%"
          y={-1}
          id="hero-pattern"
          width={200}
          height={200}
          patternUnits="userSpaceOnUse"
        >
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <rect
        fill="url(#hero-pattern)"
        width="100%"
        height="100%"
        strokeWidth={0}
      />
    </svg>
    <Container>
      <FadeIn>
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-shrink-0 lg:pt-8">
            {heroSection.logo && (
              <NextCloudinaryImage
                src={heroSection.logo.url}
                alt={heroSection.logo.alternativeText}
                width={124}
                height={48}
                className="my-8"
              />
            )}
            {(heroSection.badge_text || heroSection.version_text) && (
              <div className="mt-24 sm:mt-32 lg:mt-16">
                <div className="inline-flex space-x-6">
                  {heroSection.badge_text && (
                    <span className="rounded-full bg-primary-600/10 px-3 py-1 text-sm font-semibold leading-6 text-primary-600 ring-1 ring-inset ring-primary-600/10">
                      {heroSection.badge_text}
                    </span>
                  )}
                  {heroSection.version_text && (
                    <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                      <span>{heroSection.version_text}</span>
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  )}
                </div>
              </div>
            )}
            <SectionIntro {...heroSection.sectionIntro} />
            {heroSection.buttons && heroSection.buttons.length > 0 && (
              <div className="mt-10 flex items-center gap-x-6">
                {heroSection.buttons.map((button) => (
                  <HeroButton key={button.id} button={button} />
                ))}
              </div>
            )}
          </div>
        </div>
      </FadeIn>
    </Container>
  </div>
)

const HeroSection: React.FC<HeroProps> = ({ heroSection, designType }) => {
  return (
    <Section>
      {(() => {
        switch (designType) {
          case 1:
            return <CenteredHero heroSection={heroSection} />
          case 2:
            return <SplitHero heroSection={heroSection} />
          case 3:
            return (
              <div className="relative isolate pt-14">
                <GradientDecoration />
                <div className="items-center justify-center py-24 sm:py-32 lg:pb-40">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <SectionIntro {...heroSection.sectionIntro} centered />
                    {heroSection.buttons && heroSection.buttons.length > 0 && (
                      <div className="mt-10 flex items-center justify-center gap-x-6">
                        {heroSection.buttons.map((button) => (
                          <HeroButton key={button.id} button={button} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          case 4:
            return (
              <SectionIntro
                {...heroSection.sectionIntro}
                embedVideo={heroSection?.sectionIntro?.embedVideo}
              />
            )
          default:
            return <DefaultHero heroSection={heroSection} />
        }
      })()}
    </Section>
  )
}

export default HeroSection
