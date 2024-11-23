import NextCloudinaryImage from '@/components/images/ImageNextCloudinary'
import { formatDate, truncateWithEllipses } from '@/lib/helper'
import { Post } from '@/types/post'
import Link from 'next/link'

interface PostCard1Props {
  post: Post
}

const PostCard1: React.FC<PostCard1Props> = ({ post }) => {
  return (
    <article
      key={post.slug}
      className="flex flex-col items-start justify-start"
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
        <div className="mt-4 flex items-center gap-x-4 text-xs">
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
        {post.pageIntro && (
          <div className="group relative">
            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
              <Link href={`/blog/${post.slug}`}>
                <span className="absolute inset-0" />
                {post.pageIntro.title}
              </Link>
            </h3>
            {post.pageIntro.content && (
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {truncateWithEllipses(post.pageIntro.content, 150)}
              </p>
            )}
          </div>
        )}
        <div className="relative mt-4 flex items-center gap-x-4">
          {post.author?.avatar && (
            <NextCloudinaryImage
              alt={post.author?.fullname}
              src={post.author.avatar.url}
              width={48}
              height={48}
              className="rounded-full bg-gray-100"
            />
          )}
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <span className="absolute inset-0" />
              {post.author?.fullname}
            </p>
            <p className="text-gray-600">{post.author?.title}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostCard1
