export class LeonardoError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly status?: number,
  ) {
    super(message)
    this.name = 'LeonardoError'
  }
}

export const leonardoApi = {
  async uploadImage(file: File) {
    if (!process.env.NEXT_PUBLIC_LEONARDO_API_KEY) {
      throw new LeonardoError('Leonardo API key is not configured')
    }

    try {
      // 1. Initialiser l'upload
      const initResponse = await fetch(
        'https://cloud.leonardo.ai/api/rest/v1/init-image',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_LEONARDO_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: file.name,
            extension: file.name.split('.').pop()?.toLowerCase() || 'jpg',
          }),
        },
      )

      // Gérer les erreurs de l'API
      const responseText = await initResponse.text()

      let responseData
      try {
        responseData = JSON.parse(responseText)
      } catch (e) {
        console.error('Failed to parse response:', responseText)
        throw new LeonardoError('Invalid API response format')
      }

      if (!initResponse.ok) {
        console.error('Init image error:', responseData)
        throw new LeonardoError(
          responseData.error || 'Failed to initialize upload',
          responseData.code,
          initResponse.status,
        )
      }

      const { uploadInitImage } = responseData
      if (!uploadInitImage) {
        throw new LeonardoError('Missing upload information in API response')
      }

      // 2. Préparer l'upload vers S3
      const formData = new FormData()
      const fields = JSON.parse(uploadInitImage.fields || '{}')

      // Vérification des champs requis
      if (!uploadInitImage.url || !fields) {
        throw new LeonardoError('Missing required S3 upload information')
      }

      // Ajouter les champs S3
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
      formData.append('file', file)

      // 3. Upload vers S3
      const uploadResponse = await fetch(uploadInitImage.url, {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new LeonardoError(`S3 upload failed: ${uploadResponse.status}`)
      }

      // 4. Vérifier que l'ID est retourné
      if (!uploadInitImage.id) {
        throw new LeonardoError('No image ID returned from API')
      }

      return uploadInitImage.id
    } catch (error) {
      console.error('Upload error:', error)
      if (error instanceof LeonardoError) {
        throw error
      }
      throw new LeonardoError(
        error instanceof Error ? error.message : 'Unknown upload error',
      )
    }
  },

  async generateImage({
    contentImageId,
    styleImageId,
    presetStyle = 'CINEMATIC',
  }: {
    contentImageId: string
    styleImageId: string
    presetStyle?: string
  }) {
    if (!process.env.NEXT_PUBLIC_LEONARDO_API_KEY) {
      throw new LeonardoError('Leonardo API key is not configured')
    }

    const response = await fetch(
      'https://cloud.leonardo.ai/api/rest/v1/generations',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_LEONARDO_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          height: 512,
          width: 512,
          modelId: 'aa77f04e-3eec-4034-9c07-d0f619684628',
          prompt: 'Transform this image while preserving its content',
          presetStyle,
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
      },
    )

    const data = await response.json()
    if (!response.ok) {
      throw new LeonardoError(
        data.error || 'Generation failed',
        data.code,
        response.status,
      )
    }

    if (!data.sdGenerationJob?.generationId) {
      throw new LeonardoError('No generation ID returned from API')
    }

    return data.sdGenerationJob.generationId
  },

  async getGenerationStatus(generationId: string) {
    if (!process.env.NEXT_PUBLIC_LEONARDO_API_KEY) {
      throw new LeonardoError('Leonardo API key is not configured')
    }

    const response = await fetch(
      `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_LEONARDO_API_KEY}`,
        },
      },
    )

    const data = await response.json()
    if (!response.ok) {
      throw new LeonardoError(
        'Failed to get generation status',
        undefined,
        response.status,
      )
    }

    return {
      status: data.generations_by_pk?.status,
      images:
        data.generations_by_pk?.generated_images?.map((img: any) => img.url) ||
        [],
    }
  },
}
