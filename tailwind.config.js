/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00D4FF', // Cyan from ETERNOTES logo
        secondary: '#9945FF', // Purple from ETERNOTES logo  
        accent: '#FF45D8', // Pink from ETERNOTES logo
        dark: {
          bg: '#0A0A0A', // Deep black background
          secondary: '#0F0A1A', // Dark with cyan-purple tint
          tertiary: '#1A0F2A', // Purple-tinted dark
          surface: '#141419', // Dark surface with subtle blue
          card: '#1A1520', // Dark card with purple hint
          elevated: '#25202A', // Elevated dark surface
          border: '#2A2A33', // Dark border with subtle cyan
        },
        gray: {
          text: '#E0E0E0', // Light gray for text
          light: '#F5F5F5', // Light gray
          dark: '#333333', // Dark gray
        },
        text: {
          primary: '#FFFFFF', // Primary text color (white)
          secondary: '#B3B3B3', // Secondary text color (light gray)
          tertiary: '#808080', // Tertiary text color (medium gray)
        },
        accent: {
          purple: '#8B5CF6', // Accent purple
          pink: '#EC4899', // Accent pink
        },
        nova: {
          cyan: '#00D4FF', // Cyan from logo
          purple: '#9945FF', // Purple from logo
          pink: '#FF45D8', // Pink from logo
          darkPurple: '#7C3AED', // Dark purple accent
          neon: '#00FFFF', // Bright cyan
          cosmic: '#8B5CF6', // Cosmic purple
        },
        neon: {
          purple: '#E891FF',
          pink: '#FF6EC7',
          blue: '#00D9FF',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        heading: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(180, 92, 240, 0.4)',
        'glow-lg': '0 0 40px rgba(180, 92, 240, 0.6)',
        'glow-xl': '0 0 60px rgba(180, 92, 240, 0.8)',
        'neon': '0 0 30px rgba(232, 145, 255, 0.7)',
        'neon-lg': '0 0 50px rgba(232, 145, 255, 0.8)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'modern': '0 8px 32px rgba(180, 92, 240, 0.15)',
        'modern-lg': '0 16px 48px rgba(180, 92, 240, 0.25)',
        'cosmic': '0 0 80px rgba(107, 70, 193, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'nova-gradient': 'linear-gradient(135deg, #00D4FF 0%, #9945FF 50%, #FF45D8 100%)',
        'cosmic-gradient': 'linear-gradient(45deg, #0A0A0A 0%, #001122 35%, #9945FF 70%, #00D4FF 100%)',
        'neon-gradient': 'linear-gradient(90deg, #00D4FF 0%, #9945FF 50%, #FF45D8 100%)',
        'aurora': 'linear-gradient(120deg, #00D4FF 0%, #00FFFF 25%, #9945FF 50%, #FF45D8 75%, #FF69B4 100%)',
        'brand-gradient': 'linear-gradient(135deg, #00D4FF 0%, #9945FF 50%, #FF45D8 100%)',
        'hero-gradient': 'linear-gradient(135deg, #000511 0%, #001122 25%, #002244 50%, #001133 75%, #000511 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'float': 'float 4s ease-in-out infinite',
        'gradient': 'gradient 20s ease infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'neon-pulse': 'neonPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'aurora': 'aurora 25s ease infinite',
        'cosmic-drift': 'cosmicDrift 30s linear infinite',
        'particle-float': 'particleFloat 6s ease-in-out infinite',
        'text-glow': 'textGlow 2s ease-in-out infinite alternate',
        'smooth-bounce': 'smoothBounce 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite',
        'musical-float': 'musicalFloat 8s ease-in-out infinite',
        'sound-pulse': 'soundPulse 2s ease-in-out infinite',
        'rhythm-beat': 'rhythmBeat 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
        'ethereal-drift': 'etherealDrift 15s ease-in-out infinite',
        'dreamy-hover': 'dreamyHover 6s ease-in-out infinite',
        'visualizer-bounce': 'visualizerBounce 0.8s ease-in-out infinite',
        'sparkle-twinkle': 'sparkleTwinkle 3s ease-in-out infinite',
        'ripple-expand': 'rippleExpand 4s ease-out infinite',
        'frequency-flow': 'frequencyFlow 3s linear infinite',
        'melodic-sweep': 'melodicSweep 5s ease-in-out infinite',
        'header-pulse': 'headerPulse 2s ease-in-out infinite',
        'musical-entrance': 'musicalEntrance 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'stagger-entrance': 'staggerEntrance 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'text-reveal': 'textReveal 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'particle-drift': 'particleDrift 20s ease-in-out infinite',
        'smooth-glow': 'smoothGlow 3s ease-in-out infinite alternate',
        'advanced-float': 'advancedFloat 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(180, 92, 240, 0.4)' },
          '100%': { boxShadow: '0 0 40px rgba(180, 92, 240, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-5px) rotate(1deg)' },
          '50%': { transform: 'translateY(-10px) rotate(0deg)' },
          '75%': { transform: 'translateY(-5px) rotate(-1deg)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(180, 92, 240, 0.4)' },
          '50%': { boxShadow: '0 0 60px rgba(180, 92, 240, 0.9)' },
        },
        neonPulse: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(232, 145, 255, 0.7)', textShadow: '0 0 10px rgba(232, 145, 255, 0.8)' },
          '50%': { boxShadow: '0 0 50px rgba(232, 145, 255, 1)', textShadow: '0 0 20px rgba(232, 145, 255, 1)' },
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%', transform: 'rotate(0deg)' },
          '25%': { backgroundPosition: '100% 25%', transform: 'rotate(1deg)' },
          '50%': { backgroundPosition: '100% 75%', transform: 'rotate(0deg)' },
          '75%': { backgroundPosition: '0% 100%', transform: 'rotate(-1deg)' },
        },
        cosmicDrift: {
          '0%': { transform: 'translateX(-100%) translateY(0%) rotate(0deg)' },
          '25%': { transform: 'translateX(-50%) translateY(-25%) rotate(90deg)' },
          '50%': { transform: 'translateX(0%) translateY(0%) rotate(180deg)' },
          '75%': { transform: 'translateX(50%) translateY(25%) rotate(270deg)' },
          '100%': { transform: 'translateX(100%) translateY(0%) rotate(360deg)' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) scale(1)' },
          '33%': { transform: 'translateY(-20px) translateX(10px) scale(1.1)' },
          '66%': { transform: 'translateY(-10px) translateX(-15px) scale(0.9)' },
        },
        textGlow: {
          '0%, 100%': { textShadow: '0 0 10px rgba(180, 92, 240, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(232, 145, 255, 0.8), 0 0 30px rgba(180, 92, 240, 0.6)' },
        },
        smoothBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        musicalFloat: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)', opacity: '0.6' },
          '25%': { transform: 'translateY(-40px) translateX(20px) rotate(10deg)', opacity: '0.8' },
          '50%': { transform: 'translateY(-60px) translateX(-10px) rotate(-5deg)', opacity: '1' },
          '75%': { transform: 'translateY(-30px) translateX(30px) rotate(15deg)', opacity: '0.7' },
        },
        soundPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(2.5)', opacity: '0.1' },
        },
        rhythmBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.1)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.05)' },
          '60%': { transform: 'scale(1)' },
        },
        etherealDrift: {
          '0%, 100%': { transform: 'translateX(-20px) translateY(0px) scale(1)', opacity: '0.4' },
          '33%': { transform: 'translateX(30px) translateY(-15px) scale(1.2)', opacity: '0.6' },
          '66%': { transform: 'translateX(-10px) translateY(25px) scale(0.8)', opacity: '0.3' },
        },
        dreamyHover: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-8px) rotate(2deg)' },
          '66%': { transform: 'translateY(-12px) rotate(-1deg)' },
        },
        visualizerBounce: {
          '0%, 100%': { height: '8px' },
          '25%': { height: '24px' },
          '50%': { height: '40px' },
          '75%': { height: '16px' },
        },
        sparkleTwinkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        rippleExpand: {
          '0%': { transform: 'scale(0)', opacity: '0.8' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        frequencyFlow: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        melodicSweep: {
          '0%, 100%': { transform: 'translateX(-200%) skewX(-20deg)', opacity: '0' },
          '50%': { transform: 'translateX(200%) skewX(20deg)', opacity: '0.8' },
        },
        headerPulse: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 8px 32px rgba(180, 92, 240, 0.1)' },
          '50%': { transform: 'scale(1.01)', boxShadow: '0 12px 48px rgba(180, 92, 240, 0.2)' },
        },
        musicalEntrance: {
          '0%': { opacity: '0', transform: 'translateY(80px) scale(0.8) rotateX(20deg)' },
          '50%': { opacity: '0.8', transform: 'translateY(-10px) scale(1.05) rotateX(-5deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1) rotateX(0deg)' },
        },
        staggerEntrance: {
          '0%': { opacity: '0', transform: 'translateY(60px) scale(0.8) rotateY(-10deg)' },
          '60%': { opacity: '0.8', transform: 'translateY(-5px) scale(1.02) rotateY(2deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1) rotateY(0deg)' },
        },
        textReveal: {
          '0%': { opacity: '0', transform: 'translateY(30px)', filter: 'blur(10px)' },
          '50%': { opacity: '0.7', transform: 'translateY(-5px)', filter: 'blur(2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0px)' },
        },
        particleDrift: {
          '0%, 100%': { transform: 'translateX(-10px) translateY(0px) rotate(0deg)', opacity: '0.3' },
          '25%': { transform: 'translateX(15px) translateY(-20px) rotate(90deg)', opacity: '0.6' },
          '50%': { transform: 'translateX(-5px) translateY(-30px) rotate(180deg)', opacity: '0.8' },
          '75%': { transform: 'translateX(10px) translateY(-10px) rotate(270deg)', opacity: '0.4' },
        },
        smoothGlow: {
          '0%': { 
            boxShadow: '0 0 20px rgba(180, 92, 240, 0.3)', 
            filter: 'brightness(1) saturate(1)' 
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(232, 145, 255, 0.6)', 
            filter: 'brightness(1.1) saturate(1.2)' 
          },
        },
        advancedFloat: {
          '0%, 100%': { 
            transform: 'translateY(0px) translateX(0px) rotateZ(0deg)', 
            filter: 'hue-rotate(0deg)' 
          },
          '25%': { 
            transform: 'translateY(-15px) translateX(8px) rotateZ(2deg)', 
            filter: 'hue-rotate(5deg)' 
          },
          '50%': { 
            transform: 'translateY(-25px) translateX(-5px) rotateZ(-1deg)', 
            filter: 'hue-rotate(10deg)' 
          },
          '75%': { 
            transform: 'translateY(-10px) translateX(12px) rotateZ(3deg)', 
            filter: 'hue-rotate(5deg)' 
          },
        },
      },
    },
  },
  plugins: [],
}