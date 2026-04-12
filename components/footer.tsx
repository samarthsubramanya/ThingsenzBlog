import { Terminal, Instagram, Mail, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-terminal-green/20 bg-terminal-surface/30 mt-20">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Social bar */}
        <div className="flex items-center justify-between py-3 border-b border-terminal-border mb-8">
          <span className="text-terminal-muted text-xs font-mono">
            <span className="text-terminal-green">$</span> connect --social
          </span>
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/thingsenz/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-terminal-muted hover:text-terminal-green transition-colors"
            >
              <Instagram size={17} />
            </a>

            <a
              href="https://thingsenz.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-terminal-muted hover:text-terminal-green transition-colors"
            >
              <Github size={17} />
            </a>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Terminal size={15} className="text-terminal-green" />
              <h3 className="text-terminal-green font-bold tracking-wide text-sm">
                ThingSenz
              </h3>
            </div>
            <p className="text-terminal-muted text-sm leading-relaxed">
              A group of tech enthusiasts exploring interdomain projects, from our undergraduate days.
            </p>
          </div>

          <div>
            <h4 className="text-terminal-text text-xs font-semibold mb-3 uppercase tracking-widest font-mono">
              <span className="text-terminal-green">~/</span>contact
            </h4>
            <div className="space-y-2 text-sm text-terminal-muted">

              <p className="flex items-center gap-2">
                <Mail size={13} className="text-terminal-green shrink-0" />
                <a
                  href="mailto:thingsenz@gmail.com"
                  className="hover:text-terminal-green transition-colors"
                >
                  thingsenz@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-terminal-border pt-5 text-center">
          <p className="text-terminal-muted text-xs font-mono">
            <span className="text-terminal-green">c</span>{' '}
            {new Date().getFullYear()} thingsenz — All rights reserved. Hosted on Vercel
          </p>
        </div>
      </div>
    </footer>
  )
}
