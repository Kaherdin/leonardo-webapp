import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    console.log('Fetching generation for ID:', params.id)

    const response = await fetch(
      `https://cloud.leonardo.ai/api/rest/v1/generations/${params.id}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${process.env.LEONARDO_API_KEY}`, // Assurez-vous que c'est bien la bonne clé API
          'Content-Type': 'application/json',
        },
      },
    )

    // Log de la réponse brute
    console.log('API Response Status:', response.status)
    const responseText = await response.text()
    console.log('API Response Text:', responseText)

    // Parsage de la réponse
    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.error('Failed to parse response:', e)
      return NextResponse.json(
        { status: 'error', error: 'Invalid response' },
        { status: 500 },
      )
    }

    console.log('Parsed API Response:', data)

    // Vérification de la présence des images générées
    if (data?.generations_by_pk?.generated_images?.length > 0) {
      const images = data.generations_by_pk.generated_images.map(
        (img: any) => img.url,
      )

      console.log('Found images:', images)
      return NextResponse.json({
        status: 'complete',
        imageUrl: images[0],
        allImages: images,
      })
    }

    // Si la génération est en cours
    if (
      data?.generations_by_pk?.status === 'PENDING' ||
      data?.generations_by_pk?.status === 'IN_PROGRESS'
    ) {
      console.log('Generation still in progress')
      return NextResponse.json({ status: 'pending' })
    }

    // Si la génération a échoué
    if (data?.generations_by_pk?.status === 'FAILED') {
      console.log('Generation failed')
      return NextResponse.json(
        { status: 'failed', error: 'Generation failed' },
        { status: 500 },
      )
    }

    console.log('Returning pending status by default')
    return NextResponse.json({ status: 'pending' })
  } catch (error) {
    console.error('Error in result route:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to get result',
      },
      { status: 500 },
    )
  }
}
