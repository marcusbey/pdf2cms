import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { FileText } from 'lucide-react'

export default async function SharePage({ 
  params 
}: { 
  params: { token: string } 
}) {
  const share = await prisma.share.findUnique({
    where: { token: params.token },
    include: {
      project: {
        include: {
          documents: true,
        },
      },
    },
  })

  if (!share || (share.expiresAt && share.expiresAt < new Date())) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Shared Project</h1>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{share.project.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {share.project.description}
          </p>

          <div className="space-y-4">
            {share.project.documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              >
                <div className="flex items-start gap-4">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{doc.title}</h3>
                    <div className="prose dark:prose-invert">
                      {(doc.content as any)?.sections?.map((section: any, i: number) => (
                        <p key={i} className="mb-2">
                          {section.content}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8 text-center">
            This is a view-only shared link. 
            {share.expiresAt && (
              <> Expires on {new Date(share.expiresAt).toLocaleDateString()}</>
            )}
          </p>
        </div>
      </main>
    </div>
  )
}