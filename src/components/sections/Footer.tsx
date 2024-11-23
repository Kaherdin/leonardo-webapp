import Link from 'next/link'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'

import { useTranslations } from 'next-intl'
import { socialMediaProfiles } from './SocialMedia'
import NextCloudinaryImage from '../images/ImageNextCloudinary'
import { ContactFooter } from './ContactFooter'

function Navigation() {
  const t = useTranslations('Navigation')

  const navigation = [
    {
      title: `${t('project')}`,
      links: [
        { title: 'Climact', href: '/projects/1' },
        { title: 'Community', href: '/projects/2' },
        { title: 'Naturalisation', href: '/projects/6' },
      ],
    },
    {
      title: 'Tagadart',
      links: [
        { title: 'About', href: '/about' },
        { title: 'Services', href: '/services' },
        { title: 'Blog', href: '/blog' },
        { title: 'Contact', href: '/contact' },
      ],
    },
    {
      title: `${t('follow_us')}`,
      links: socialMediaProfiles,
    },
  ]

  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {navigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <Link
                    href={link.href}
                    className="transition hover:text-neutral-950"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Footer() {
  return (
    <>
      <div className="w-full flex-auto">
        <ContactFooter />
      </div>
      <Container as="footer" className="mt-12 w-full sm:mt-16 lg:mt-20">
        <FadeIn>
          <div>
            <Navigation />
          </div>
          <div className="mb-20 mt-24 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
            <Link href="/" aria-label="Home">
              {/* <Logo className="h-8" fillOnHover /> */}
              <NextCloudinaryImage
                src={'logo_tagadart_2ef62a5f8c'}
                alt="Tagadart Logo"
                width={140}
                height={140}
              />
            </Link>
            <p className="text-sm text-neutral-700">
              © Tagadart Sàrl {new Date().getFullYear()}
            </p>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
