//request/leonardo.ts

export interface LeonardoGenerationParams {
  height: number
  width: number
  modelId: string
  prompt: string
  presetStyle?: string
  photoReal?: boolean
  photoRealVersion?: string
  alchemy?: boolean
  controlnets?: Array<{
    initImageId: string
    initImageType: 'UPLOADED' | 'GENERATED'
    preprocessorId: number
    strengthType: 'Low' | 'Mid' | 'High'
    influence?: number
  }>
}

export interface LeonardoResponse {
  sdGenerationJob?: {
    generationId: string
  }
  generations_by_pk?: {
    status: 'PENDING' | 'COMPLETE' | 'FAILED'
    generated_images?: Array<{ url: string }>
  }
  uploadInitImage?: {
    id: string
    url: string
    fields: string
  }
}

export class LeonardoApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
  ) {
    super(message)
    this.name = 'LeonardoApiError'
  }
}

interface GenerateImageParams {
  contentImageId: string
  styleImageId: string
  presetStyle?: string
}

interface UploadResponse {
  uploadInitImage: {
    id: string
    url: string
    fields: string
  }
}

interface GenerationResponse {
  sdGenerationJob: {
    generationId: string
  }
}

interface StatusResponse {
  generations_by_pk: {
    status: 'PENDING' | 'COMPLETE' | 'FAILED'
    generated_images: Array<{ url: string }>
  }
}

export const leonardoApi = {
  async uploadImage(file: File): Promise<string> {
    try {
      // Step 1: Get upload URL and fields
      const initResponse = await fetch('/api/leonardo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'init_upload',
          payload: {
            extension: file.name.split('.').pop()?.toLowerCase(),
          },
        }),
      })

      if (!initResponse.ok) {
        throw new Error('Failed to initialize upload')
      }

      const initData = (await initResponse.json()) as UploadResponse
      const { uploadInitImage } = initData

      if (!uploadInitImage) {
        throw new Error('No upload data received')
      }

      // Step 2: Upload to S3
      const formData = new FormData()
      const fields = JSON.parse(uploadInitImage.fields)
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
      formData.append('file', file)

      // Important: Adding no-cors mode to handle CORS issues
      const uploadResponse = await fetch(uploadInitImage.url, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      })

      // Since we're using no-cors, we can't check response.ok
      // Wait a bit to ensure the upload is processed
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return uploadInitImage.id
    } catch (error) {
      console.error('Upload error:', error)
      throw new Error(
        error instanceof Error ? error.message : 'Failed to upload image',
      )
    }
  },

  async generateImage(params: GenerateImageParams): Promise<string> {
    const { contentImageId, styleImageId, presetStyle } = params
    const response = await fetch('/api/leonardo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'generate',
        payload: {
          height: 512,
          width: 512,
          modelId: 'aa77f04e-3eec-4034-9c07-d0f619684628', // Leonardo Kino XL
          prompt: 'Transform this image while preserving its content',
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
        },
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to generate image')
    }

    const data = (await response.json()) as GenerationResponse
    return data.sdGenerationJob.generationId
  },

  async checkGenerationStatus(generationId: string): Promise<{
    status: 'PENDING' | 'COMPLETE' | 'FAILED'
    images: string[]
  }> {
    const response = await fetch('/api/leonardo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'get_status',
        payload: { generationId },
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to check generation status')
    }

    const data = (await response.json()) as StatusResponse

    return {
      status: data.generations_by_pk?.status || 'PENDING',
      images:
        data.generations_by_pk?.generated_images?.map((img) => img.url) || [],
    }
  },
}

export async function leonardoRequest(
  endpoint: string,
  options: RequestInit = {},
) {
  const baseUrl = 'https://cloud.leonardo.ai/api/rest/v1'

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${process.env.LEONARDO_API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: 'Unknown error' }))
      throw new LeonardoApiError(
        error.message || 'API request failed',
        response.status,
        error.code,
      )
    }

    return response.json()
  } catch (error) {
    if (error instanceof LeonardoApiError) {
      throw error
    }
    throw new LeonardoApiError(
      error instanceof Error ? error.message : 'Failed to contact Leonardo API',
    )
  }
}
