import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MDX Editor | ThingSenz',
  description: 'Write and preview MDX posts for ThingSenz Blog.',
}

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  // Bare layout — no site header/footer, just font variables from root layout
  return <>{children}</>
}
