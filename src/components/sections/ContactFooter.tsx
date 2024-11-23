import { Button } from '@/components/elements/Button'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { useTranslations } from 'next-intl'

export function ContactFooter() {
  const t = useTranslations('Contact')
  return (
    <Container className="mt-24">
      <FadeIn className="-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">
              {t('title')}
            </h2>
            <div className="mt-6 flex">
              <Button href="/contact" invert>
                {t('button_contact')}
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
