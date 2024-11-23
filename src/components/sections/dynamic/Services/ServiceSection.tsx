import React from 'react'

import { Service } from '@/types/service'
import { PageIntro } from '@/types/global'
import { fetchServices } from '@/request/fetch'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionIntro } from '../../SectionIntro'
import ServiceCard1 from './ServiceCard/ServiceCard1'
import { Section } from '@/components/ui/Section'

interface ServicesProps {
  servicesSection: { sectionIntro: PageIntro } & { our_services: Service[] }
  designType: Number
}

interface RenderContentProps {
  services: Service[]
  sectionIntro: PageIntro
  designType?: Number
}

const RenderContent: React.FC<RenderContentProps> = ({
  services,
  sectionIntro,
  designType,
}) => {
  switch (designType) {
    default:
      return (
        <Container>
          <SectionIntro {...sectionIntro} />
          <FadeIn>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {services.map((service: Service) => (
                <ServiceCard1 key={service.id} service={service} />
              ))}
            </div>
          </FadeIn>
        </Container>
      )
  }
}

const ServiceSection: React.FC<ServicesProps> = async ({
  servicesSection,
  designType,
}) => {
  let services: Service[] | null = null
  try {
    services = await fetchServices()
  } catch (error) {
    console.error('Failed to load services:', error)
  }

  return (
    <Section>
      <RenderContent
        services={
          servicesSection.our_services.length > 0
            ? servicesSection.our_services
            : services || []
        }
        sectionIntro={servicesSection.sectionIntro}
        designType={designType}
      />
    </Section>
  )
}

export default ServiceSection
