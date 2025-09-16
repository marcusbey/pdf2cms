import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { processWithAI } from '@/lib/pdf-processor'

export async function POST(req: NextRequest) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const projectId = formData.get('projectId') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()
    const text = await file.text() // Simplified for now
    
    const processed = await processWithAI(text)

    return NextResponse.json({
      success: true,
      data: processed
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    )
  }
}