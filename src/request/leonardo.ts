const LEONARDO_API_KEY = process.env.NEXT_PUBLIC_LEONARDO_API_KEY

interface GenerateImageParams {
  contentImageId: string
  styleImageId: string
  presetStyle?: string
}

export const leonardoApi = {
  async uploadImage(file: File) {
    // 1. Obtenir l'URL d'upload
    const initResponse = await fetch(
      'https://cloud.leonardo.ai/api/rest/v1/init-image',
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${LEONARDO_API_KEY}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          extension: file.name.split('.').pop()?.toLowerCase(),
        }),
      },
    )

    const { uploadInitImage } = await initResponse.json()

    // 2. Upload l'image
    const formData = new FormData()
    const fields = JSON.parse(uploadInitImage.fields)
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value as string)
    })
    formData.append('file', file)

    await fetch(uploadInitImage.url, {
      method: 'POST',
      body: formData,
    })

    return uploadInitImage.id
  },

  async generateImage({
    contentImageId,
    styleImageId,
    presetStyle = 'CINEMATIC',
  }: GenerateImageParams) {
    const response = await fetch(
      'https://cloud.leonardo.ai/api/rest/v1/generations',
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${LEONARDO_API_KEY}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          height: 512,
          width: 512,
          modelId: 'aa77f04e-3eec-4034-9c07-d0f619684628',
          prompt:
            'Transform this image maintaining its original content with subtle style influence',
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
    if (!data.sdGenerationJob?.generationId) {
      throw new Error('Failed to start generation')
    }

    return data.sdGenerationJob.generationId
  },

  async getGenerationStatus(generationId: string) {
    const response = await fetch(
      `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`,
      {
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${LEONARDO_API_KEY}`,
        },
      },
    )

    const data = await response.json()
    return {
      status: data.generations_by_pk?.status,
      images:
        data.generations_by_pk?.generated_images?.map((img: any) => img.url) ||
        [],
    }
  },
}
