'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, Zap, Share2, Download } from 'lucide-react'
import { PaperBackground } from './components/PaperBackground'

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <PaperBackground />
      
      <div className="relative z-10">
        <nav className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                PDF to CMS
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/auth/signin"
                className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            </motion.div>
          </div>
        </nav>

        <main className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center pt-20 pb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Transform PDFs into
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Dynamic Content
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              AI-powered CMS that converts your PDFs into structured content. Edit, export, and share with ease.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/auth/signin"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-shadow"
              >
                Get Started Free
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-4 gap-8 py-16"
          >
            <FeatureCard
              icon={<FileText className="w-8 h-8" />}
              title="PDF Import"
              description="Upload PDFs and watch AI extract structured content automatically"
              delay={0.3}
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="AI-Powered"
              description="Smart content extraction and organization using advanced AI"
              delay={0.4}
            />
            <FeatureCard
              icon={<Share2 className="w-8 h-8" />}
              title="Easy Sharing"
              description="Generate view-only links to share your content instantly"
              delay={0.5}
            />
            <FeatureCard
              icon={<Download className="w-8 h-8" />}
              title="Export Options"
              description="Export as PDF, CSV, or integrate with your existing tools"
              delay={0.6}
            />
          </motion.div>
        </main>
      </div>
    </div>
  )
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="text-blue-600 dark:text-blue-400 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  )
}