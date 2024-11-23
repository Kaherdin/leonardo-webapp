import clsx from 'clsx'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { PageIntro } from '@/types/global'
import BasicMarkdown from '../ui/BasicMarkdown'
import NextCloudinaryImage from '../images/ImageNextCloudinary'
import { Post } from '@/types/post'
import { formatDate } from '@/lib/helper'
import { Section } from '../ui/Section'

export function BlogPageIntroSections({
  eyebrow,
  title,
  content,
  cover,
  post,
  showCover = true,
}: PageIntro & { showCover?: boolean; post: Post }) {
  return (
    // <Container className="mt-24 text-center sm:mt-32 lg:mt-40">
    <Section>
      <FadeIn>
        <div className="grid gap-8">
          <div className="col-span-full">
            <h1>
              <span className="block font-display text-base font-semibold text-neutral-950">
                {formatDate(post.publishedAt, 'fr')}
              </span>
              <span className="sr-only"> - </span>
              <span className="mx-auto block max-w-5xl font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
                {title}
              </span>
            </h1>
            <div className="mx-auto mt-6 max-w-3xl text-xl text-neutral-600">
              <BasicMarkdown>{content}</BasicMarkdown>
            </div>
            <div className="mt-4 flex items-center justify-center space-x-4 text-center">
              {post.author?.avatar && (
                <NextCloudinaryImage
                  alt={post.author.fullname}
                  src={post.author.avatar.url}
                  width={64}
                  height={64}
                  className="rounded-full bg-gray-100"
                />
              )}
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                  <span className="absolute inset-0" />
                  {post.author.fullname}
                </p>
                <p className="text-gray-600">{post.author.role}</p>
              </div>
            </div>
          </div>
          {showCover && cover && (
            <div className="col-span-full mx-auto">
              <NextCloudinaryImage
                src={cover.url}
                alt={cover.alternativeText}
                width={1200}
                height={600}
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          )}
        </div>
      </FadeIn>
    </Section>
  )
}
