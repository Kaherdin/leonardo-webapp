import NextCloudinaryImage from '@/components/images/ImageNextCloudinary'
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import { formatDate, truncateWithEllipses } from '@/lib/helper'
import { Post } from '@/types/post'
import Link from 'next/link'

interface PostCard2Props {
  post: Post
}

const PostCard2: React.FC<PostCard2Props> = ({ post }) => {
  return (
    <article key={post.slug} className="mb-24 flex flex-col gap-8 lg:flex-row">
      <div>
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
        <div className="flex items-start gap-x-4 text-xs">
          <time className="text-gray-500">
            {formatDate(post.publishedAt, 'fr')}
          </time>
        </div>
        <div className="group relative max-w-xl">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <Link href={`/blog/${post.slug}`}>
              <span className="absolute inset-0" />
              {post.pageIntro.title}
            </Link>
          </h3>

          {post?.pageIntro?.content && (
            <div className="typography">
              <BasicMarkdown>
                {truncateWithEllipses(post.pageIntro.content, 150)}
              </BasicMarkdown>
            </div>
          )}
          {post?.author && (
            <div className="mt-6 flex items-start">
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

export default PostCard2
