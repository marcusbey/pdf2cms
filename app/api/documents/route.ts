import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const projectId = searchParams.get('projectId')

  if (!projectId) {
    return NextResponse.json({ error: 'Project ID required' }, { status: 400 })
  }

  const documents = await prisma.document.findMany({
    where: { projectId },
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json(documents)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { title, content, metadata, projectId } = await req.json()

  const document = await prisma.document.create({
    data: {
      title,
      content,
      metadata,
      projectId
    }
  })

  await prisma.documentVersion.create({
    data: {
      documentId: document.id,
      content,
      version: 1
    }
  })

  return NextResponse.json(document)
}