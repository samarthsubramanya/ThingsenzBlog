import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import type { BlogMeta } from '@/types/blog'

interface ScienceBlogCardProps {
  blog: BlogMeta
}

export function ScienceBlogCard({ blog }: ScienceBlogCardProps) {
  return (
    <Link href={`/science/blog/${blog.slug}`} className="group block h-full">
      <article
        className="h-full flex flex-col border border-science-border rounded-xl overflow-hidden
                   bg-science-surface/40 hover:border-science-primary/50
                   hover:bg-science-surface/70 hover:shadow-xl hover:shadow-science-primary/5
                   transition-all duration-300 font-sans"
      >
        {/* Thumbnail */}
        {blog.thumbnail && (
          <div className="relative overflow-hidden h-44 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-full object-cover opacity-55
                         group-hover:opacity-75 group-hover:scale-105
                         transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-science-bg/90 via-science-bg/20 to-transparent" />
          </div>
        )}

        <div className="flex flex-col flex-1 p-5">
          {/* Category label */}
          <div className="flex items-center gap-1.5 text-science-primary text-xs mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-science-primary/70" />
            <span className="font-mono opacity-70">science / {blog.slug}</span>
          </div>

          <h2 className="text-science-text font-semibold text-lg mb-2 leading-snug
                         group-hover:text-science-primary transition-colors">
            {blog.title}
          </h2>

          <p className="text-science-muted text-sm mb-4 line-clamp-2 flex-1">
            {blog.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-wrap gap-1.5">
              {blog.tags?.slice(0, 3).map(tag => (
                <span key={tag}
                  className="text-xs px-2 py-0.5 rounded-full border border-science-accent/30
                             text-science-accent">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              {blog.readingTime && (
                <span className="flex items-center gap-1 text-xs text-science-muted">
                  <Clock size={10} />
                  {blog.readingTime}
                </span>
              )}
              <ArrowRight size={14}
                className="text-science-primary opacity-0 group-hover:opacity-100
                           group-hover:translate-x-0.5 transition-all duration-200" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
