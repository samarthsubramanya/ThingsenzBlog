import Link from 'next/link'
import { Atom } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { SearchDialog } from './search-dialog'

export function ScienceHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-science-border/60
                       bg-science-bg/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/science" className="flex items-center gap-2 group">
          <Atom size={19} className="text-science-primary group-hover:text-science-accent transition-colors" />
          <span className="font-bold text-base tracking-wide text-science-text group-hover:text-science-primary transition-colors font-sans">
            ThingSenz<span className="text-science-accent">.science</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <SearchDialog category="science" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
