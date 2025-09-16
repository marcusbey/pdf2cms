import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import * as Papa from 'papaparse'

export async function exportToPDF(data: any): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  
  let yPosition = height - 50

  // Title
  page.drawText(data.title || 'Document', {
    x: 50,
    y: yPosition,
    size: 24,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  })

  yPosition -= 40

  // Content sections
  if (data.content?.sections) {
    for (const section of data.content.sections) {
      if (yPosition < 50) {
        const newPage = pdfDoc.addPage()
        yPosition = newPage.getHeight() - 50
      }

      page.drawText(section.content || '', {
        x: 50,
        y: yPosition,
        size: 12,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
        maxWidth: width - 100,
      })

      yPosition -= 20
    }
  }

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}

export function exportToCSV(data: any[]): string {
  const flattenedData = data.map(item => ({
    id: item.id,
    title: item.title,
    content: JSON.stringify(item.content),
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }))

  return Papa.unparse(flattenedData, {
    header: true,
    delimiter: ',',
  })
}