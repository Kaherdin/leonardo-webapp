'use client'
import React, { useState, useRef } from 'react'
import { Camera, Image as ImageIcon, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const PhotoTransformer = () => {
  const [photo, setPhoto] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [transformedImage, setTransformedImage] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Styles disponibles pour la transformation
  const styles = [
    { id: '67', name: 'Style Reference - High' },
    { id: '133', name: 'Character Reference' },
    { id: '100', name: 'Content Reference' },
  ]

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Erreur d'accès à la caméra:", err)
    }
  }

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0)
        const photoData = canvas.toDataURL('image/jpeg')
        setPhoto(photoData)
        // Arrêter la caméra
        const stream = videoRef.current.srcObject as MediaStream
        stream?.getTracks().forEach((track) => track.stop())
      }
    }
  }

  const transformPhoto = async () => {
    if (!photo || !selectedStyle) return

    setIsLoading(true)
    try {
      // Simulation de l'appel API (à remplacer par votre appel réel)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // TODO: Implémentez ici l'appel à l'API Leonardo.ai
      // const response = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': 'Bearer YOUR_API_KEY',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     // Paramètres selon la documentation
      //   })
      // });

      setTransformedImage(photo) // Remplacer par l'image transformée de l'API
    } catch (error) {
      console.error('Erreur lors de la transformation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* En-tête */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Photo Transformer
          </h1>
          <p className="mt-2 text-gray-600">Transformez vos photos avec l'IA</p>
        </div>

        {/* Zone de capture/preview */}
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          {!photo ? (
            <div className="relative aspect-video w-full">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <img
              src={photo}
              alt="Photo capturée"
              className="aspect-video w-full object-cover"
            />
          )}
        </div>

        {/* Contrôles */}
        <div className="space-y-4">
          {!photo ? (
            <div className="flex justify-center gap-4">
              <Button
                onClick={startCamera}
                className="flex items-center gap-2"
                variant="outline"
              >
                <Camera className="h-5 w-5" />
                Démarrer la caméra
              </Button>
              <Button
                onClick={takePhoto}
                className="flex items-center gap-2"
                variant="primary"
              >
                <ImageIcon className="h-5 w-5" />
                Prendre la photo
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez un style" />
                </SelectTrigger>
                <SelectContent>
                  {styles.map((style) => (
                    <SelectItem key={style.id} value={style.id}>
                      {style.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => setPhoto(null)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Camera className="h-5 w-5" />
                  Nouvelle photo
                </Button>
                <Button
                  onClick={transformPhoto}
                  disabled={!selectedStyle || isLoading}
                  variant="primary"
                  className="flex items-center gap-2"
                >
                  <Wand2 className="h-5 w-5" />
                  {isLoading ? 'Transformation...' : 'Transformer'}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Résultat */}
        {transformedImage && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Résultat</h2>
            <div className="overflow-hidden rounded-lg bg-white shadow-lg">
              <img
                src={transformedImage}
                alt="Image transformée"
                className="w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PhotoTransformer
