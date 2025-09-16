import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { exportToPDF, exportToCSV } from '@/lib/export'

export async function POST(req: NextRequest) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { documentId, format } = await req.json()

  if (!documentId || !format) {
    return NextResponse.json(
      { error: 'Document ID and format required' },
      { status: 400 }
    )
  }

  const document = await prisma.document.findUnique({
    where: { id: documentId },
  })

  if (!document) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 })
  }

  try {
    if (format === 'pdf') {
      const pdfBytes = await exportToPDF(document)
      return new NextResponse(pdfBytes, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${document.title}.pdf"`,
        },
      })
    }

    if (format === 'csv') {
      const csvContent = exportToCSV([document])
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${document.title}.csv"`,
        },
      })
    }

    return NextResponse.json({ error: 'Invalid format' }, { status: 400 })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Failed to export document' },
      { status: 500 }
    )
  }
}