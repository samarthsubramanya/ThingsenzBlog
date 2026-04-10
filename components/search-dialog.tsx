'use client'

import { useState, useEffect, useCallback } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Fuse from 'fuse.js'
import Link from 'next/link'
import { Search, X, FileText, Tag } from 'lucide-react'
import type { BlogMeta, BlogCategory } from '@/types/blog'

interface SearchDialogProps {
  category: BlogCategory
}

export function SearchDialog({ category }: SearchDialogProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<BlogMeta[]>([])
  const [blogs, setBlogs] = useState<BlogMeta[]>([])
  const [fuse, setFuse] = useState<Fuse<BlogMeta> | null>(null)
  const [loading, setLoading] = useState(false)

  const isTech = category === 'tech'

  // Load blog data when dialog opens
  useEffect(() => {
    if (!open || blogs.length > 0) return

    setLoading(true)
    fetch(`/api/blogs?category=${category}`)
      .then(r => r.json())
      .then((data: BlogMeta[]) => {
        setBlogs(data)
        setFuse(
          new Fuse(data, {
            keys: [
              { name: 'title', weight: 0.6 },
              { name: 'description', weight: 0.3 },
              { name: 'tags', weight: 0.1 },
            ],
            threshold: 0.4,
            includeScore: true,
          }),
        )
        setResults(data.slice(0, 6))
      })
      .finally(() => setLoading(false))
  }, [open, blogs.length, category])

  useEffect(() => {
    if (!query.trim()) { setResults(blogs.slice(0, 6)); return }
    if (fuse) setResults(fuse.search(query).map(r => r.item).slice(0, 8))
  }, [query, fuse, blogs])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(v => !v) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleOpenChange = useCallback((v: boolean) => {
    setOpen(v)
    if (!v) setQuery('')
  }, [])

  // Theme-aware class helpers
  const triggerCls = isTech
    ? 'border-terminal-green/25 text-terminal-muted hover:text-terminal-green hover:border-terminal-green/50'
    : 'border-science-border text-science-muted hover:text-science-primary hover:border-science-primary/50'
  const kbdCls = isTech ? 'border-terminal-border text-terminal-muted' : 'border-science-border text-science-muted'
  const contentCls = isTech
    ? 'bg-terminal-surface border-terminal-green/40'
    : 'bg-science-surface border-science-primary/40'
  const inputBarCls = isTech ? 'border-terminal-border' : 'border-science-border'
  const inputCls = isTech
    ? 'text-terminal-text placeholder-terminal-muted'
    : 'text-science-text placeholder-science-muted font-sans'
  const accentCls = isTech ? 'text-terminal-green' : 'text-science-primary'
  const resultHoverCls = isTech ? 'hover:bg-terminal-green/5' : 'hover:bg-science-primary/5'
  const resultBorderCls = isTech ? 'border-terminal-border/50' : 'border-science-border/50'
  const resultTitleCls = isTech
    ? 'text-terminal-text group-hover:text-terminal-green'
    : 'text-science-text group-hover:text-science-primary font-sans'
  const resultDescCls = isTech ? 'text-terminal-muted' : 'text-science-muted font-sans'
  const tagCls = isTech ? 'text-terminal-cyan' : 'text-science-accent'
  const footerCls = isTech ? 'border-terminal-border text-terminal-muted' : 'border-science-border text-science-muted'
  const kbdBorderCls = isTech ? 'border-terminal-border' : 'border-science-border'
  const loadingCls = isTech ? 'text-terminal-muted' : 'text-science-muted'
  const noResultsCls = isTech ? 'text-terminal-muted' : 'text-science-muted'

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <button className={`flex items-center gap-2 px-3 py-1.5 rounded border transition-all duration-150 text-sm ${triggerCls}`}>
          <Search size={13} />
          <span className="hidden sm:inline">Search</span>
          <kbd className={`hidden sm:inline text-[10px] border rounded px-1 ${kbdCls}`}>⌘K</kbd>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50
          data-[state=open]:animate-in data-[state=closed]:animate-out
          data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
        <Dialog.Content className={`fixed top-[18%] left-1/2 -translate-x-1/2 z-50
          w-full max-w-lg border rounded-xl shadow-2xl shadow-black/50
          data-[state=open]:animate-in data-[state=closed]:animate-out
          data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0
          data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 ${contentCls}`}
        >
          <div className={`flex items-center gap-3 px-4 py-3.5 border-b ${inputBarCls}`}>
            <Search size={15} className={`${accentCls} shrink-0`} />
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={`Search ${category} posts...`}
              className={`flex-1 bg-transparent outline-none text-sm font-mono ${inputCls}`}
            />
            <Dialog.Close className={`${resultDescCls} hover:opacity-100 transition-opacity`}>
              <X size={15} />
            </Dialog.Close>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {loading && (
              <p className={`p-5 text-sm text-center font-mono ${loadingCls}`}>
                <span className={`${accentCls} animate-cursor-blink`}>▮</span> Loading...
              </p>
            )}

            {!loading && results.length === 0 && query && (
              <p className={`p-5 text-sm text-center font-mono ${noResultsCls}`}>
                No results for <span className={accentCls}>&ldquo;{query}&rdquo;</span>
              </p>
            )}

            {!loading && results.map(blog => (
              <Dialog.Close key={blog.slug} asChild>
                <Link
                  href={`/${category}/blog/${blog.slug}`}
                  className={`flex items-start gap-3 px-4 py-3.5 border-b last:border-0 transition-colors group ${resultHoverCls} ${resultBorderCls}`}
                >
                  <FileText size={14} className={`${accentCls} mt-0.5 shrink-0`} />
                  <div className="min-w-0">
                    <p className={`text-sm font-medium transition-colors truncate ${resultTitleCls}`}>
                      {blog.title}
                    </p>
                    <p className={`text-xs mt-0.5 line-clamp-1 ${resultDescCls}`}>
                      {blog.description}
                    </p>
                    {blog.tags?.length > 0 && (
                      <div className="flex items-center gap-1 mt-1.5">
                        <Tag size={9} className={tagCls} />
                        {blog.tags.slice(0, 3).map(t => (
                          <span key={t} className={`text-[10px] ${tagCls}`}>#{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </Dialog.Close>
            ))}
          </div>

          <div className={`px-4 py-2 border-t flex items-center gap-3 text-[10px] font-mono ${footerCls}`}>
            <span><kbd className={`border rounded px-1 ${kbdBorderCls}`}>↵</kbd> open</span>
            <span><kbd className={`border rounded px-1 ${kbdBorderCls}`}>esc</kbd> close</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
