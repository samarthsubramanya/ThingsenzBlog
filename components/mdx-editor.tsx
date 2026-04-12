'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { marked } from 'marked'
import Link from 'next/link'
import {
  Heading1, Heading2, Heading3,
  Bold, Italic, Strikethrough,
  Code, SquareCode,
  List, ListOrdered, Quote,
  Link as LinkIcon, Image as ImageIcon,
  Minus, Table,
  Download, RotateCcw, Check, ArrowLeft,
  ChevronDown, ChevronUp,
  Columns2, PanelLeft,
  FlaskConical, Cpu,
} from 'lucide-react'
import type { BlogCategory } from '@/types/blog'

// ─── Types ───────────────────────────────────────────────
interface EditorState {
  title: string
  description: string
  tags: string
  date: string
  thumbnail: string
  category: BlogCategory
  subcategory: string
  body: string
}

const STORAGE_KEY = 'thingsenz-mdx-editor'

const DEFAULT_STATE: EditorState = {
  title: '',
  description: '',
  tags: '',
  date: new Date().toISOString().split('T')[0],
  thumbnail: '',
  category: 'tech',
  subcategory: '',
  body: '',
}

// ─── Toolbar definition ───────────────────────────────────
interface ToolItem {
  Icon: React.ElementType
  label: string
  shortcut?: string
  /** {s} = selected text or placeholder */
  wrap?: [string, string]
  /** Full replacement (no selection used) */
  block?: string
  placeholder?: string
}

const TOOLBAR: Array<ToolItem[] | 'sep'> = [
  [
    { Icon: Heading1, label: 'Heading 1', wrap: ['# ', ''], placeholder: 'Heading' },
    { Icon: Heading2, label: 'Heading 2', wrap: ['## ', ''], placeholder: 'Heading' },
    { Icon: Heading3, label: 'Heading 3', wrap: ['### ', ''], placeholder: 'Heading' },
  ],
  'sep',
  [
    { Icon: Bold,          label: 'Bold',          shortcut: '⌘B', wrap: ['**', '**'], placeholder: 'bold' },
    { Icon: Italic,        label: 'Italic',        shortcut: '⌘I', wrap: ['*',  '*'],  placeholder: 'italic' },
    { Icon: Strikethrough, label: 'Strikethrough',              wrap: ['~~', '~~'], placeholder: 'text' },
  ],
  'sep',
  [
    { Icon: Code,       label: 'Inline code', wrap: ['`', '`'], placeholder: 'code' },
    { Icon: SquareCode, label: 'Code block',  block: '\n```js\n// your code here\n```\n' },
  ],
  'sep',
  [
    { Icon: List,        label: 'Bullet list',    wrap: ['- ', ''], placeholder: 'list item' },
    { Icon: ListOrdered, label: 'Numbered list',  wrap: ['1. ', ''], placeholder: 'list item' },
    { Icon: Quote,       label: 'Blockquote',     wrap: ['> ', ''], placeholder: 'quoted text' },
  ],
  'sep',
  [
    { Icon: LinkIcon,  label: 'Link',         block: '[link text](https://)', },
    { Icon: ImageIcon, label: 'Image',        block: '![alt text](https://)', },
    { Icon: Minus,     label: 'Divider',      block: '\n---\n' },
    { Icon: Table,     label: 'Table',        block: '\n| Column 1 | Column 2 | Column 3 |\n|---|---|---|\n| Cell | Cell | Cell |\n' },
  ],
]

// ─── Helpers ─────────────────────────────────────────────
function applyTool(
  ta: HTMLTextAreaElement,
  item: ToolItem,
  setValue: (v: string) => void,
) {
  const start = ta.selectionStart
  const end   = ta.selectionEnd
  const before = ta.value.slice(0, start)
  const after  = ta.value.slice(end)
  const selected = ta.value.slice(start, end)

  let insert: string
  let cursorOffset: number

  if (item.block) {
    insert = item.block
    cursorOffset = start + insert.length
  } else if (item.wrap) {
    const [pre, post] = item.wrap
    const text = selected || item.placeholder || ''
    insert = pre + text + post
    cursorOffset = start + insert.length
  } else return

  const newValue = before + insert + after
  setValue(newValue)

  requestAnimationFrame(() => {
    ta.focus()
    ta.setSelectionRange(cursorOffset, cursorOffset)
  })
}

