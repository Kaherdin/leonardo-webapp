// /src/hooks/useImageGeneration.ts
import { useState, useRef } from 'react'
import { useToast } from '@/hooks/use-toast'
import { leonardoApi } from '@/request/leonardo'

export function useImageGeneration() {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loadingStatus, setLoadingStatus] = useState('')
  const [resultImages, setResultImages] = useState<string[]>([])
  const { toast } = useToast()

  const generateImages = async (contentImage: File, styleImage: File) => {
    setIsLoading(true)
    setProgress(0)

    try {
      // Upload images
      setLoadingStatus('Upload des images...')
      const [contentImageId, styleImageId] = await Promise.all([
        leonardoApi.uploadImage(contentImage),
        leonardoApi.uploadImage(styleImage),
      ])

      setProgress(30)

      // Start generation
      setLoadingStatus('Démarrage de la génération...')
      const generationId = await leonardoApi.generateImage({
        contentImageId,
        styleImageId,
      })
      setProgress(50)

      // Check status
      setLoadingStatus('Génération en cours... (1-3 minutes)')
      let attempts = 0
      const maxAttempts = 60

      while (attempts < maxAttempts) {
        const { status, images } =
          await leonardoApi.checkGenerationStatus(generationId)

        if (status === 'COMPLETE' && images.length > 0) {
          setResultImages(images)
          toast({
            title: 'Succès !',
            description: 'Images générées avec succès',
          })
          return images
        }

        if (status === 'FAILED') {
          throw new Error('La génération a échoué')
        }

        attempts++
        setProgress(Math.min(50 + (attempts * 45) / maxAttempts, 95))
        await new Promise((resolve) => setTimeout(resolve, 3000))
      }

      throw new Error('Timeout de génération')
    } catch (error) {
      console.error('Generation error:', error)
      toast({
        title: 'Erreur',
        description:
          error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
      setProgress(0)
      setLoadingStatus('')
    }
  }

  return {
    isLoading,
    progress,
    loadingStatus,
    resultImages,
    generateImages,
  }
}
