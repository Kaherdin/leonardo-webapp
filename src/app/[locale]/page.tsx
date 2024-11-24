import type { Metadata } from 'next'

import { Container } from '@/components/ui/Container'
import PhotoTransformer from '@/components/leonardo/LeonardoApp'
import ImageStyleMerger from '@/components/leonardo/ImageStyleMerger'

export const metadata: Metadata = {
  title: 'AI Photo Transformer',
  description: 'Transform your photos with AI using Leonardo.ai',
}

export default function PhotoTransformerPage() {
  return (
    <Container>
      {/* <PhotoTransformer /> */}
      <ImageStyleMerger />
    </Container>
  )
}
