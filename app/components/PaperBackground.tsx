'use client'

import { motion } from 'framer-motion'

export function PaperBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="paper-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100" height="100" fill="transparent" />
            <path
              d="M0 50h100M50 0v100"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.05"
              className="text-gray-900 dark:text-gray-100"
            />
          </pattern>
          
          <linearGradient id="fade-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.02" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#paper-pattern)" />
      </svg>

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-lg bg-gradient-to-br from-blue-50/20 to-purple-50/20 dark:from-blue-900/10 dark:to-purple-900/10"
          style={{
            width: `${300 + i * 100}px`,
            height: `${200 + i * 80}px`,
            left: `${-50 + i * 20}%`,
            top: `${-20 + i * 15}%`,
            transform: 'rotate(-5deg)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.05, 1],
            rotate: [-5 + i * 2, -5 + i * 2 + 3, -5 + i * 2],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent dark:from-slate-900/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </div>
  )
}