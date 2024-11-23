'use client'

import { CldImage, CldImageProps } from 'next-cloudinary'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useState } from 'react'

interface NextCloudinaryImageProps extends Omit<CldImageProps, 'src'> {
  alt: string
  width: number
  height: number
  src: string
  priority?: boolean
  className?: string
  showSkeleton?: boolean
  //https://cloudinary.com/documentation/resizing_and_cropping#resize_and_crop_modes
  crop?:
    | 'fill'
    | 'crop'
    | 'auto'
    | 'fill_pad'
    | 'scale'
    | 'fit'
    | 'thumb'
    | 'pad'
    | 'limit'
    | 'mfit'
    | 'mpad'
    | 'lfill'
    | 'lpad'
    | 'imagga_scale'
    | 'imagga_crop'
  //https://cloudinary.com/documentation/resizing_and_cropping#control_gravity
  gravity?:
    | 'auto'
    | 'face'
    | 'faces'
    | 'center'
    | 'north'
    | 'north_east'
    | 'east'
    | 'south_east'
    | 'south'
    | 'south_west'
    | 'west'
    | 'north_west'
  // Advanced props
  radius?: string
  effect?: string
  quality?: 'auto' | number
  fetchFormat?: 'auto' | 'png' | 'jpg' | 'gif' | 'webp' | 'avif'
  // colorSpace?: 'srgb' | 'tinysrgb' | 'cmyk' | 'no_cmyk'
  dpr?: 'auto' | number
}

/**
 * Optimized Cloudinary Image Component with Skeleton Loading
 */
const NextCloudinaryImage = ({
  alt,
  width,
  height,
  src,
  priority = false,
  className = '',
  showSkeleton = true,
  crop = 'fit',
  gravity,
  radius,
  effect,
  quality = 'auto',
  fetchFormat = 'auto',
  // colorSpace = 'srgb',
  dpr = 'auto',
  ...props
}: NextCloudinaryImageProps) => {
  const [isLoading, setIsLoading] = useState(showSkeleton)
  const [hasError, setHasError] = useState(false)

  const imageConfig = {
    src,
    alt,
    width,
    height,
    className: `transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`,
    loading: priority ? ('eager' as const) : ('lazy' as const),
    crop,
    gravity,
    quality,
    format: fetchFormat,
    dpr,
    // colorSpace,
    radius,
    effect,
  }

  return (
    <div
    // className={`relative ${className}`}
    // style={{
    //   width: typeof width === 'number' ? `${width}px` : width,
    //   height: typeof height === 'number' ? `${height}px` : height,
    // }}
    >
      {isLoading && showSkeleton && (
        <div className="absolute inset-0 z-10">
          <Skeleton
            height="100%"
            width="100%"
            baseColor="#f3f4f6"
            highlightColor="#e5e7eb"
            duration={1.5}
          />
        </div>
      )}

      <CldImage
        {...imageConfig}
        {...props}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          setIsLoading(false)
          setHasError(true)
          console.error('Image load failed:', src)
          props.onError?.(e)
        }}
      />

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 p-4 text-sm text-gray-500">
          Unable to load image
        </div>
      )}
    </div>
  )
}

export default NextCloudinaryImage
