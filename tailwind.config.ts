import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: 'rgb(var(--terminal-bg) / <alpha-value>)',
          surface: 'rgb(var(--terminal-surface) / <alpha-value>)',
          text: 'rgb(var(--terminal-text) / <alpha-value>)',
          muted: 'rgb(var(--terminal-muted) / <alpha-value>)',
          border: 'rgb(var(--terminal-border) / <alpha-value>)',
          green: 'rgb(var(--terminal-green) / <alpha-value>)',
          cyan: 'rgb(var(--terminal-cyan) / <alpha-value>)',
        },
        science: {
          bg: 'rgb(var(--science-bg) / <alpha-value>)',
          surface: 'rgb(var(--science-surface) / <alpha-value>)',
          text: 'rgb(var(--science-text) / <alpha-value>)',
          muted: 'rgb(var(--science-muted) / <alpha-value>)',
          border: 'rgb(var(--science-border) / <alpha-value>)',
          primary: 'rgb(var(--science-primary) / <alpha-value>)',
          accent: 'rgb(var(--science-accent) / <alpha-value>)',
          grid: 'rgb(var(--science-grid) / <alpha-value>)',
        },
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
