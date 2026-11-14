/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        shield: {
          950: '#080B10', // Deepest background
          900: '#0D1117', // Main background
          850: '#111620', // Card surface
          800: '#161D2A', // Elevated surface
          750: '#1C2536', // Hover surface
          700: '#232E42', // Border dark
          600: '#2F3E58', // Border subtle
          border: '#1F293D',
          'border-light': '#2A364F',
          text: '#F1F5F9',
          muted: '#94A3B8',
          dim: '#64748B',
        },
        security: {
          safe: '#10B981',       // Emerald
          'safe-light': '#34D399',
          'safe-dark': '#059669',
          'safe-bg': 'rgba(16, 185, 129, 0.1)',
          'safe-border': 'rgba(16, 185, 129, 0.25)',
          warning: '#F59E0B',    // Amber
          'warning-light': '#FBBF24',
          'warning-dark': '#D97706',
          'warning-bg': 'rgba(245, 158, 11, 0.1)',
          'warning-border': 'rgba(245, 158, 11, 0.25)',
          danger: '#EF4444',     // Red
          'danger-light': '#F87171',
          'danger-dark': '#DC2626',
          'danger-bg': 'rgba(239, 68, 68, 0.1)',
          'danger-border': 'rgba(239, 68, 68, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
