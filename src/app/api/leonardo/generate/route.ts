import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const response = await fetch(
      'https://cloud.leonardo.ai/api/rest/v1/generations',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.LEONARDO_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Generation failed: ${JSON.stringify(error)}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 },
    )
  }
}
