import { getAllBlogs } from '@/lib/blog'
import { BlogCard } from '@/components/blog-card'

export default function TechHome() {
  const blogs = getAllBlogs('tech')

  return (
    <div className="max-w-5xl mx-auto px-4 py-14">

      {/* Hero */}
      <div className="mb-14">
        <div className="flex items-center gap-2 text-xs font-mono mb-5 text-terminal-muted">
          <span className="text-terminal-green animate-cursor-blink">▮</span>
          <span>user@thingsenz:~/tech$</span>
          <span className="text-terminal-text">ls -la ./posts</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-terminal-text leading-tight mb-4">
          Tech Blog —{' '}
          <span className="text-terminal-green glow-green">ThingSenz</span>
        </h1>

        <p className="text-terminal-muted text-lg max-w-xl">
          IoT, embedded systems, hardware, and code — one post at a time.
        </p>

        <div className="flex items-center gap-6 mt-6 text-xs font-mono text-terminal-muted
                        border-t border-terminal-border pt-4">
          <span><span className="text-terminal-green">{blogs.length}</span> posts</span>
          <span>status: <span className="text-terminal-green">active</span></span>
        </div>
      </div>

      {/* Grid */}
      {blogs.length === 0 ? (
        <p className="text-center py-24 text-terminal-muted font-mono">
          <span className="text-terminal-green">$</span> No posts found. Add .mdx files to /blogs/tech/
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map(blog => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}
