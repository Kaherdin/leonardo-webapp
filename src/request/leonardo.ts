const LEONARDO_API_URL = '/api/leonardo'

async function uploadImage(file: File) {
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
}

async function generateImage(contentImageId: string, styleImageId: string) {
  const response = await fetch(`${LEONARDO_API_URL}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      height: 512,
      width: 512,
      modelId: 'aa77f04e-3eec-4034-9c07-d0f619684628',
      prompt: 'Transform this image with the given style',
      presetStyle: 'CINEMATIC',
      photoReal: true,
      photoRealVersion: 'v2',
      alchemy: true,
      controlnets: [
        {
          initImageId: contentImageId,
          initImageType: 'UPLOADED',
          preprocessorId: 67,
          strengthType: 'High',
          influence: 0.5,
        },
        {
          initImageId: styleImageId,
          initImageType: 'UPLOADED',
          preprocessorId: 67,
          strengthType: 'High',
          influence: 0.5,
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate image')
  }

  const data = await response.json()
  if (!data.sdGenerationJob?.generationId) {
    throw new Error('No generation ID received')
  }

  return data.sdGenerationJob.generationId
}

async function getGenerationResult(generationId: string) {
  if (!generationId) {
    throw new Error('Generation ID is required')
  }

  const response = await fetch(`${LEONARDO_API_URL}/result/${generationId}`)

  if (!response.ok) {
    if (response.status === 404) {
      return { status: 'pending' }
    }
    throw new Error('Failed to get generation result')
  }

  const data = await response.json()
  return {
    status: data.status,
    imageUrl: data.generations?.[0]?.url,
  }
}

export const leonardoApi = {
  uploadImage,
  generateImage,
  getGenerationResult,
}
