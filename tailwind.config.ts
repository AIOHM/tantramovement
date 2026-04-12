
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				// Sacred Sunset Ceremony palette
				'burgundy': 'hsl(345 55% 28%)',
				'terracotta': 'hsl(18 55% 55%)',
				'cream': 'hsl(38 40% 96%)',
				'rose-gold': 'hsl(15 45% 72%)',
				'warm-charcoal': 'hsl(20 15% 20%)',
				// Legacy colors (mapped to new palette)
				'deep-gold': 'hsl(18 55% 55%)',
				'warm-sand': 'hsl(32 25% 88%)',
				'wine-red': 'hsl(345 55% 28%)',
				'chocolate': 'hsl(20 25% 15%)',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				'display': ['"Cormorant Garamond"', 'Georgia', 'serif'],
				'body': ['"Lora"', 'Georgia', 'serif'],
				// Legacy font mappings
				'playfair': ['"Cormorant Garamond"', 'Georgia', 'serif'],
				'opensans': ['"Lora"', 'Georgia', 'serif'],
				'cormorant': ['"Cormorant Garamond"', 'Georgia', 'serif'],
				'lora': ['"Lora"', 'Georgia', 'serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(8px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-6px)' }
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.95', transform: 'scale(1.01)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(16px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'settle': {
					'0%': { opacity: '0', transform: 'translateY(12px) scale(0.98)' },
					'100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
				},
				'candlelight': {
					'0%, 100%': { opacity: '1' },
					'25%': { opacity: '0.92' },
					'50%': { opacity: '0.98' },
					'75%': { opacity: '0.95' }
				},
				'breathe': {
					'0%, 100%': { transform: 'scale(1)', opacity: '1' },
					'50%': { transform: 'scale(1.02)', opacity: '0.95' }
				},
				'aurora-float': {
					'0%, 100%': { transform: 'translate(-50%, -50%) translate(0, 0) scale(1)' },
					'25%': { transform: 'translate(-50%, -50%) translate(30px, -20px) scale(1.1)' },
					'50%': { transform: 'translate(-50%, -50%) translate(-20px, 30px) scale(0.95)' },
					'75%': { transform: 'translate(-50%, -50%) translate(-30px, -10px) scale(1.05)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '200% 0' },
					'100%': { backgroundPosition: '-200% 0' }
				},
				'tilt': {
					'0%, 100%': { transform: 'rotateY(0deg) rotateX(0deg)' },
					'25%': { transform: 'rotateY(1deg) rotateX(0.5deg)' },
					'75%': { transform: 'rotateY(-1deg) rotateX(-0.5deg)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.3s ease-out',
				'accordion-up': 'accordion-up 0.3s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'float': 'float 8s ease-in-out infinite',
				'pulse-gentle': 'pulse-gentle 4s ease-in-out infinite',
				'slide-up': 'slide-up 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.4s ease-out',
				'settle': 'settle 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
				'candlelight': 'candlelight 4s ease-in-out infinite',
				'breathe': 'breathe 6s ease-in-out infinite',
				'aurora-float': 'aurora-float 20s ease-in-out infinite',
				'shimmer': 'shimmer 8s ease-in-out infinite',
				'tilt': 'tilt 10s ease-in-out infinite',
			},
			boxShadow: {
				'warm': '0 4px 20px -4px hsl(18 55% 55% / 0.15)',
				'ceremony': '0 8px 32px -8px hsl(345 55% 28% / 0.2)',
				'glow': '0 0 40px hsl(15 45% 72% / 0.3)',
			},
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }: { addUtilities: Function }) {
			const newUtilities = {
				'.text-shadow-lg': {
					'text-shadow': '0 2px 12px rgba(20, 15, 10, 0.5), 0 4px 20px rgba(20, 15, 10, 0.3)',
				},
				'.text-shadow-gentle': {
					'text-shadow': '0 1px 8px rgba(20, 15, 10, 0.4)',
				},
				'.glass-morph': {
					'backdrop-filter': 'blur(12px)',
					'background': 'hsl(20 25% 10% / 0.75)',
					'border-bottom': 'none',
					'padding-top': '0.5rem',
					'padding-bottom': '0.5rem',
				},
				'.glass-morph-light': {
					'backdrop-filter': 'blur(8px)',
					'background': 'hsl(38 40% 96% / 0.85)',
				}
			}
			addUtilities(newUtilities)
		}
	],
} satisfies Config;
