/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // macOS separator
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // macOS blue
        background: 'var(--color-background)', // pure white
        foreground: 'var(--color-foreground)', // macOS text
        primary: {
          DEFAULT: 'var(--color-primary)', // macOS blue
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // macOS purple
          foreground: 'var(--color-secondary-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // macOS red
          foreground: 'var(--color-destructive-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // macOS background gray
          foreground: 'var(--color-muted-foreground)', // macOS secondary text
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // macOS orange
          foreground: 'var(--color-accent-foreground)', // white
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)', // macOS text
        },
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)', // macOS text
        },
        success: {
          DEFAULT: 'var(--color-success)', // macOS green
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // macOS yellow
          foreground: 'var(--color-warning-foreground)', // dark text
        },
        error: {
          DEFAULT: 'var(--color-error)', // macOS red
          foreground: 'var(--color-error-foreground)', // white
        },
        surface: 'var(--color-surface)', // white
        'text-primary': 'var(--color-text-primary)', // macOS primary text
        'text-secondary': 'var(--color-text-secondary)', // macOS secondary text
        // macOS specific colors
        'macos': {
          'gray-1': 'var(--color-macos-gray-1)', // #F5F5F7
          'gray-2': 'var(--color-macos-gray-2)', // #E5E5E7
          'gray-3': 'var(--color-macos-gray-3)', // #D2D2D7
          'gray-4': 'var(--color-macos-gray-4)', // #8E8E93
          'blue': '#007AFF',
          'purple': '#5856D6',
          'green': '#34C759',
          'orange': '#FF9500',
          'red': '#FF3B30',
          'yellow': '#FFCC00',
        },
      },
      fontFamily: {
        sans: ['SF Pro Text', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['SF Pro Display', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['SF Mono', 'JetBrains Mono', 'Monaco', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0em' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.02em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.03em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'macos': '12px',
        'macos-lg': '16px',
        'macos-xl': '20px',
      },
      animation: {
        'fade-in': 'fadeIn 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'slide-in': 'slideIn 400ms cubic-bezier(0.175, 0.885, 0.32, 1)',
        'slide-up': 'slideUp 350ms cubic-bezier(0.23, 1, 0.32, 1)',
        'scale-in': 'scaleIn 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'spring': 'spring 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-16px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        spring: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'elevation-2': '0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.02)',
        'elevation-3': '0 12px 32px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04)',
        'macos': '0 2px 16px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)',
        'macos-hover': '0 4px 24px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}