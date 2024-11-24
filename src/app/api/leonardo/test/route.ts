import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_LEONARDO_API_KEY

  // Log la clé masquée pour le débogage
  console.log('API Key (last 4 chars):', apiKey?.slice(-4))

  if (!apiKey) {
    return NextResponse.json({ error: 'No API key found' }, { status: 500 })
  }

  try {
    // Test simple de l'API
    const response = await fetch('https://cloud.leonardo.ai/api/rest/v1/me', {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
    })

    const data = await response.json()
    return NextResponse.json({ status: 'ok', data })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'API test failed' },
      { status: 500 },
    )
  }
}
