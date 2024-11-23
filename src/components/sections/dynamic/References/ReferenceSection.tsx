import React from 'react'

import { Client } from '@/types/client'
import { PageIntro } from '@/types/global'
import { fetchClients } from '@/request/fetch'
import { Border } from '@/components/ui/Border'

import { Container } from '@/components/ui/Container'
import { FadeIn, FadeInStagger } from '@/components/ui/FadeIn'
import { SectionIntro } from '../../SectionIntro'
import ClientCard1 from './ClientCard/ClientCard1'
import { Section } from '@/components/ui/Section'

interface ReferenceProps {
  referenceSection: { sectionIntro: PageIntro } & { clients: Client[] }
  designType: Number
}

interface RenderContentProps {
  clients: Client[]
  sectionIntro: PageIntro
  designType?: Number
}

const RenderContent: React.FC<RenderContentProps> = ({
  clients,
  sectionIntro,
  designType,
}) => {
  switch (designType) {
    default:
      return (
        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <SectionIntro {...sectionIntro} />
          <FadeInStagger faster>
            <Border className="mb-12" as={FadeIn} />
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-8 gap-y-12 pt-12 sm:grid-cols-3 lg:grid-cols-4"
            >
              {clients.map((client: Client) => (
                <li key={client.id} className="group">
                  <ClientCard1 key={client.id} client={client} />
                </li>
              ))}
            </ul>
          </FadeInStagger>
        </Container>
      )
  }
}

const ReferenceSection: React.FC<ReferenceProps> = async ({
  referenceSection,
  designType,
}) => {
  let clients: Client[] | null = null
  try {
    clients = await fetchClients()
  } catch (error) {
    console.error('Failed to load services:', error)
  }

  return (
    <Section>
      <RenderContent
        clients={
          referenceSection.clients.length > 0
            ? referenceSection.clients
            : clients || []
        }
        sectionIntro={referenceSection.sectionIntro}
        designType={designType}
      />
    </Section>
  )
}

export default ReferenceSection
