import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    console.log('Fetching generation:', params.id)

    const response = await fetch(
      `https://cloud.leonardo.ai/api/rest/v1/generations/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.LEONARDO_API_KEY}`,
          Accept: 'application/json',
        },
      },
    )

    if (!response.ok) {
      console.error('API response not ok:', response.status)
      throw new Error('Failed to fetch generation')
    }

    const data = await response.json()
    console.log('API Response:', data)

    // Vérifier si la génération est complète et a des images
    if (
      data.generations_by_pk?.status === 'COMPLETE' &&
      data.generations_by_pk?.generated_images?.length > 0
    ) {
      // Retourner la première image générée
      return NextResponse.json({
        status: 'complete',
        imageUrl: data.generations_by_pk.generated_images[0].url,
        // Optionnel : retourner toutes les images générées
        allImages: data.generations_by_pk.generated_images.map(
          (img: { url: string }) => img.url,
        ),
      })
    }

    // Si la génération est en cours
    if (data.generations_by_pk?.status === 'PENDING') {
      return NextResponse.json({ status: 'pending' })
    }

    // Si la génération a échoué
    if (data.generations_by_pk?.status === 'FAILED') {
      return NextResponse.json(
        { status: 'failed', error: 'Generation failed' },
        { status: 500 },
      )
    }

    // État par défaut: en attente
    return NextResponse.json({ status: 'pending' })
  } catch (error) {
    console.error('Get result error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to get result',
      },
      { status: 500 },
    )
  }
}
