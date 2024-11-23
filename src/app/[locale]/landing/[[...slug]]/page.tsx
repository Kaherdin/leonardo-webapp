import FeaturesSection from '@/components/sections/dynamic/Features/FeaturesSection'
import PostsSection from '@/components/sections/dynamic/Posts/PostsSection'
import ProjectsSection from '@/components/sections/dynamic/Projects/ProjectsSection'
import ServicesSection from '@/components/sections/dynamic/Services/ServiceSection'
import TeamsSection from '@/components/sections/dynamic/Teams/TeamsCardSection'
import ReferenceSection from '@/components/sections/dynamic/References/ReferenceSection'
import ContactSection from '@/components/sections/dynamic/Contact/ContactSection'
import CultureSection from '@/components/sections/dynamic/Culture/CultureSection'
import TestimonialSection from '@/components/sections/dynamic/TestimonialSection'
import PageIntroSection from '@/components/sections/dynamic/PageIntro/PageIntroSection'
import HeroSection from '@/components/sections/dynamic/Hero/HeroSection'
import CTASection from '@/components/sections/dynamic/CTA/CTA'
import PricingSection from '@/components/sections/dynamic/PricingSection/PricingSection'

import { fetchAxiosAPI } from '@/request/request'
import { PageIntro } from '@/types/global'
import { Container } from '@/components/ui/Container'

type Props = {
  params: {
    lang: string
    slug: string
  }
}

async function getPageBySlug(slug: string, lang: string) {
  const querySlug = slug === undefined ? 'home' : slug
  const path = `/pages`
  const urlParamsObject = {
    filters: {
      slug: {
        $eq: querySlug,
      },
    },
    locale: lang,
    populate: {
      structure: {
        on: {
          'section.blog-section': {
            populate: [
              'sectionIntro',
              'posts',
              'posts.pageIntro',
              'posts.pageIntro.cover',
              'posts.author',
              'posts.author.avatar',
            ],
          },
          'section.projects-section': {
            populate: [
              'sectionIntro',
              'projects',
              'projects.pageIntro',
              'projects.pageIntro.cover',
              'projects.logo',
            ],
          },
          'section.contact-section': {
            populate: [
              'sectionIntro',
              'content',
              'content.offices',
              'content.emails',
              'content.socials',
            ],
          },

          'section.services-section': {
            populate: [
              'sectionIntro',
              'our_services',
              'our_services.pageIntro',
              'our_services.pageIntro.cover',
            ],
          },
          'section.pricing-section': {
            populate: ['sectionIntro', 'cards', 'cards.features'],
          },
          'section.team-section': {
            populate: [
              'sectionIntro',
              'members',
              'members.fullname',
              'members.avatar',
              'members.posts.pageIntro',
            ],
          },
          'section.reference-section': {
            populate: [
              'sectionIntro',
              'clients',
              'clients.name',
              'clients.logo',
            ],
          },
          'section.culture-section': {
            populate: ['sectionIntro', 'values', 'values.title'],
          },
          'section.cta': {
            populate: ['sectionIntro', 'buttons'],
          },

          'section.page-intro': {
            populate: ['title', 'eyebrow', 'content', 'cover'],
          },
          'section.features-section': {
            populate: ['sectionIntro', 'features'],
          },
          'section.hero-section': {
            populate: ['sectionIntro', 'sectionIntro.cover', 'buttons', 'logo'],
          },
        },
      },
    },
  }
  return await fetchAxiosAPI(path, urlParamsObject)
}

export default async function PageRoute({ params }: Props) {
  const page = await getPageBySlug(params.slug, params.lang)
  if (!page || !page.data || page.data.length === 0) return null

  type Section = {
    id: number
    __component: string
    [key: string]: any
  }

  const componentResolver = (section: any) => {
    switch (section.__component) {
      case 'section.blog-section':
        return (
          <PostsSection
            key={section.id}
            postsSection={section}
            designType={1}
          />
        )
      case 'section.projects-section':
        return (
          <ProjectsSection
            key={section.id}
            projectsSection={section}
            designType={2}
          />
        )

      case 'section.services-section':
        return (
          <ServicesSection
            key={section.id}
            servicesSection={section}
            designType={2}
          />
        )
      case 'section.reference-section':
        return (
          <ReferenceSection
            key={section.id}
            referenceSection={section}
            designType={2}
          />
        )
      case 'section.cta':
        return (
          <CTASection key={section.id} ctaSection={section} designType={10} />
        )
      case 'section.pricing-section':
        return (
          <PricingSection
            key={section.id}
            pricingSection={section}
            designType={10}
          />
        )
      case 'section.team-section':
        return (
          <TeamsSection
            key={section.id}
            teamsSection={section}
            designType={2}
          />
        )
      case 'section.culture-section':
        return (
          <CultureSection
            key={section.id}
            culturesSection={section}
            designType={2}
          />
        )
      case 'section.contact-section':
        return (
          <ContactSection
            key={section.id}
            contactSection={section}
            designType={2}
          />
        )
      case 'section.cta':
        return (
          <ContactSection
            key={section.id}
            contactSection={section}
            designType={2}
          />
        )
      case 'section.page-intro':
        return (
          <PageIntroSection
            key={section.id}
            pageIntroSection={section}
            designType={2}
          />
        )

      case 'section.features-section':
        return (
          <FeaturesSection
            key={section.id}
            featuresSection={section}
            designType={10}
          />
        )
      case 'section.hero-section':
        return (
          <HeroSection key={section.id} heroSection={section} designType={10} />
        )

      case 'section.testimonials':
        return (
          <TestimonialSection key={section.id} testimonialSection={section} />
        )

      default:
        return null
    }
  }

  const contentSections = page?.data[0]?.structure

  return (
    <Container>
      {contentSections?.map((section: Section & PageIntro) =>
        componentResolver(section),
      )}
    </Container>
  )
}
