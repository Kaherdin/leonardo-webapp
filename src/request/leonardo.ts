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
          preprocessorId: 67, // Style Reference
          strengthType: 'Low',
          influence: 0.3, // Faible influence pour le style
        },
        {
          initImageId: styleImageId,
          initImageType: 'UPLOADED',
          preprocessorId: 133, // Content Reference
          strengthType: 'High',
          influence: 0.9, // Forte influence pour le contenu
        },
      ],
    }),
  })
}

async function waitForResult(
  generationId: string,
  maxAttempts = 60,
): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    console.log(`Polling attempt ${attempt + 1} of ${maxAttempts}`)

    try {
      const response = await fetch(`${LEONARDO_API_URL}/result/${generationId}`)
      const data = await response.json()
      console.log('Poll response:', data)

      if (data.status === 'complete' && data.imageUrl) {
        console.log('Generation complete:', data.imageUrl)
        return data.imageUrl
      }

      // Si on reçoit une erreur ou un statut FAILED, on arrête
      if (data.generationStatus === 'FAILED') {
        throw new Error('Generation failed')
      }

      // Attendre plus longtemps entre les tentatives
      await new Promise((resolve) => setTimeout(resolve, 3000))
    } catch (error) {
      console.error('Polling error:', error)
      // Attendre avant de réessayer
      await new Promise((resolve) => setTimeout(resolve, 3000))
    }
  }

  throw new Error('Generation timed out')
}

export const leonardoApi = {
  uploadImage,
  generateImage,
  waitForResult,
}
