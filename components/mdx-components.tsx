import type { MDXComponents } from 'mdx/types'
import { CodeBlock } from './code-block'
import type { BlogCategory } from '@/types/blog'

function makeComponents(variant: BlogCategory): MDXComponents {
  const isTech = variant === 'tech'
  const proseClass = isTech ? 'prose-terminal' : 'prose-science'

  const headingAccent = isTech ? 'text-terminal-green' : 'text-science-primary'
  const headingText   = isTech ? 'text-terminal-text' : 'text-science-text'
  const borderClass   = isTech ? 'border-terminal-green/20' : 'border-science-border'
  const inlineCode    = isTech
    ? 'bg-terminal-surface border border-terminal-green/20 text-terminal-cyan px-1.5 py-0.5 rounded text-[0.82em] font-mono'
    : 'bg-science-surface border border-science-primary/20 text-science-accent px-1.5 py-0.5 rounded text-[0.82em] font-mono'

  return {
    // Suppress the outer <pre> — CodeBlock renders its own
    pre({ children }) {
      return <>{children}</>
    },

    code({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
      const match = /language-(\w+)/.exec(className || '')
      const code = String(children).replace(/\n$/, '')
      if (match) {
        return <CodeBlock language={match[1]} code={code} variant={variant} />
      }
      return (
        <code className={inlineCode} {...props}>
          {children}
        </code>
      )
    },

    h1({ children, id }: React.HTMLAttributes<HTMLHeadingElement>) {
      return (
        <h1 id={id} className={`text-2xl font-bold ${headingText} mt-10 mb-4 pb-2 border-b ${borderClass} scroll-mt-24`}>
          {isTech && <span className={`${headingAccent} mr-2 opacity-70`}>#</span>}
          {children}
        </h1>
      )
    },

    h2({ children, id }: React.HTMLAttributes<HTMLHeadingElement>) {
      return (
        <h2 id={id} className={`text-xl font-bold ${headingText} mt-8 mb-3 pb-2 border-b ${borderClass} scroll-mt-24`}>
          {isTech && <span className={`${headingAccent} mr-2 opacity-70`}>##</span>}
          {!isTech && <span className={`${headingAccent} mr-2`}>§</span>}
          {children}
        </h2>
      )
    },

    h3({ children, id }: React.HTMLAttributes<HTMLHeadingElement>) {
      return (
        <h3 id={id} className={`text-lg font-semibold ${headingText} mt-6 mb-2 scroll-mt-24`}>
          {isTech && <span className={`${headingAccent} mr-2 opacity-70`}>###</span>}
          {children}
        </h3>
      )
    },

    h4({ children, id }: React.HTMLAttributes<HTMLHeadingElement>) {
      return (
        <h4 id={id} className={`text-base font-semibold ${headingText} mt-5 mb-2 scroll-mt-24`}>
          {children}
        </h4>
      )
    },
  }
}

export const techMdxComponents  = makeComponents('tech')
export const scienceMdxComponents = makeComponents('science')
