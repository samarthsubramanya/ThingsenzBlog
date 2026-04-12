export type BlogCategory = 'tech' | 'science'
export type ScienceSubcategory = 'techniques' | 'digest'

export interface BlogMeta {
  title: string
  slug: string
  category: BlogCategory
  description: string
  thumbnail: string
  tags: string[]
  date?: string
  readingTime?: string
  subcategory?: ScienceSubcategory
}

export interface BlogInfo {
  meta: BlogMeta
  content: string
  readingTime: string
}

export interface Heading {
  id: string
  text: string
  level: number
}
