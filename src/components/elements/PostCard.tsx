import React from 'react'
import Link from 'next/link'

import { Post } from '@/types/post'
import NextCloudinaryImage from '../images/ImageNextCloudinary'
import BasicMarkdown from '../ui/BasicMarkdown'
import { formatDate, truncateWithEllipses } from '@/lib/helper'

interface PostCardProps {
  post: Post
  designType?: 'default' | 'alternate'
}

const renderContentOld = (post: Post, designType?: 'default' | 'alternate') => {
  switch (designType) {
    case 'alternate':
      return (
        <article
          key={post.id}
          className="flex flex-col items-start justify-between"
        >
          <div className="relative w-full">
            {post?.pageIntro?.cover?.url && (
              <NextCloudinaryImage
                alt={post.pageIntro.title}
                src={post.pageIntro.cover.url}
                width={300}
                height={200}
                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
              />
            )}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          </div>
          <div className="max-w-xl">
            <div className="mt-8 flex items-center gap-x-4 text-xs">
              <time className="text-gray-500">
                {formatDate(post.publishedAt, 'fr')}
              </time>
              {/* <Link
              href={post.category.href}
              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
            >
              {post.category.title}
            </Link> */}
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <Link href={`/blog/${post.id}`}>
                  <span className="absolute inset-0" />
                  {post.pageIntro.title}
                </Link>
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {truncateWithEllipses(post.pageIntro.content, 150)}
              </p>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
              {post.author?.avatar && (
                <NextCloudinaryImage
                  alt={post.author.fullname}
                  src={post.author.avatar.url}
                  width={48}
                  height={48}
                  className="rounded-full bg-gray-100"
                />
              )}
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                  <span className="absolute inset-0" />
                  {post.author.fullname}
                </p>
                <p className="text-gray-600">{post.author.title}</p>
              </div>
            </div>
          </div>
        </article>
      )

    default:
      return (
        <article
          key={post.id}
          className="relative isolate mb-24 flex flex-col gap-8 lg:flex-row"
        >
          <div className="mx-auto text-center">
            {post?.pageIntro?.cover?.url && (
              <NextCloudinaryImage
                src={post.pageIntro.cover.url}
                alt={post.pageIntro.title}
                width={320}
                height={320}
                // crop={'fill'}
                className="inset-0 rounded-2xl object-cover"
              />
            )}
          </div>
          <div>
            <div className="flex items-center gap-x-4 text-xs">
              <time className="text-gray-500">
                {formatDate(post.publishedAt, 'fr')}
              </time>
            </div>
            <div className="group relative max-w-xl">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <Link href={`/blog/${post.id}`}>
                  <span className="absolute inset-0" />
                  {post.pageIntro.title}
                </Link>
              </h3>

              <div className="typography">
                <BasicMarkdown>
                  {truncateWithEllipses(post.pageIntro.content, 150)}
                </BasicMarkdown>
              </div>
              {post?.author && (
                <div className="mt-6 flex items-center">
                  {post?.author?.avatar && (
                    <NextCloudinaryImage
                      src={post.author.avatar.url}
                      alt={post.author.fullname}
                      width={50}
                      height={50}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  )}
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {post.author.fullname}
                    </p>
                    <p className="text-sm text-gray-500">{post.author.title}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6 border-b border-gray-200"></div>
          </div>
        </article>
      )
  }
}

const PostCard: React.FC<PostCardProps> = ({ post, designType }) => {
  return renderContentOld(post, designType)
}

export default PostCard
