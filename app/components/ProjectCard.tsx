'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, MoreVertical, Calendar } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface Project {
  id: string
  name: string
  description?: string
  createdAt: string
  _count?: {
    documents: number
  }
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 h-64 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </DropdownMenu.Trigger>
          
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 min-w-[160px]">
              <DropdownMenu.Item className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                Rename
              </DropdownMenu.Item>
              <DropdownMenu.Item className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                Share
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />
              <DropdownMenu.Item className="px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded cursor-pointer">
                Delete
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <Link href={`/dashboard/projects/${project.id}`} className="flex-1">
        <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {project.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {project.description || 'No description'}
        </p>
      </Link>

      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <FileText className="w-4 h-4" />
          {project._count?.documents || 0} documents
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {new Date(project.createdAt).toLocaleDateString()}
        </span>
      </div>
    </motion.div>
  )
}