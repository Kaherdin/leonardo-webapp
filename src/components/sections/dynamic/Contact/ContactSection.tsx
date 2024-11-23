import React from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionIntro } from '../../SectionIntro'
import { Button } from '@/components/elements/Button'
import { ContactForm } from '@/components/form/ContactForm'
import { Border } from '@/components/ui/Border'
import { ContactContent, ContactProps, Office } from '@/types/contact'
import Icon from '@/components/images/Icon'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'

interface OfficesSectionProps {
  offices: Office[]
  className?: string
  invert?: boolean
}

const OfficesSection: React.FC<OfficesSectionProps> = ({
  offices,
  className,
  invert = false,
}) => (
  <ul role="list" className={className}>
    {offices.map((office) => (
      <li key={office.id}>
        <p
          className={invert ? 'text-white' : 'text-neutral-950'}
        >{`${office.city}, ${office.country}`}</p>
        <p className={invert ? 'text-neutral-300' : 'text-neutral-600'}>
          {office.address}
        </p>
      </li>
    ))}
  </ul>
)

const ContactDetails: React.FC<{ contactContent: ContactContent }> = ({
  contactContent,
}) => {
  const t = useTranslations('Contact')
  return (
    <FadeIn>
      {contactContent?.offices?.length > 0 && (
        <>
          <h2 className="font-display text-base font-semibold text-neutral-950">
            {t('offices')}
          </h2>
          <OfficesSection
            offices={contactContent.offices}
            className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2"
          />
        </>
      )}

      {contactContent?.emails?.length > 0 && (
        <Border className="mt-16 pt-16">
          <h2 className="font-display text-base font-semibold text-neutral-950">
            {t('email_us')}
          </h2>
          <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
            {contactContent.emails.map(({ id, label, email }) => (
              <div key={id}>
                <dt className="font-semibold text-neutral-950">{label}</dt>
                <dd>
                  <Link
                    href={`mailto:${email}`}
                    className="text-neutral-600 hover:text-neutral-950"
                  >
                    {email}
                  </Link>
                </dd>
              </div>
            ))}
          </dl>
        </Border>
      )}

      {contactContent?.socials?.length > 0 && (
        <Border className="mt-16 pt-16">
          <h2 className="font-display text-base font-semibold text-neutral-950">
            {t('follow_us')}
          </h2>
          <ul className="mt-6 flex gap-x-10">
            {contactContent.socials.map((social) => (
              <li key={social.id}>
                <Link
                  href={social.url}
                  aria-label={social.name}
                  className="text-neutral-600 hover:text-neutral-950"
                  target="_blank"
                >
                  <Icon
                    name={social.icon as keyof typeof dynamicIconImports}
                    className="h-6 w-6"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Border>
      )}
    </FadeIn>
  )
}

const RenderContent: React.FC<ContactProps> = ({
  contactSection,
  designType,
}) => {
  switch (designType) {
    case 1:
      return (
        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn className="-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
            <div className="mx-auto max-w-4xl">
              <div className="max-w-xl">
                <div className="mt-6 flex flex-wrap gap-4">
                  {contactSection?.buttons?.map((button) => (
                    <Button key={button.id} href={button.link} invert>
                      {button.text}
                    </Button>
                  ))}
                </div>
                {contactSection?.content?.offices?.length > 0 && (
                  <div className="mt-10 border-t border-white/10 pt-10">
                    <h3 className="font-display text-base font-semibold text-white">
                      Our offices
                    </h3>
                    <OfficesSection
                      offices={contactSection.content.offices}
                      invert
                      className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
                    />
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        </Container>
      )

    default:
      return (
        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
            {contactSection.formEnabled && <ContactForm />}
            <ContactDetails contactContent={contactSection.content} />
          </div>
        </Container>
      )
  }
}

const ContactSection: React.FC<ContactProps> = ({
  contactSection,
  designType,
}) => {
  return (
    <Section>
      <SectionIntro {...contactSection.sectionIntro} />
      <RenderContent contactSection={contactSection} designType={designType} />
    </Section>
  )
}

export default ContactSection
