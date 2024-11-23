import { Border } from '@/components/ui/Border'

import { Member } from '@/types/member'
import clsx from 'clsx'
import Image from 'next/image'

import NextCloudinaryImage from '../images/ImageNextCloudinary'

function TestimonialWithImage({
  author,
  children,
  className,
}: {
  author: Member
  children: React.ReactNode
  className?: string
}) {
  return (
    <figure
      className={clsx(
        'grid grid-cols-[auto,1fr] items-center gap-x-4 gap-y-8 sm:grid-cols-12 sm:grid-rows-[1fr,auto,auto,1fr] sm:gap-x-10 lg:gap-x-16',
        className,
      )}
    >
      <blockquote className="col-span-2 text-xl/7 text-neutral-600 sm:col-span-7 sm:col-start-6 sm:row-start-2">
        {typeof children === 'string' ? <p>{children}</p> : children}
      </blockquote>
      <div className="col-start-1 row-start-2 sm:col-span-5 sm:row-span-full">
        <NextCloudinaryImage
          {...author.avatar}
          src={author.avatar.url}
          alt={author.fullname}
          width={192}
          height={192}
          className="m-auto rounded-xl grayscale sm:rounded-3xl"
        />
      </div>
      <figcaption className="text-sm text-neutral-950 sm:col-span-7 sm:row-start-3 sm:text-base">
        <span className="font-semibold">{author.fullname}</span>
        <span className="hidden font-semibold sm:inline">, </span>
        <br className="sm:hidden" />
        <span className="sm:font-semibold">{author.title}</span>
      </figcaption>
    </figure>
  )
}

function TestimonialWithoutImage({
  author,
  children,
  className,
}: {
  author: Member
  children: React.ReactNode
  className?: string
}) {
  return (
    <Border position="left" className={clsx('pl-8', className)}>
      <figure className="text-sm">
        <blockquote className="text-neutral-600 [&>*]:relative [&>:first-child]:before:absolute [&>:first-child]:before:right-full [&>:first-child]:before:content-['“'] [&>:last-child]:after:content-['”']">
          {typeof children === 'string' ? <p>{children}</p> : children}
        </blockquote>
        <figcaption className="mt-6 font-semibold text-neutral-950">
          {author?.fullname}, {author?.role}
        </figcaption>
      </figure>
    </Border>
  )
}

export function Testimonial(
  props:
    | React.ComponentPropsWithoutRef<typeof TestimonialWithImage>
    | (React.ComponentPropsWithoutRef<typeof TestimonialWithoutImage> & {
        image?: undefined
      }),
) {
  if (props.author?.avatar) {
    return <TestimonialWithImage {...props} />
  }

  return <TestimonialWithoutImage {...props} />
}
