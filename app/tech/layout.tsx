import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Tech Blog',
    template: '%s | ThingSenz Tech',
  },
  description: 'IoT, embedded systems, and code — ThingSenz Tech Blog.',
}

export default function TechLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <div className="tech-layout font-mono min-h-screen flex flex-col bg-terminal-bg text-terminal-text">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
