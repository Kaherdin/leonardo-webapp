'use client'
import React from 'react'

import { Post } from '@/types/post'
import { SectionIntro } from '../../SectionIntro'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { fetchPosts } from '@/request/fetch'
import PostCard1 from '../Posts/PostCard/PostCard1'
import PostCard2 from '../Posts/PostCard/PostCard2'
import { PageIntro, Pagination } from '@/types/global'
import { Section } from '@/components/ui/Section'
import Fetcher from '@/request/Fetcher'
import { url } from 'inspector'
import PaginationMain from '../../Pagination'

interface BlogProps {
  postsSection: { sectionIntro: PageIntro } & { posts: Post[] } & {
    pagination: Pagination
  }
  designType: Number
}

interface RenderContentProps {
  posts: Post[]
  sectionIntro: PageIntro
  designType?: Number
}

const RenderContent: React.FC<RenderContentProps> = ({
  posts,
  sectionIntro,
  designType,
}) => {
  switch (designType) {
    case 1:
      return (
        <>
          <SectionIntro {...sectionIntro} />
          <FadeIn>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {posts.map((post: Post) => (
                <PostCard1 key={post.id} post={post} />
              ))}
            </div>
          </FadeIn>
        </>
      )

    default:
      return (
        <>
          <SectionIntro {...sectionIntro} />
          <FadeIn>
            {posts.map((post: Post) => (
              <PostCard2 key={post.id} post={post} />
            ))}
          </FadeIn>
        </>
      )
  }
}

const PostsSection: React.FC<BlogProps> = ({ postsSection, designType }) => {
  try {
  } catch (error) {
    console.error('Failed to load posts:', error)
  }

  const url = '/posts'

  //TODO: Change to localized string
  const sectionIntro = {
    title: 'Des posts qui peuvent vous plaire',
    eyebrow: 'Blog',
  }
  return (
    <Section>
      {postsSection?.posts ? (
        <div>
          <RenderContent
            posts={postsSection?.posts}
            sectionIntro={postsSection.sectionIntro}
            designType={designType}
          />
        </div>
      ) : (
        <Fetcher url={url} paginationMode={postsSection?.pagination?.value}>
          {({ data, currentPage, totalPages, goToPage }) => (
            <div>
              <RenderContent
                posts={data.data}
                sectionIntro={postsSection.sectionIntro}
                designType={designType}
              />
              {postsSection?.pagination?.value === 'off' ? null : (
                <PaginationMain
                  currentPage={currentPage}
                  totalPages={totalPages}
                  goToPage={goToPage}
                />
              )}
            </div>
          )}
        </Fetcher>
      )}
    </Section>
  )
}

export default PostsSection
