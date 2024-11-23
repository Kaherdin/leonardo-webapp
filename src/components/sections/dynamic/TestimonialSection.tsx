import React from 'react'
import NextCloudinaryImage from '@/components/images/ImageNextCloudinary'
import { MediaItem, PageIntro } from '@/types/global'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import { te } from 'date-fns/locale'
import { SectionIntro } from '../SectionIntro'
import { Section } from '@/components/ui/Section'

interface Author {
  fullname: string
  role?: string
  avatar?: MediaItem
}

interface Testimonial {
  id: number
  title: string
  content: string
  cover?: MediaItem
  author: Author
  pageIntro?: PageIntro
  member?: Author
}

interface TestimonialSectionProps {
  testimonialSection: {
    sectionIntro: PageIntro
    testimonials: Testimonial[]
  }
  designType?: number
}

const RenderContent: React.FC<TestimonialSectionProps> = ({
  testimonialSection,
  designType,
}) => {
  return (
    <>
      <FadeIn>
        {testimonialSection.sectionIntro && (
          <SectionIntro {...testimonialSection?.sectionIntro} />
        )}

        <div className="space-y-16">
          {testimonialSection.testimonials.map((testimonial) => {
            const member = testimonial?.member || testimonial?.author
            const avatar = member?.avatar

            return (
              <section
                key={testimonial.id}
                className="isolate overflow-hidden bg-white px-6 lg:px-8"
              >
                <figure className="grid grid-cols-1 items-center gap-x-6">
                  {/* SVG Decoration */}
                  <div className="relative col-span-2 lg:col-start-1 lg:row-start-2">
                    <svg
                      viewBox="0 0 162 128"
                      aria-hidden="true"
                      className="absolute -top-12 left-0 -z-10 h-32 stroke-gray-900/10"
                    >
                      <use href="#decorative-shape" />
                    </svg>
                    <blockquote className="text-4xl italic text-gray-900">
                      <BasicMarkdown>{testimonial.content}</BasicMarkdown>
                    </blockquote>
                  </div>

                  {/* Avatar and Caption */}
                  {member && (
                    <>
                      {avatar && (
                        <div className="col-end-1 w-16 lg:row-span-4 lg:w-72">
                          <NextCloudinaryImage
                            alt={avatar.alternativeText}
                            src={avatar.url}
                            width={200}
                            height={200}
                            className="rounded-xl bg-indigo-50 lg:rounded-3xl"
                          />
                        </div>
                      )}
                      <figcaption className="text-base lg:col-start-1 lg:row-start-3">
                        <div className="font-semibold text-gray-900">
                          {member.fullname}
                        </div>
                        <div className="mt-1 text-gray-500">{member.role}</div>
                      </figcaption>
                    </>
                  )}
                </figure>
              </section>
            )
          })}
        </div>
      </FadeIn>
    </>
  )
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  testimonialSection,
  designType,
}) => {
  return (
    <Section>
      <RenderContent
        testimonialSection={testimonialSection}
        designType={designType}
      />
    </Section>
  )
}

export default TestimonialSection
