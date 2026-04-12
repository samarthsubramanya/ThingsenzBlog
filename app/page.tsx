import Link from 'next/link'
import { Terminal, Atom } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row font-mono">

      {/* ── TECH panel ── */}
      <Link
        href="/tech"
        className="group relative flex-1 flex flex-col items-center justify-center
                   min-h-[50vh] md:min-h-screen px-10 py-16
                   bg-[rgb(10_10_15)] overflow-hidden
                   transition-all duration-500 hover:flex-[1.35]"
      >
        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)'
          }}
        />

        {/* Glow backdrop */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,136,0.06) 0%, transparent 70%)' }}
        />

        {/* Content */}
        <div className="relative z-10 text-center max-w-sm">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-xl
                          border border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.06)]
                          group-hover:border-[rgba(0,255,136,0.7)] group-hover:bg-[rgba(0,255,136,0.12)]
                          transition-all duration-300">
            <Terminal size={28} style={{ color: '#00ff88' }} />
          </div>

          <p className="text-xs mb-3 font-mono" style={{ color: 'rgba(0,255,136,0.6)' }}>
            <span className="animate-cursor-blink">▮</span> ~/thingsenz/tech
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight" style={{ color: '#e2e8f0' }}>
            Tech
          </h2>

          <p className="text-sm mb-8 leading-relaxed" style={{ color: 'rgba(107,114,128,1)' }}>
            IoT, embedded systems, code, and hardware projects.
          </p>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded border text-sm font-mono
                          transition-all duration-300"
            style={{
              borderColor: 'rgba(0,255,136,0.3)',
              color: '#00ff88',
              background: 'rgba(0,255,136,0.05)',
            }}
          >
            Explore Tech
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </div>
        </div>

        {/* Corner decoration */}
        <div className="absolute bottom-4 right-4 text-[10px] font-mono"
          style={{ color: 'rgba(0,255,136,0.25)' }}>
          [root@thingsenz ~]$
        </div>
      </Link>

      {/* ── Divider ── */}
      <div className="hidden md:block w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(100,130,200,0.3), transparent)' }}
      />
      <div className="md:hidden h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(100,130,200,0.3), transparent)' }}
      />

      {/* ── SCIENCE panel ── */}
      <Link
        href="/science"
        className="group relative flex-1 flex flex-col items-center justify-center
                   min-h-[50vh] md:min-h-screen px-10 py-16
                   overflow-hidden transition-all duration-500 hover:flex-[1.35]"
        style={{ backgroundColor: 'rgb(5 10 28)' }}
      >
        {/* Graph paper grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(20,40,85,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(20,40,85,0.55) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        {/* Glow backdrop */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(56,139,253,0.08) 0%, transparent 70%)' }}
        />

        {/* Content */}
        <div className="relative z-10 text-center max-w-sm font-sans">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-xl
                          border transition-all duration-300"
            style={{
              borderColor: 'rgba(56,139,253,0.3)',
              background: 'rgba(56,139,253,0.06)',
            }}>
            <Atom size={28} style={{ color: '#388bfd' }} />
          </div>

          <p className="text-xs mb-3 font-mono" style={{ color: 'rgba(56,139,253,0.6)' }}>
            ⬡ ~/thingsenz/science
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight" style={{ color: 'rgb(220,232,255)' }}>
            Science
          </h2>

          <p className="text-sm mb-8 leading-relaxed" style={{ color: 'rgba(100,130,175,1)' }}>
            Chemical engineering, materials science, and research.
          </p>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded border text-sm
                          transition-all duration-300"
            style={{
              borderColor: 'rgba(56,139,253,0.3)',
              color: '#388bfd',
              background: 'rgba(56,139,253,0.05)',
            }}
          >
            Explore Science
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </div>
        </div>

        {/* Corner decoration */}
        <div className="absolute bottom-4 right-4 text-[10px] font-mono"
          style={{ color: 'rgba(56,139,253,0.25)' }}>
          element: 119 | Uue
        </div>
      </Link>
    </div>
  )
}
