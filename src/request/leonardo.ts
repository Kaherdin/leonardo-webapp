const LEONARDO_API_URL = '/api/leonardo'

async function uploadImage(file: File) {
  console.log('Uploading file:', file.name, file.type, file.size)

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch(`${LEONARDO_API_URL}/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Upload response error:', error)
      throw new Error(error.message || 'Failed to upload image')
    }

    const data = await response.json()
    console.log('Upload success:', data)
    return data.id
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
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
      prompt: 'Transform this image based on the style',
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
    const error = await response.json()
    throw new Error(error.message || 'Failed to generate image')
  }

  return await response.json()
}

async function getGenerationResult(generationId: string) {
  const response = await fetch(`${LEONARDO_API_URL}/result/${generationId}`)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to get generation result')
  }

  const data = await response.json()
  return data
}

export const leonardoApi = {
  uploadImage,
  generateImage,
  getGenerationResult,
}
