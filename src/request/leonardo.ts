export const leonardoApi = {
  async uploadImage(file: File) {
    // 1. Initialiser l'upload
    const initResponse = await fetch('/api/leonardo', {
      method: 'POST',
      body: JSON.stringify({
        action: 'init_upload',
        payload: {
          name: file.name,
          extension: file.name.split('.').pop()?.toLowerCase(),
        },
      }),
    })

    const { uploadInitImage } = await initResponse.json()
    if (!uploadInitImage) throw new Error('Failed to initialize upload')

    // 2. Upload vers S3
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
  }: {
    contentImageId: string
    styleImageId: string
    presetStyle?: string
  }) {
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
        },
      }),
    })

    const data = await response.json()
    return data.sdGenerationJob?.generationId
  },

  async getGenerationStatus(generationId: string) {
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

    const data = await response.json()
    return {
      status: data.generations_by_pk?.status,
      images:
        data.generations_by_pk?.generated_images?.map((img: any) => img.url) ||
        [],
    }
  },
}
