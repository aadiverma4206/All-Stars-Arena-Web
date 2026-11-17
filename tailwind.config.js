/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sport: {
          50: '#f0fdf4',
          100: '#dcfce7',
          400: '#4ade80',
          500: '#22c55e', // Vibrant Footy Sport Green
          600: '#16a34a',
          700: '#15803d',
        },
        accent: {
          400: '#fbbf24',
          500: '#f59e0b', // Energetic Tournament Orange/Yellow
          600: '#d97706',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#0f4538', // Subtle dark emerald border
          800: '#09332a', // Elevated dark emerald border & container
          850: '#06241e', // Intermediate dark surface
          900: '#031c17', // Elevated card / navbar surface
          950: '#011410', // User's exact dark mode background color!
        },
        darkbg: {
          base: '#011410',
          surface: '#031c17',
          card: '#06241e',
          border: '#09332a'
        },
        lightbg: {
          base: '#f8fafc',
          surface: '#ffffff',
          card: '#ffffff',
          border: '#e2e8f0'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card-light': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 2px 6px -1px rgba(0, 0, 0, 0.2)',
        'sport-glow': '0 0 20px -3px rgba(34, 197, 94, 0.3)',
      }
    },
  },
  plugins: [],
}