function buildMdx(state: EditorState): string {
  const tags = state.tags
    .split(',')
    .map(t => t.trim())
    .filter(Boolean)

  const lines = [
    '---',
    `title: "${state.title}"`,
    `description: "${state.description}"`,
    tags.length ? `tags: [${tags.join(', ')}]` : null,
    state.date ? `date: ${state.date}` : null,
    state.thumbnail ? `thumbnail: ${state.thumbnail}` : null,
    state.subcategory ? `subcategory: ${state.subcategory}` : null,
    '---',
    '',
    state.body,
  ]

  return lines.filter(l => l !== null).join('\n')
}

// ─── Main component ───────────────────────────────────────
export function MdxEditor() {
  const [state, setState] = useState<EditorState>(DEFAULT_STATE)
  const [metaOpen, setMetaOpen] = useState(true)
  const [preview, setPreview] = useState('')
  const [showPreview, setShowPreview] = useState(true)
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const [justSaved, setJustSaved] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Load from localStorage on mount ──
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as EditorState
        setState(parsed)
      }
    } catch {}
  }, [])

  // ── Auto-save with 600ms debounce ──
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
        setSavedAt(new Date())
        setJustSaved(true)
        setTimeout(() => setJustSaved(false), 2000)
      } catch {}
    }, 600)
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current) }
  }, [state])

  // ── Live preview ──
  useEffect(() => {
    const html = marked.parse(state.body) as string
    setPreview(html)
  }, [state.body])

  const update = useCallback(
    <K extends keyof EditorState>(key: K, val: EditorState[K]) =>
      setState(prev => ({ ...prev, [key]: val })),
    [],
  )

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = e.currentTarget
    if (e.key === 'Tab') {
      e.preventDefault()
      const s = ta.selectionStart
      const newVal = ta.value.slice(0, s) + '  ' + ta.value.slice(ta.selectionEnd)
      update('body', newVal)
      requestAnimationFrame(() => ta.setSelectionRange(s + 2, s + 2))
      return
    }
    if (e.metaKey || e.ctrlKey) {
      const map: Record<string, ToolItem> = {
        b: { Icon: Bold, label: '', wrap: ['**', '**'], placeholder: 'bold' },
        i: { Icon: Italic, label: '', wrap: ['*', '*'], placeholder: 'italic' },
        k: { Icon: LinkIcon, label: '', block: '[link text](https://)' },
      }
      const item = map[e.key]
      if (item) {
        e.preventDefault()
        applyTool(ta, item, v => update('body', v))
      }
    }
  }, [update])

  const handleClear = useCallback(() => {
    if (!confirm('Clear the editor? This cannot be undone.')) return
    setState(DEFAULT_STATE)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const handleDownload = useCallback(() => {
    const content = buildMdx(state)
    const slug = (state.title || 'untitled').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const blob = new Blob([content], { type: 'text/markdown' })
    const url  = URL.createObjectURL(blob)
    const a    = Object.assign(document.createElement('a'), { href: url, download: `${slug}.mdx` })
    a.click()
    URL.revokeObjectURL(url)
  }, [state])

  const isTech = state.category === 'tech'
  const accentCls    = isTech ? 'text-terminal-green'            : 'text-science-primary'
  const borderCls    = isTech ? 'border-terminal-green/25'       : 'border-science-border'
  const activeBtnCls = isTech ? 'bg-terminal-green/15 text-terminal-green border-terminal-green/40'
                               : 'bg-science-primary/15 text-science-primary border-science-primary/40'
  const btnCls = `p-1.5 rounded border border-transparent text-[#9ca3af] hover:text-white
                  hover:bg-white/8 transition-all duration-150`

  const wordCount = state.body.trim() ? state.body.trim().split(/\s+/).length : 0
  const charCount = state.body.length

  return (
    <div className="h-screen flex flex-col bg-[#0a0a10] text-[#e2e8f0] font-mono overflow-hidden">

      {/* ── Top bar ── */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-[#1e1e2e] bg-[#0d0d18] shrink-0">
        <Link href="/" className="text-[#6b7280] hover:text-white transition-colors mr-1">
          <ArrowLeft size={15} />
        </Link>

        <span className="text-sm font-semibold text-white tracking-wide">
          MDX Editor
        </span>

        <span className={`text-xs ${accentCls} opacity-60`}>
          {state.title || 'untitled'}
        </span>

        <div className="ml-auto flex items-center gap-2">
          {/* Category toggle */}
          <div className="flex items-center rounded border border-[#1e1e2e] overflow-hidden text-xs">
            {(['tech', 'science'] as BlogCategory[]).map(cat => (
              <button
                key={cat}
                onClick={() => { update('category', cat); update('subcategory', '') }}
                className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
                  state.category === cat
                    ? (cat === 'tech' ? 'bg-terminal-green/15 text-terminal-green' : 'bg-science-primary/15 text-science-primary')
                    : 'text-[#6b7280] hover:text-white'
                }`}
              >
                {cat === 'tech' ? <Cpu size={11} /> : <FlaskConical size={11} />}
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Preview toggle (mobile / preference) */}
          <button
            onClick={() => setShowPreview(v => !v)}
            title={showPreview ? 'Hide preview' : 'Show preview'}
            className={`${btnCls} hidden md:flex`}
          >
            <Columns2 size={14} />
          </button>

          {/* Save status */}
          <span className={`text-xs transition-opacity duration-300 ${justSaved ? 'opacity-100' : 'opacity-0'}`}>
            <span className="flex items-center gap-1 text-emerald-400">
              <Check size={11} /> Saved
            </span>
          </span>

          {/* Clear */}
          <button onClick={handleClear} title="Clear editor" className={btnCls}>
            <RotateCcw size={14} />
          </button>

          {/* Download */}
          <button
            onClick={handleDownload}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs
                        transition-all duration-150 ${activeBtnCls}`}
          >
            <Download size={12} /> Download .mdx
          </button>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className={`flex items-center gap-0.5 px-3 py-1.5 border-b ${borderCls} bg-[#0d0d18] shrink-0 overflow-x-auto`}>
        {TOOLBAR.map((group, gi) =>
          group === 'sep' ? (
            <div key={`sep-${gi}`} className="w-px h-4 bg-[#1e1e2e] mx-1 shrink-0" />
          ) : (
            group.map(item => (
              <button
                key={item.label}
                title={item.shortcut ? `${item.label} (${item.shortcut})` : item.label}
                onClick={() => {
                  if (textareaRef.current) {
                    applyTool(textareaRef.current, item, v => update('body', v))
                  }
                }}
                className={`${btnCls} shrink-0`}
              >
                <item.Icon size={14} />
              </button>
            ))
          )
        )}
      </div>

      {/* ── Main panes ── */}
      <div className="flex flex-1 min-h-0">

        {/* Left — editor */}
        <div className={`flex flex-col border-r border-[#1e1e2e] min-h-0 ${showPreview ? 'w-1/2' : 'flex-1'}`}>

          {/* Metadata panel */}
          <div className="border-b border-[#1e1e2e] shrink-0">
            <button
              onClick={() => setMetaOpen(v => !v)}
              className="w-full flex items-center justify-between px-4 py-2 text-xs text-[#6b7280]
                         hover:text-white hover:bg-white/4 transition-colors"
            >
              <span className={`font-semibold uppercase tracking-widest ${accentCls}`}>
                Frontmatter
              </span>
              {metaOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            {metaOpen && (
              <div className="px-4 pb-4 space-y-2.5 bg-[#0d0d18]">
                <Field label="Title"       value={state.title}       onChange={v => update('title', v)} />
                <Field label="Description" value={state.description} onChange={v => update('description', v)} />
                <Field label="Tags"        value={state.tags}        onChange={v => update('tags', v)} placeholder="iot, embedded, intro" />
                <Field label="Thumbnail"   value={state.thumbnail}   onChange={v => update('thumbnail', v)} placeholder="https://..." />
                <div className="flex gap-2">
                  <Field label="Date" value={state.date} onChange={v => update('date', v)} type="date" className="flex-1" />
                  {state.category === 'science' && (
                    <div className="flex-1">
                      <label className="block text-[10px] text-[#6b7280] uppercase tracking-widest mb-1">
                        Subcategory
                      </label>
                      <select
                        value={state.subcategory}
                        onChange={e => update('subcategory', e.target.value)}
                        className="w-full bg-[#111118] border border-[#1e1e2e] rounded px-2 py-1.5
                                   text-xs text-[#e2e8f0] outline-none focus:border-science-primary/50"
                      >
                        <option value="">— none —</option>
                        <option value="techniques">Techniques &amp; Instruments</option>
                        <option value="digest">Research Digest</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={state.body}
            onChange={e => update('body', e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={'# Your post title\n\nStart writing here...\n\nUse the toolbar above or keyboard shortcuts:\n  ⌘B bold  ⌘I italic  ⌘K link\n  Tab → 2 spaces'}
            spellCheck
            className="flex-1 resize-none bg-[#0a0a10] text-[#e2e8f0] font-mono text-sm
                       leading-relaxed px-5 py-4 outline-none placeholder-[#3a3a4a]
                       selection:bg-emerald-500/20 selection:text-emerald-300"
          />

          {/* Footer */}
          <div className="px-4 py-1.5 border-t border-[#1e1e2e] bg-[#0d0d18] flex items-center
                          gap-4 text-[10px] text-[#6b7280] font-mono shrink-0">
            <span>{wordCount} words</span>
            <span>{charCount} chars</span>
            {savedAt && (
              <span className="ml-auto opacity-60">
                saved {savedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
        </div>

        {/* Right — preview */}
        {showPreview && (
          <div className={`flex-1 flex flex-col min-h-0 ${isTech ? 'bg-terminal-bg' : 'bg-science-bg'}`}>
            <div className={`px-4 py-2 border-b text-[10px] font-mono uppercase tracking-widest shrink-0
                             ${isTech ? 'border-terminal-green/20 text-terminal-green/60 bg-terminal-surface/50'
                                      : 'border-science-border text-science-primary/60 bg-science-surface/50'}`}>
              Preview — {isTech ? 'Tech theme' : 'Science theme'}
            </div>
            <div className={`flex-1 overflow-y-auto px-8 py-6 ${isTech ? 'prose-terminal' : 'prose-science font-sans'}`}>
              {preview
                ? <div dangerouslySetInnerHTML={{ __html: preview }} />
                : <p className={`text-sm italic ${isTech ? 'text-terminal-muted' : 'text-science-muted'}`}>
                    Nothing to preview yet — start typing in the editor.
                  </p>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Small field component ────────────────────────────────
interface FieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  className?: string
}

function Field({ label, value, onChange, placeholder, type = 'text', className = '' }: FieldProps) {
  return (
    <div className={className}>
      <label className="block text-[10px] text-[#6b7280] uppercase tracking-widest mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#111118] border border-[#1e1e2e] rounded px-2 py-1.5
                   text-xs text-[#e2e8f0] placeholder-[#3a3a4a] outline-none
                   focus:border-[#388bfd]/50 transition-colors"
      />
    </div>
  )
}
