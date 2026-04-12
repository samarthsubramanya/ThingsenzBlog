import { Atom, Instagram, Mail, Github } from 'lucide-react'

export function ScienceFooter() {
  return (
    <footer className="border-t border-science-border bg-science-surface/40 mt-20 font-sans">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Social bar */}
        <div className="flex items-center justify-between py-3 border-b border-science-border mb-8">
          <span className="text-science-muted text-xs font-mono">
            <span className="text-science-primary">⬡</span> connect --social
          </span>
          <div className="flex items-center gap-5">
            {[
              { href: 'https://www.instagram.com/thingsenz/?hl=en', Icon: Instagram, label: 'Instagram' },
              { href: 'https://thingsenz.github.io/', Icon: Github, label: 'GitHub' },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="text-science-muted hover:text-science-primary transition-colors">
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Atom size={15} className="text-science-primary" />
              <h3 className="text-science-primary font-bold tracking-wide text-sm">ThingSenz India</h3>
            </div>
            <p className="text-science-muted text-sm leading-relaxed">
              A group of tech enthusiasts exploring interdomain projects, from our undergraduate days.
            </p>
          </div>

          <div>
            <h4 className="text-science-text text-xs font-semibold mb-3 uppercase tracking-widest">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-science-muted">

              <p className="flex items-center gap-2">
                <Mail size={13} className="text-science-primary shrink-0" />
                <a href="mailto:thingsenz@gmail.com" className="hover:text-science-primary transition-colors">
                  thingsenz@gmail.com
                </a>
              </p>

            </div>
          </div>
        </div>

        <div className="border-t border-science-border pt-5 text-center">
          <p className="text-science-muted text-xs font-mono">
            c {new Date().getFullYear()} thingsenz — All rights reserved. Hosted on Vercel
          </p>
        </div>
      </div>
    </footer>
  )
}
