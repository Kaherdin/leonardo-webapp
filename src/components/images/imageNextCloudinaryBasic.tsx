'use client'

import { CldImage, CldImageProps } from 'next-cloudinary'

type NextCloudinaryImageProps = CldImageProps & {
  alt: string
  width: number
  height: number
  src: string
  crop?: string
  gravity?: string
}

const NextCloudinaryImage = ({
  alt,
  width,
  height,
  src,
  crop = 'auto', //https://cloudinary.com/documentation/resizing_and_cropping#resize_and_crop_modes
  gravity = 'auto', //https://cloudinary.com/documentation/resizing_and_cropping#control_gravity
  ...props
}: NextCloudinaryImageProps) => {
  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      // sizes="(min-width: 480px ) 50vw, (min-width: 728px) 33vw, (min-width: 976px) 25vw, 100vw" //TODO: Better responsive sizes
      crop={crop}
      gravity={gravity}
      {...props}
    />
  )
}

export default NextCloudinaryImage
