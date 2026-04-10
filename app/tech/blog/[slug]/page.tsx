import { getBlogBySlug, extractHeadings, getAllSlugs } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { techMdxComponents } from '@/components/mdx-components'
import { TOC } from '@/components/toc'
import { Calendar, Clock, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs('tech').map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const blog = getBlogBySlug(slug, 'tech')
  return { title: blog.meta.title, description: blog.meta.description }
}

export default async function TechBlogPost({ params }: Props) {
  const { slug } = await params
  const blog = getBlogBySlug(slug, 'tech')
  const headings = extractHeadings(blog.content)

  const formattedDate = blog.meta.date
    ? new Date(blog.meta.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">

      <Link href="/tech"
        className="inline-flex items-center gap-1.5 text-terminal-muted hover:text-terminal-green
                   transition-colors text-sm mb-10 font-mono group">
        <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        cd ..
      </Link>

      <div className="flex gap-10 items-start">
        <article className="flex-1 min-w-0">

          {blog.meta.thumbnail && (
            <div className="relative rounded-xl overflow-hidden mb-8 border border-terminal-green/20 h-64 md:h-72">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={blog.meta.thumbnail} alt={blog.meta.title}
                className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-terminal-bg/95 via-terminal-bg/30 to-transparent" />
            </div>
          )}

          <header className="mb-10">
            <div className="text-terminal-green text-xs font-mono mb-3 opacity-70">
              ~/tech/blog/{slug}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-terminal-text leading-tight mb-5">
              {blog.meta.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-terminal-muted mb-4">
              {formattedDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} className="text-terminal-green" />
                  {formattedDate}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock size={12} className="text-terminal-green" />
                {blog.readingTime}
              </span>
            </div>

            {blog.meta.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {blog.meta.tags.map(tag => (
                  <span key={tag}
                    className="text-xs px-2.5 py-0.5 rounded-full border border-terminal-cyan/30
                               text-terminal-cyan font-mono">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="prose-terminal">
            <MDXRemote
              source={blog.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
              components={techMdxComponents}
            />
          </div>
        </article>

        <TOC headings={headings} />
      </div>
    </div>
  )
}
