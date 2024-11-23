import React from 'react'
import Icon from '@/components/images/Icon'

import { Team } from '@/types/team'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'

import { truncateWithEllipses } from '@/lib/helper'
import NextCloudinaryImage from '@/components/images/ImageNextCloudinary'
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import { Member } from '@/types/member'

interface TeamCardProps {
  member: Member
}

const TeamCard1: React.FC<TeamCardProps> = async ({ member }) => {
  const t = await getTranslations('Team')

  return (
    <>
      <li key={member.fullname}>
        <FadeIn>
          <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
            <NextCloudinaryImage
              src={`${member.avatar?.url}`}
              alt={`${member.fullname}`}
              width={500}
              height={700}
              crop={'fill'}
              // crop={'crop'}
              // crop={'pad'}
              className="grayscale transition duration-500 motion-safe:group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6">
              <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                {member.fullname}
              </p>
              <p className="mt-2 text-sm text-white">{member.role}</p>
            </div>
          </div>
        </FadeIn>
      </li>
    </>
  )
}

export default TeamCard1
