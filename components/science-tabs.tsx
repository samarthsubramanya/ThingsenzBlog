'use client'

import { useState } from 'react'
import { FlaskConical, BookOpen, LayoutGrid } from 'lucide-react'
import { ScienceBlogCard } from './science-blog-card'
import type { BlogMeta } from '@/types/blog'

interface ScienceTabsProps {
  techniques: BlogMeta[]
  digest: BlogMeta[]
  uncategorised: BlogMeta[]
}

type TabId = 'all' | 'techniques' | 'digest'

const TABS: { id: TabId; label: string; Icon: typeof FlaskConical; description: string }[] = [
  {
    id: 'all',
    label: 'All',
    Icon: LayoutGrid,
    description: 'Every article',
  },
  {
    id: 'techniques',
    label: 'Techniques & Instruments',
    Icon: FlaskConical,
    description: 'Novel methods and tools',
  },
  {
    id: 'digest',
    label: 'Research Digest',
    Icon: BookOpen,
    description: 'Recent papers, plain language',
  },
]

export function ScienceTabs({ techniques, digest, uncategorised }: ScienceTabsProps) {
  const [active, setActive] = useState<TabId>('all')

  const all = [...techniques, ...digest, ...uncategorised].sort((a, b) => {
    if (!a.date || !b.date) return 0
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const posts: Record<TabId, BlogMeta[]> = {
    all,
    techniques,
    digest,
  }

  const counts: Record<TabId, number> = {
    all: all.length,
    techniques: techniques.length,
    digest: digest.length,
  }

  const visible = posts[active]

  return (
    <div>
      {/* ── Tab bar ── */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 border border-science-border
                      rounded-xl p-1 mb-8 bg-science-surface/40">
        {TABS.map(({ id, label, Icon, description }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex-1 flex items-center gap-2.5 px-4 py-3 rounded-lg text-left
                          transition-all duration-200 group
                          ${isActive
                            ? 'bg-science-primary/15 border border-science-primary/40 shadow-sm'
                            : 'hover:bg-science-surface/70 border border-transparent'
                          }`}
            >
              <Icon
                size={15}
                className={`shrink-0 transition-colors ${isActive ? 'text-science-primary' : 'text-science-muted group-hover:text-science-text'}`}
              />
              <div className="min-w-0">
                <div className={`text-sm font-medium leading-tight truncate transition-colors
                                 ${isActive ? 'text-science-primary' : 'text-science-text'}`}>
                  {label}
                </div>
                <div className="text-[11px] text-science-muted mt-0.5 hidden sm:block truncate">
                  {description}
                </div>
              </div>
              <span className={`ml-auto shrink-0 text-xs font-mono px-1.5 py-0.5 rounded
                                 border transition-colors
                                 ${isActive
                                   ? 'border-science-primary/40 text-science-primary bg-science-primary/10'
                                   : 'border-science-border text-science-muted'
                                 }`}>
                {counts[id]}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Content ── */}
      {visible.length === 0 ? (
        <p className="text-center py-20 text-science-muted text-sm">
          No articles in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visible.map(blog => (
            <ScienceBlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}
