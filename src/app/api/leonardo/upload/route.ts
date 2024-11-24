import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    // 1. Initialiser l'upload
    const initResponse = await fetch(
      'https://cloud.leonardo.ai/api/rest/v1/init-image',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_LEONARDO_API_KEY}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          extension: file.name.split('.').pop()?.toLowerCase() || 'png',
        }),
      },
    )

    if (!initResponse.ok) {
      const errorData = await initResponse.json()
      console.error('Init image error:', errorData)
      throw new Error(
        `Failed to initialize upload: ${JSON.stringify(errorData)}`,
      )
    }

    const { uploadInitImage } = await initResponse.json()
    console.log('Init response:', { uploadInitImage })

    if (!uploadInitImage) {
      throw new Error('No upload init data received')
    }

    const fields = JSON.parse(uploadInitImage.fields)

    // 2. Préparer le FormData avec tous les champs AWS
    const uploadFormData = new FormData()
    Object.entries(fields).forEach(([key, value]) => {
      uploadFormData.append(key, value as string)
    })
    uploadFormData.append('file', file)

    // 3. Upload vers S3
    const uploadResponse = await fetch(uploadInitImage.url, {
      method: 'POST',
      body: uploadFormData,
    })

    if (!uploadResponse.ok) {
      console.error('Upload response:', uploadResponse)
      throw new Error('Failed to upload file')
    }

    // 4. Attendre un peu pour s'assurer que l'image est bien traitée
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({ id: uploadInitImage.id })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 },
    )
  }
}
