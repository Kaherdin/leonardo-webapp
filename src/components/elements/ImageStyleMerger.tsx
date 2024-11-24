'use client'

import React, { useState, useRef } from 'react'
import {
  Upload,
  Image as ImageIcon,
  Wand2,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

const LEONARDO_API_URL = '/api/leonardo'

interface ResultDisplayProps {
  images: string[]
}

function ResultDisplay({ images }: ResultDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative space-y-4">
      <h2 className="text-center text-xl font-semibold">Résultat</h2>
      <div className="relative overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <img
          src={images[currentIndex]}
          alt={`Result ${currentIndex + 1}`}
          className="w-full object-contain"
        />

        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={prevImage}
              className="rounded-full p-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="flex items-center text-sm text-neutral-600">
              {currentIndex + 1} / {images.length}
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={nextImage}
              className="rounded-full p-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => window.open(images[currentIndex], '_blank')}
        >
          Ouvrir en plein écran
        </Button>
      </div>
    </div>
  )
}

const leonardoApi = {
  async uploadImage(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${LEONARDO_API_URL}/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    const data = await response.json()
    return data.id
  },

  async generateImage(contentImageId: string, styleImageId: string) {
    const response = await fetch(`${LEONARDO_API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        height: 512,
        width: 512,
        modelId: 'aa77f04e-3eec-4034-9c07-d0f619684628',
        prompt:
          'Transform this image maintaining its original content with subtle style influence',
        presetStyle: 'CINEMATIC',
        photoReal: true,
        photoRealVersion: 'v2',
        alchemy: true,
        controlnets: [
          {
            initImageId: contentImageId,
            initImageType: 'UPLOADED',
            preprocessorId: 100,
            strengthType: 'High',
            influence: 0.95,
          },
          {
            initImageId: styleImageId,
            initImageType: 'UPLOADED',
            preprocessorId: 67,
            strengthType: 'Low',
            influence: 0.25,
          },
        ],
      }),
    })

    const data = await response.json()
    console.log('Generate response:', data)

    if (!response.ok || !data.sdGenerationJob?.generationId) {
      throw new Error('Failed to start generation')
    }

    return data.sdGenerationJob.generationId
  },

  async waitForResult(
    generationId: string,
    maxAttempts = 60,
  ): Promise<string[]> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      console.log(`Polling attempt ${attempt + 1} of ${maxAttempts}`)

      try {
        const response = await fetch(
          `${LEONARDO_API_URL}/result/${generationId}`,
        )
        const data = await response.json()
        console.log('Poll response:', data)

        if (data.status === 'complete' && data.allImages) {
          return data.allImages
        }

        if (data.status === 'failed') {
          throw new Error('Generation failed')
        }

        await new Promise((resolve) => setTimeout(resolve, 3000))
      } catch (error) {
        console.error('Polling error:', error)
        await new Promise((resolve) => setTimeout(resolve, 3000))
      }
    }

    throw new Error('Generation timed out')
  },
}

const ImageStyleMerger = () => {
  const [contentImage, setContentImage] = useState<File | null>(null)
  const [styleImage, setStyleImage] = useState<File | null>(null)
  const [resultImages, setResultImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState<string>('')
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const contentPreview = contentImage ? URL.createObjectURL(contentImage) : null
  const stylePreview = styleImage ? URL.createObjectURL(styleImage) : null

  const handleGenerate = async () => {
    if (!contentImage || !styleImage) {
      toast({
        title: 'Erreur',
        description: 'Veuillez sélectionner les deux images',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    setProgress(0)

    try {
      setLoadingStatus('Upload des images...')
      const [contentImageId, styleImageId] = await Promise.all([
        leonardoApi.uploadImage(contentImage),
        leonardoApi.uploadImage(styleImage),
      ])

      setLoadingStatus('Démarrage de la génération...')
      const generationId = await leonardoApi.generateImage(
        contentImageId,
        styleImageId,
      )

      let currentProgress = 0
      progressIntervalRef.current = setInterval(() => {
        currentProgress = Math.min(currentProgress + 1, 95)
        setProgress(currentProgress)
      }, 2000)

      setLoadingStatus('Génération en cours... (1-3 minutes)')
      const images = await leonardoApi.waitForResult(generationId)

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      setProgress(100)
      setResultImages(images)

      toast({
        title: 'Succès !',
        description: 'Images générées avec succès',
      })
    } catch (error) {
      console.error('Generation error:', error)
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la génération',
        variant: 'destructive',
      })
    } finally {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }
      setLoadingStatus('')
      setIsLoading(false)
      setProgress(0)
    }
  }

  React.useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-neutral-950">
          Fusion de Style d'Image
        </h1>
        <p className="mt-2 text-neutral-600">
          Combinez vos images avec un style artistique
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Image de contenu */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Image de Base</h2>
            <p className="text-sm text-neutral-600">L'image à transformer</p>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-dashed border-neutral-200 bg-neutral-50">
            {contentPreview ? (
              <img
                src={contentPreview}
                alt="Content preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <ImageIcon className="h-12 w-12 text-neutral-400" />
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setContentImage(e.target.files?.[0] || null)}
              className="hidden"
              id="content-upload"
              disabled={isLoading}
            />
            <label htmlFor="content-upload">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                asChild
                disabled={isLoading}
              >
                <span>
                  <Upload className="h-4 w-4" />
                  Choisir l'image
                </span>
              </Button>
            </label>
          </div>
        </div>

        {/* Image de style */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Image de Style</h2>
            <p className="text-sm text-neutral-600">
              Le style à appliquer légèrement
            </p>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-dashed border-neutral-200 bg-neutral-50">
            {stylePreview ? (
              <img
                src={stylePreview}
                alt="Style preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <ImageIcon className="h-12 w-12 text-neutral-400" />
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setStyleImage(e.target.files?.[0] || null)}
              className="hidden"
              id="style-upload"
              disabled={isLoading}
            />
            <label htmlFor="style-upload">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                asChild
                disabled={isLoading}
              >
                <span>
                  <Upload className="h-4 w-4" />
                  Choisir le style
                </span>
              </Button>
            </label>
          </div>
        </div>
      </div>

      {/* État de chargement et progression */}
      {isLoading && (
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-medium">{loadingStatus}</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-neutral-100">
            <div
              className="absolute left-0 top-0 h-full bg-primary-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-neutral-600">
            La génération peut prendre entre 1 et 3 minutes
          </p>
        </div>
      )}

      {/* Bouton de génération */}
      <div className="flex justify-center">
        <Button
          onClick={handleGenerate}
          disabled={!contentImage || !styleImage || isLoading}
          className="flex items-center gap-2"
          variant="primary"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Génération en cours...
            </>
          ) : (
            <>
              <Wand2 className="h-5 w-5" />
              Générer l'image
            </>
          )}
        </Button>
      </div>

      {/* Affichage des résultats */}
      {resultImages.length > 0 && <ResultDisplay images={resultImages} />}
    </div>
  )
}

export default ImageStyleMerger
