'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, CheckCircle } from 'lucide-react'

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </motion.div>

          <h2 className="text-3xl font-bold mb-4">Check your email</h2>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
            <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-300">
              We&apos;ve sent you a magic link to sign in. Click the link in your email to continue.
            </p>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Didn&apos;t receive the email? Check your spam folder or try signing in again.
          </p>

          <Link
            href="/auth/signin"
            className="inline-block text-blue-600 dark:text-blue-400 hover:underline"
          >
            Back to sign in
          </Link>
        </div>
      </motion.div>
    </div>
  )
}