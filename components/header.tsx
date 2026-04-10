import Link from 'next/link'
import { Terminal } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { SearchDialog } from './search-dialog'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-terminal-green/20
                       bg-terminal-bg/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <Terminal
            size={18}
            className="text-terminal-green group-hover:animate-glow transition-all"
          />
          <span className="font-bold text-base tracking-wider text-terminal-text group-hover:text-terminal-green transition-colors">
            ThingSenz<span className="text-terminal-cyan">.blog</span>
          </span>
        </Link>

        {/* Nav actions */}
        <div className="flex items-center gap-2">
          <SearchDialog category="tech" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
