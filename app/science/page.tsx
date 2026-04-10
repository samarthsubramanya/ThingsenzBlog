import { getAllBlogs } from '@/lib/blog'
import { ScienceBlogCard } from '@/components/science-blog-card'
import { Atom } from 'lucide-react'

export default function ScienceHome() {
  const blogs = getAllBlogs('science')

  return (
    <div className="max-w-5xl mx-auto px-4 py-14 font-sans">

      {/* Hero */}
      <div className="mb-14">
        <div className="flex items-center gap-2 text-xs font-mono mb-5 text-science-muted">
          <Atom size={12} className="text-science-primary" />
          <span>~/thingsenz/science</span>
          <span className="text-science-text ml-1">— {blogs.length} publication{blogs.length !== 1 ? 's' : ''}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-science-text leading-tight mb-4">
          Science Blog —{' '}
          <span className="text-science-primary glow-blue">ThingSenz</span>
        </h1>

        <p className="text-science-muted text-lg max-w-xl">
          Chemistry, physics, materials science, and research insights.
        </p>

        <div className="flex items-center gap-6 mt-6 text-xs text-science-muted
                        border-t border-science-border pt-4">
          <span><span className="text-science-primary">{blogs.length}</span> articles</span>
          <span>field: <span className="text-science-primary">physical sciences</span></span>
        </div>
      </div>

      {/* Grid */}
      {blogs.length === 0 ? (
        <p className="text-center py-24 text-science-muted font-mono text-sm">
          No articles yet. Add .mdx files to /blogs/science/
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map(blog => (
            <ScienceBlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}
