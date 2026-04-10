import { NextResponse } from 'next/server'
import { getAllBlogs } from '@/lib/blog'
import type { BlogCategory } from '@/types/blog'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') as BlogCategory | null

  const blogs = getAllBlogs(category ?? undefined)
  return NextResponse.json(blogs)
}
