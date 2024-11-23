// app/[locale]/blog/[id]/page.tsx
import type { Metadata } from 'next'
import { Border } from '@/components/ui/Border'
import { FadeIn } from '@/components/ui/FadeIn'
import { Post } from '@/types/post'
import { fetchPost } from '@/request/fetch'
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import { BlogPageIntroSections } from '@/components/sections/BlogPageIntro'
import { generatePageMetadata } from '@/lib/seo'
import { componentResolver } from '@/lib/componentResolver'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    slug: string
    locale: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchPost(params.slug)
  return generatePageMetadata({
    data: post,
    type: 'blog',
    id: params.slug,
  })
}

export default async function ViewPost({ params: { slug } }: Props) {
  const post: Post = await fetchPost(slug)
  if (!post) {
    notFound()
  }

  const contentSections = post?.structure

  return (
    <article>
      <Border className="pt-16">
        <div className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <header className="mx-auto flex max-w-5xl flex-col text-center">
              <BlogPageIntroSections
                post={post}
                showCover={true}
                {...post.pageIntro}
              />
            </header>
          </FadeIn>
          <FadeIn
            className="[&>*]:mx-auto [&>*]:max-w-5xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0"
            key={slug}
            style={{ opacity: 1, transform: 'none' }}
          >
            <div>
              {contentSections?.map((section: any) =>
                componentResolver({ section, designType: 1 }),
              )}
            </div>
          </FadeIn>
        </div>
      </Border>
    </article>
  )
}
