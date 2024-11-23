import React from 'react'

import { Team } from '@/types/team'
import { PageIntro } from '@/types/global'
import { fetchServices } from '@/request/fetch'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionIntro } from '../../SectionIntro'
import TeamCard1 from './TeamsCard/TeamCard1'
import { Member } from '@/types/member'
import { Section } from '@/components/ui/Section'
import { CldOgImage } from 'next-cloudinary'

interface TeamsProps {
  teamsSection: { sectionIntro: PageIntro } & { members: Member[] }
  designType: Number
}

interface RenderContentProps {
  members: Member[]
  sectionIntro: PageIntro
  designType?: Number
}

const RenderContent: React.FC<RenderContentProps> = ({
  members,
  sectionIntro,
  designType,
}) => {
  console.log(designType, 'designType')
  switch (designType) {
    default:
      return (
        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <SectionIntro {...sectionIntro} />
          <div className="space-y-24">
            <FadeIn>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="lg:col-span-3">
                  <ul
                    role="list"
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                  >
                    {members.map((member: Member) => (
                      <TeamCard1 key={member.id} member={member} />
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      )
  }
}

const TeamSection: React.FC<TeamsProps> = async ({
  teamsSection,
  designType,
}) => {
  // let teams: Team[] | null = null
  try {
    // teams = await fetchTeams()
  } catch (error) {
    console.error('Failed to load team:', error)
  }

  return (
    <Section>
      <RenderContent
        members={teamsSection.members.length > 0 ? teamsSection.members : []}
        sectionIntro={teamsSection.sectionIntro}
        designType={designType}
      />
    </Section>
  )
}

export default TeamSection
