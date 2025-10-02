import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // Dark mode configuration
  darkMode: "class", // or 'media' for system preference

  theme: {
    extend: {
      // Custom Colors
      colors: {
        // Primary brand colors
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },

        // Secondary brand colors
        secondary: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3",
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
          950: "#4a044e",
        },

        // Semantic colors
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6",

        // Custom color with CSS variables support
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Gradient colors
        gradient: {
          start: "#667eea",
          end: "#764ba2",
        },
      },

      // Custom Fonts
      fontFamily: {
        // Using CSS variables for font stacks
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
        serif: [
          "var(--font-geist)",
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
        mono: [
          "var(--font-jetbrains-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
        display: ["var(--font-cal-sans)", "system-ui", "sans-serif"],
      },

      // Custom Animations
      animation: {
        // Fade in animations
        "fade-in": "fade-in 0.5s linear forwards",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "fade-in-down": "fade-in-down 0.5s ease-out forwards",

        // Slide animations
        "slide-in-right": "slide-in-right 0.3s ease-out forwards",
        "slide-in-left": "slide-in-left 0.3s ease-out forwards",

        // Scale animations
        "scale-in": "scale-in 0.2s ease-out forwards",
        "scale-out": "scale-out 0.2s ease-out forwards",

        // Bounce animations
        "bounce-gentle": "bounce-gentle 2s infinite",

        // Spin animations
        "spin-slow": "spin 3s linear infinite",
        "spin-reverse": "spin-reverse 1s linear infinite",

        // Pulse animations
        "pulse-soft": "pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",

        // Shimmer effect
        shimmer: "shimmer 2s linear infinite",
      },

      // Keyframes for custom animations
      keyframes: {
        // Fade animations
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-down": {
          from: {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        // Slide animations
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-in-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },

        // Scale animations
        "scale-in": {
          from: {
            opacity: "0",
            transform: "scale(0.9)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "scale-out": {
          from: {
            opacity: "1",
            transform: "scale(1)",
          },
          to: {
            opacity: "0",
            transform: "scale(0.9)",
          },
        },

        // Gentle bounce
        "bounce-gentle": {
          "0%, 100%": {
            transform: "translateY(-5%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },

        // Reverse spin
        "spin-reverse": {
          to: {
            transform: "rotate(-360deg)",
          },
        },

        // Soft pulse
        "pulse-soft": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.8",
          },
        },

        // Shimmer effect
        shimmer: {
          "0%": {
            backgroundPosition: "-200px 0",
          },
          "100%": {
            backgroundPosition: "calc(200px + 100%) 0",
          },
        },
      },

      // Custom Breakpoints
      screens: {
        xs: "475px",
        "3xl": "1920px",
        "4xl": "2560px",

        // Container queries support
        "@xs": { raw: "(min-width: 475px)" },
        "@sm": { raw: "(min-width: 640px)" },
        "@md": { raw: "(min-width: 768px)" },
        "@lg": { raw: "(min-width: 1024px)" },
        "@xl": { raw: "(min-width: 1280px)" },
        "@2xl": { raw: "(min-width: 1536px)" },
      },

      // Custom Spacing
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
        144: "36rem",
      },

      // Custom Border Radius
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      // Custom Box Shadow
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        medium: "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        large: "0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 20px 0 rgba(0, 0, 0, 0.05)",
        glow: "0 0 20px rgba(59, 130, 246, 0.15)",
        "glow-lg": "0 0 40px rgba(59, 130, 246, 0.25)",
      },

      // Custom Gradients
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, var(--tw-gradient-stops))",
        "gradient-shimmer":
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
      },

      // Custom Z-Index
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },

      // Custom Typography
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
        "3xs": ["0.5rem", { lineHeight: "0.625rem" }],
      },

      // Custom Opacity
      opacity: {
        15: "0.15",
        35: "0.35",
        85: "0.85",
      },
    },
  },

  plugins: [
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
    require('@l'),
    // Add other plugins as needed
  ],
};

export default config;
