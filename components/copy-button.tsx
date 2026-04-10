'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import * as Tooltip from '@radix-ui/react-tooltip'

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={handleCopy}
            aria-label="Copy code"
            className="p-1.5 rounded bg-terminal-border/60 text-terminal-muted
                       hover:text-terminal-green hover:bg-terminal-green/10
                       transition-colors duration-150"
          >
            {copied
              ? <Check size={11} className="text-terminal-green" />
              : <Copy size={11} />
            }
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="left"
            className="bg-terminal-surface border border-terminal-border text-terminal-text
                       text-xs px-2 py-1 rounded shadow-lg z-50"
          >
            {copied ? 'Copied!' : 'Copy'}
            <Tooltip.Arrow className="fill-terminal-border" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
