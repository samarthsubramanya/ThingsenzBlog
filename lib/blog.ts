import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { BlogMeta, BlogInfo, Heading, BlogCategory } from '@/types/blog'

const blogsDir = path.join(process.cwd(), 'blogs')

export function getAllBlogs(category?: BlogCategory): BlogMeta[] {
  const categories: BlogCategory[] = category ? [category] : ['tech', 'science']
  const all: BlogMeta[] = []

  for (const cat of categories) {
    const dir = path.join(blogsDir, cat)
    if (!fs.existsSync(dir)) continue

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))

    for (const file of files) {
      const raw = fs.readFileSync(path.join(dir, file)).toString()
      const { data, content } = matter(raw)
      const stats = readingTime(content)

      all.push({
        title: data.title || '',
        description: data.description || '',
        thumbnail: data.thumbnail || '',
        tags: data.tags || [],
        date: data.date || '',
        slug: file.replace('.mdx', ''),
        category: cat,
        readingTime: stats.text,
        subcategory: data.subcategory,
      })
    }
  }

  return all.sort((a, b) => {
    if (!a.date || !b.date) return 0
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getBlogBySlug(slug: string, category: BlogCategory): BlogInfo {
  const filePath = path.join(blogsDir, category, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath).toString()
  const { data, content } = matter(raw)
  const stats = readingTime(content)

  return {
    meta: {
      title: data.title || '',
      description: data.description || '',
      thumbnail: data.thumbnail || '',
      tags: data.tags || [],
      date: data.date || '',
      slug,
      category,
      readingTime: stats.text,
      subcategory: data.subcategory,
    },
    content,
    readingTime: stats.text,
  }
}

export function getAllSlugs(category: BlogCategory): string[] {
  const dir = path.join(blogsDir, category)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter(f => f.endsWith('.mdx')).map(f => f.replace('.mdx', ''))
}

export function extractHeadings(content: string): Heading[] {
  const regex = /^(#{1,6})\s+(.+)$/gm
  const headings: Heading[] = []
  let match: RegExpExecArray | null

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim().replace(/`[^`]*`/g, s => s.slice(1, -1))
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    headings.push({ id, text, level })
  }

  return headings
}
