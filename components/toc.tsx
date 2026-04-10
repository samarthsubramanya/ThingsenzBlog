'use client'

import { useEffect, useState } from 'react'
import { List } from 'lucide-react'
import type { Heading } from '@/types/blog'

interface TOCProps {
  headings: Heading[]
}

export function TOC({ headings }: TOCProps) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-10% 0% -70% 0%' },
    )

    headings.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <aside className="hidden xl:block sticky top-24 self-start w-60 shrink-0">
      <div className="border border-terminal-green/20 rounded-xl p-4 bg-terminal-surface/40">
        {/* Header */}
        <div className="flex items-center gap-1.5 text-terminal-green text-[10px]
                        uppercase tracking-widest mb-4 font-semibold">
          <List size={11} />
          <span>Contents</span>
        </div>

        {/* Links */}
        <nav className="space-y-0.5">
          {headings.map(h => (
            <a
              key={h.id}
              href={`#${h.id}`}
              style={{ paddingLeft: `${(h.level - 1) * 10}px` }}
              className={`block text-xs py-1 leading-snug transition-all duration-150
                ${activeId === h.id
                  ? 'text-terminal-green pl-2 border-l-2 border-terminal-green'
                  : 'text-terminal-muted hover:text-terminal-text'
                }`}
            >
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
