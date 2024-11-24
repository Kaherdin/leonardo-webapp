'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ResultDisplayProps {
  images: string[]
}

export function ResultDisplay({ images }: ResultDisplayProps) {
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
