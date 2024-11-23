import React from 'react'
import { PageIntro } from '@/types/global'
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import Icon from '@/components/images/Icon'
import { Feature } from '@/types/feature'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionIntro } from '../../SectionIntro'
import { Section } from '@/components/ui/Section'

interface FeaturesProps {
  featuresSection: { sectionIntro: PageIntro } & { features: Feature[] }
  designType: Number
}

interface RenderContentProps {
  features: Feature[]
  sectionIntro: PageIntro
  designType?: Number
}

const RenderContent: React.FC<RenderContentProps> = ({
  features,
  sectionIntro,
  designType,
}) => {
  switch (designType) {
    default:
      return (
        <>
          <FadeIn>
            <SectionIntro {...sectionIntro} />
            <dl className="mt-16 grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                      <Icon
                        className="h-6 w-6 text-white"
                        name={feature.classIcon}
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    <BasicMarkdown>{feature.content}</BasicMarkdown>
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </>
      )
  }
}

const FeaturesSection: React.FC<FeaturesProps> = ({
  featuresSection,
  designType,
}) => {
  return (
    <Section>
      <RenderContent
        features={featuresSection?.features || []}
        sectionIntro={featuresSection.sectionIntro}
        designType={designType}
      />
    </Section>
  )
}

export default FeaturesSection
