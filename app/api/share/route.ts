import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { projectId, expiresIn } = await req.json()

  if (!projectId) {
    return NextResponse.json({ error: 'Project ID required' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  })

  if (!project || project.userId !== user?.id) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }

  const expiresAt = expiresIn
    ? new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000)
    : null

  const share = await prisma.share.create({
    data: {
      projectId,
      expiresAt,
    },
  })

  const shareUrl = `${process.env.NEXTAUTH_URL}/share/${share.token}`

  return NextResponse.json({ shareUrl, token: share.token })
}