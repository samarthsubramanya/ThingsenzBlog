import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import type { BlogMeta } from '@/types/blog'

interface BlogCardProps {
  blog: BlogMeta
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/tech/blog/${blog.slug}`} className="group block h-full">
      <article
        className="h-full flex flex-col border border-terminal-green/20 rounded-xl overflow-hidden
                   bg-terminal-surface/30 hover:border-terminal-green/60
                   hover:bg-terminal-surface/60 hover:shadow-lg hover:shadow-terminal-green/5
                   transition-all duration-300"
      >
        {/* Thumbnail */}
        {blog.thumbnail && (
          <div className="relative overflow-hidden h-44 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-full object-cover opacity-60
                         group-hover:opacity-80 group-hover:scale-105
                         transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-terminal-bg/90 via-terminal-bg/20 to-transparent" />
            {/* Terminal path tag */}
            <div className="absolute bottom-2 left-3 flex items-center gap-1 text-terminal-green text-xs font-mono">
              <span className="opacity-50">~/blog/</span>
              <span>{blog.slug}</span>
              <span className="animate-cursor-blink">_</span>
            </div>
          </div>
        )}

        <div className="flex flex-col flex-1 p-5">
          {/* No-thumbnail path tag */}
          {!blog.thumbnail && (
            <div className="flex items-center gap-1 text-terminal-green text-xs mb-2 font-mono">
              <span className="opacity-50">~/blog/</span>
              <span>{blog.slug}</span>
              <span className="animate-cursor-blink">_</span>
            </div>
          )}

          <h2 className="text-terminal-text font-semibold text-lg mb-2 leading-snug
                         group-hover:text-terminal-green transition-colors">
            {blog.title}
          </h2>

          <p className="text-terminal-muted text-sm mb-4 line-clamp-2 flex-1">
            {blog.description}
          </p>

          {/* Footer row */}
          <div className="flex items-center justify-between mt-auto">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {blog.tags?.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full border border-terminal-cyan/30
                             text-terminal-cyan font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Reading time + arrow */}
            <div className="flex items-center gap-2 shrink-0 ml-2">
              {blog.readingTime && (
                <span className="flex items-center gap-1 text-xs text-terminal-muted">
                  <Clock size={10} />
                  {blog.readingTime}
                </span>
              )}
              <ArrowRight
                size={14}
                className="text-terminal-green opacity-0 group-hover:opacity-100
                           group-hover:translate-x-0.5 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
