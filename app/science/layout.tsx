import { ThemeProvider } from '@/components/theme-provider'
import { ScienceHeader } from '@/components/science-header'
import { ScienceFooter } from '@/components/science-footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Science Blog',
    template: '%s | ThingSenz Science',
  },
  description: 'Chemistry, physics, and materials science — ThingSenz Science Blog.',
}

export default function ScienceLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <div className="science-layout font-sans min-h-screen flex flex-col bg-graph-paper text-science-text">
        <ScienceHeader />
        <main className="flex-1">{children}</main>
        <ScienceFooter />
      </div>
    </ThemeProvider>
  )
}
