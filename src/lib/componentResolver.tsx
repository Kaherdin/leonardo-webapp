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
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import { Section } from '@/components/ui/Section'

export const componentResolver = ({
  section,
  designType,
}: {
  section: any
  designType: number
}) => {
  switch (section.__component) {
    case 'section.text-section':
      return (
        <Section className="m-auto max-w-5xl">
          {section.title && (
            <h2 className="text-2xl font-semibold">{section.title}</h2>
          )}
          <BasicMarkdown content={section.content} />
        </Section>
      )
    case 'section.blog-section':
      return (
        <PostsSection
          key={section.id}
          postsSection={section}
          designType={designType}
        />
      )
    case 'section.projects-section':
      return (
        <ProjectsSection
          key={section.id}
          projectsSection={section}
          designType={designType}
        />
      )

    case 'section.services-section':
      return (
        <ServicesSection
          key={section.id}
          servicesSection={section}
          designType={designType}
        />
      )
    case 'section.reference-section':
      return (
        <ReferenceSection
          key={section.id}
          referenceSection={section}
          designType={designType}
        />
      )
    case 'section.cta':
      return (
        <CTASection
          key={section.id}
          ctaSection={section}
          designType={designType}
        />
      )
    case 'section.pricing-section':
      return (
        <PricingSection
          key={section.id}
          pricingSection={section}
          designType={designType}
        />
      )
    case 'section.team-section':
      return (
        <TeamsSection
          key={section.id}
          teamsSection={section}
          designType={designType}
        />
      )
    case 'section.culture-section':
      return (
        <CultureSection
          key={section.id}
          culturesSection={section}
          designType={designType}
        />
      )
    case 'section.contact-section':
      return (
        <ContactSection
          key={section.id}
          contactSection={section}
          designType={designType}
        />
      )
    case 'section.page-intro':
      return (
        <PageIntroSection
          key={section.id}
          pageIntroSection={section}
          designType={designType}
        />
      )

    case 'section.features-section':
      return (
        <FeaturesSection
          key={section.id}
          featuresSection={section}
          designType={designType}
        />
      )
    case 'section.hero-section':
      return (
        <>
          <HeroSection
            key={section.id}
            heroSection={section}
            designType={designType}
          />
          {/* <HeroSection key={section.id} heroSection={section} designType={1} />
          <HeroSection key={section.id} heroSection={section} designType={2} />
          <HeroSection key={section.id} heroSection={section} designType={3} />
          <HeroSection key={section.id} heroSection={section} designType={4} /> */}
        </>
      )

    case 'section.testimonials':
      return (
        <TestimonialSection testimonialSection={section} key={section.id} />
      )

    default:
      return null
  }
}
