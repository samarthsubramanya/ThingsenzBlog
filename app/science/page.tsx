import { getAllBlogs } from '@/lib/blog'
import { ScienceTabs } from '@/components/science-tabs'
import { Atom } from 'lucide-react'

export default function ScienceHome() {
  const blogs = getAllBlogs('science')

  const techniques    = blogs.filter(b => b.subcategory === 'techniques')
  const digest        = blogs.filter(b => b.subcategory === 'digest')
  const uncategorised = blogs.filter(b => !b.subcategory)

  return (
    <div className="max-w-5xl mx-auto px-4 py-14 font-sans">

      {/* ── Hero ── */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-mono mb-5 text-science-muted">
          <Atom size={12} className="text-science-primary" />
          <span>~/thingsenz/science</span>
          <span className="text-science-text ml-1">
            — {blogs.length} article{blogs.length !== 1 ? 's' : ''}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-science-text leading-tight mb-4">
          Science Blog —{' '}
          <span className="text-science-primary glow-blue">ThingSenz</span>
        </h1>

        <p className="text-science-muted text-lg max-w-2xl">
          Chemical engineering, materials science, and research — broken down into plain language.
        </p>
      </div>

      {/* ── Tabs (client component) ── */}
      <ScienceTabs
        techniques={techniques}
        digest={digest}
        uncategorised={uncategorised}
      />
    </div>
  )
}
