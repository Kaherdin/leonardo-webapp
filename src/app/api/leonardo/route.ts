//src/app/api/leonardo/route.ts
import {
  LeonardoApiError,
  LeonardoGenerationParams,
  leonardoRequest,
} from '@/request/leonardo'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { action, payload } = await req.json()

    switch (action) {
      case 'init_upload': {
        const data = await leonardoRequest('/init-image', {
          method: 'POST',
          body: JSON.stringify({
            extension: payload.extension,
          }),
        })
        return NextResponse.json(data)
      }

      case 'generate': {
        const generationParams = payload as LeonardoGenerationParams
        const data = await leonardoRequest('/generations', {
          method: 'POST',
          body: JSON.stringify(generationParams),
        })
        return NextResponse.json(data)
      }

      case 'get_status': {
        const { generationId } = payload
        const data = await leonardoRequest(`/generations/${generationId}`)
        return NextResponse.json(data)
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Leonardo API error:', error)

    if (error instanceof LeonardoApiError) {
      return NextResponse.json(
        {
          error: (error as LeonardoApiError).message,
          code: (error as LeonardoApiError).code,
        },
        { status: (error as LeonardoApiError).status || 500 },
      )
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      },
      { status: 500 },
    )
  }
}
