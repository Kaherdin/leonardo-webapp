import clsx from 'clsx'
import Image from 'next/image' // Assuming you're using Next.js, for optimized image handling
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import BasicMarkdown from '../ui/BasicMarkdown'
import { MediaItem, PageIntro } from '@/types/global'
import NextCloudinaryImage from '../images/ImageNextCloudinary'

export function SectionIntro({
  title,
  eyebrow,
  content,
  smaller = false,
  invert = false,
  centered = false,
  pagination = false,
  cover,
  embedVideo,
  ...props
}: PageIntro & {
  pagination?: boolean
  centered?: boolean
  showCover?: boolean
  smaller?: boolean
  invert?: boolean
}) {
  const MediaRenderer = ({
    media,
    embedVideo,
  }: {
    media?: MediaItem
    embedVideo?: string
  }) => {
    if (embedVideo) {
      const getYouTubeEmbedUrl = (url: string) => {
        if (url.includes('youtube.com/embed')) return url
        const videoId = url.includes('youtube.com')
          ? new URL(url).searchParams.get('v')
          : url.split('/').pop()
        return `https://www.youtube.com/embed/${videoId}`
      }

      return (
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            width="100%"
            height="100%"
            src={getYouTubeEmbedUrl(embedVideo)}
            title="YouTube Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full rounded-lg shadow-lg"
          />
        </div>
      )
    }

    if (!media?.url) return null

    const {
      url,
      width = 1200,
      height = 675,
      alternativeText = '',
      provider_metadata,
    } = media
    const fileType = provider_metadata?.resource_type

    if (fileType === 'video') {
      return (
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <video
            controls
            preload="none"
            className="h-full w-full rounded-lg shadow-lg"
          >
            <source src={url} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        </div>
      )
    }

    return (
      <NextCloudinaryImage
        src={url}
        alt={alternativeText}
        width={width}
        height={height}
        className="w-full rounded-lg shadow-lg"
        crop="fit"
        gravity="center"
        quality="auto"
        fetchFormat="auto"
        showSkeleton
      />
    )
  }

  const renderMedia = ({
    media,
    embedVideo,
  }: {
    media: MediaItem
    embedVideo?: string
  }) => {
    const fileType = cover?.provider_metadata?.resource_type
    const url = cover?.url

    if (embedVideo) {
      let embedUrl
      if (embedVideo.includes('youtube.com/embed')) {
        embedUrl = embedVideo
      } else if (
        embedVideo.includes('youtube.com') ||
        embedVideo.includes('youtu.be')
      ) {
        const videoId = embedVideo.includes('youtube.com')
          ? new URL(embedVideo).searchParams.get('v')
          : embedVideo.split('/').pop()
        embedUrl = `https://www.youtube.com/embed/${videoId}`
      }
      return (
        <iframe
          width="700"
          height="600"
          src={embedUrl}
          title={cover?.alternativeText || 'YouTube Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full rounded-md shadow-2xl ring-1 ring-gray-900/10"
        ></iframe>
      )
    } else if (fileType === 'image' && url) {
      return (
        <Image
          src={url}
          alt={cover.alternativeText || 'Cover Image'}
          width={cover.width}
          height={cover.height}
          className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
        />
      )
    } else if (fileType === 'video') {
      return (
        <video width="700" height="600" controls preload="none">
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )
    }
    return null
  }

  return (
    <div
      {...props}
      className={clsx(centered && 'text-center', 'mb-8', 'pt-10')}
    >
      <FadeIn>
        <h2>
          {eyebrow && (
            <>
              <span
                className={clsx(
                  'block font-display text-base font-semibold',
                  invert ? 'text-primary-50' : 'text-primary-400',
                )}
              >
                {eyebrow}
              </span>
              <span className="sr-only"> - </span>
            </>
          )}
          <span
            className={clsx(
              'block font-display tracking-tight [text-wrap:balance]',
              smaller
                ? 'text-2xl font-semibold'
                : 'text-4xl font-medium sm:text-5xl',
              invert ? 'text-primary-50' : 'text-neutral-950',
            )}
          >
            {title}
          </span>
        </h2>
        {content && (
          <div
            className={clsx(
              'mt-6 max-w-3xl text-xl',
              invert ? 'text-primary-200' : 'text-neutral-600',
              centered && 'mx-auto',
            )}
          >
            <BasicMarkdown>{content}</BasicMarkdown>
          </div>
        )}
        {(cover || embedVideo) && (
          <div className="mt-8">
            <MediaRenderer media={cover ?? undefined} embedVideo={embedVideo} />
          </div>
        )}
        {/* {renderMedia(cover, embedVideo)} */}
      </FadeIn>
    </div>
  )
}
