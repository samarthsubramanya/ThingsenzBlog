'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-8 h-8" />

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="p-2 rounded border border-terminal-green/30 text-terminal-green
                 hover:bg-terminal-green/10 hover:border-terminal-green/60
                 transition-all duration-200"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  )
}
