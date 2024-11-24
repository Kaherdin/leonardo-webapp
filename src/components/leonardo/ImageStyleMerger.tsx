'use client'

import React, { useState } from 'react'
import { Upload, Image as ImageIcon, Wand2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResultDisplay } from './ResultDisplay'
import { useImageGeneration } from '@/hooks/useImageGeneration'

const LEONARDO_API_URL = '/api/leonardo'

const ImageStyleMerger = () => {
  const [contentImage, setContentImage] = useState<File | null>(null)
  const [styleImage, setStyleImage] = useState<File | null>(null)
  const { isLoading, progress, loadingStatus, resultImages, generateImages } =
    useImageGeneration()

  const contentPreview = contentImage ? URL.createObjectURL(contentImage) : null
  const stylePreview = styleImage ? URL.createObjectURL(styleImage) : null

  const handleGenerate = async () => {
    if (!contentImage || !styleImage) return
    await generateImages(contentImage, styleImage)
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
