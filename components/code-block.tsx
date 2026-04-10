'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { CopyButton } from './copy-button'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface CodeBlockProps {
  language: string
  code: string
  variant: 'tech' | 'science'
}

export function CodeBlock({ language, code, variant }: CodeBlockProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = !mounted || theme === 'dark'

  const isTech = variant === 'tech'

  const borderColor = isTech ? 'rgba(0,255,136,0.2)' : 'rgba(56,139,253,0.25)'
  const barBg = isDark
    ? (isTech ? 'rgb(17 17 24)' : 'rgb(10 18 48)')
    : (isTech ? 'rgb(240 240 235)' : 'rgb(240 245 255)')
  const langColor = isTech ? '#00ff88' : '#388bfd'
  const codeBg = isDark ? '#0d1117' : (isTech ? '#f6f8fa' : '#f0f5ff')

  return (
    <div className="relative my-6 rounded-xl overflow-hidden shadow-lg shadow-black/30"
      style={{ border: `1px solid ${borderColor}` }}
    >
      {/* Bar */}
      <div className="flex items-center justify-between px-4 py-2"
        style={{ background: barBg, borderBottom: `1px solid ${borderColor}` }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: langColor }}>
          {language}
        </span>
        <CopyButton text={code} />
      </div>

      {/* Code */}
      <SyntaxHighlighter
        style={isDark ? vscDarkPlus : oneLight}
        language={language}
        PreTag="div"
        showLineNumbers
        lineNumberStyle={{ color: 'rgba(107,114,128,0.45)', fontSize: '0.72rem', minWidth: '2.5rem' }}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: codeBg,
          padding: '1rem 1rem 1rem 0.5rem',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
