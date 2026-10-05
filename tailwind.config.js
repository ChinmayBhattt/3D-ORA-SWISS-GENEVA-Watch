/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#050507',
          900: '#0a0a0f',
          850: '#101018',
          800: '#161622',
          700: '#232336',
        },
        gold: {
          100: '#fbf7ee',
          200: '#f5ecd5',
          300: '#eddca9',
          400: '#dfc476',
          500: '#cfab48',
          600: '#b89033',
          700: '#946f26',
        },
        platinum: {
          300: '#e2e8f0',
          400: '#cbd5e1',
          500: '#94a3b8',
        }
      },
      fontFamily: {
        serif: ['Cinzel', '"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest: '.25em',
        ultra: '.35em',
      },
      boxShadow: {
        'glow-gold': '0 0 35px -5px rgba(207, 171, 72, 0.25)',
        'glow-radial': '0 0 80px 20px rgba(207, 171, 72, 0.08)',
      }
    },
  },
  plugins: [],
}
