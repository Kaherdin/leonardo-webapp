'use client'

import React, { useState } from 'react'
import { Upload, Image as ImageIcon, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { leonardoApi } from '@/request/leonardo'

const ImageStyleMerger = () => {
  const [contentImage, setContentImage] = useState<File | null>(null)
  const [styleImage, setStyleImage] = useState<File | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Prévisualisation des images
  const contentPreview = contentImage ? URL.createObjectURL(contentImage) : null
  const stylePreview = styleImage ? URL.createObjectURL(styleImage) : null

  const handleContentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validation basique du fichier
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Erreur',
          description: 'Veuillez sélectionner un fichier image',
          variant: 'destructive',
        })
        return
      }

      // Taille maximale de 100MB (ajustez selon vos besoins)
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: 'Erreur',
          description: "L'image est trop grande (max 100MB)",
          variant: 'destructive',
        })
        return
      }

      console.log('Selected content file:', {
        name: file.name,
        type: file.type,
        size: file.size,
      })

      setContentImage(file)
    }
  }

  const handleStyleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setStyleImage(file)
    }
  }

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
    try {
      // Upload des deux images
      const [contentImageId, styleImageId] = await Promise.all([
        leonardoApi.uploadImage(contentImage),
        leonardoApi.uploadImage(styleImage),
      ])

      // Lancement de la génération
      const generationResult = await leonardoApi.generateImage(
        contentImageId,
        styleImageId,
      )

      // Attente et récupération du résultat (avec retry)
      let result
      let retries = 0
      while (retries < 30) {
        // 30 tentatives maximum
        result = await leonardoApi.getGenerationResult(
          generationResult.generationId,
        )
        if (result.status === 'complete') {
          setResultImage(result.imageUrl)
          break
        }
        await new Promise((resolve) => setTimeout(resolve, 2000)) // Attente de 2 secondes entre chaque tentative
        retries++
      }

      toast({
        title: 'Succès !',
        description: 'Image générée avec succès',
        variant: 'default',
      })
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la génération',
        variant: 'destructive',
      })
      console.error('Generation error:', error)
    } finally {
      setIsLoading(false)
    }
  }

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
            <h2 className="text-xl font-semibold">Image de Contenu</h2>
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
              onChange={handleContentUpload}
              className="hidden"
              id="content-upload"
            />
            <label htmlFor="content-upload">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                asChild
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
            <p className="text-sm text-neutral-600">Le style à appliquer</p>
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
              onChange={handleStyleUpload}
              className="hidden"
              id="style-upload"
            />
            <label htmlFor="style-upload">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                asChild
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

      {/* Bouton de génération */}
      <div className="flex justify-center">
        <Button
          onClick={handleGenerate}
          disabled={!contentImage || !styleImage || isLoading}
          className="flex items-center gap-2"
          variant="primary"
          size="lg"
        >
          <Wand2 className="h-5 w-5" />
          {isLoading ? 'Génération en cours...' : "Générer l'image"}
        </Button>
      </div>

      {/* Image résultante */}
      {resultImage && (
        <div className="space-y-4">
          <h2 className="text-center text-xl font-semibold">Résultat</h2>
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
            <img
              src={resultImage}
              alt="Result"
              className="w-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageStyleMerger
