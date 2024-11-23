import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const response = await fetch(
      `https://cloud.leonardo.ai/api/rest/v1/generations/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.LEONARDO_API_KEY}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error('Failed to get result')
    }

    const data = await response.json()
    return NextResponse.json({
      status: data.status,
      generations: data.generations_by_pk?.generated_images || [],
    })
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
