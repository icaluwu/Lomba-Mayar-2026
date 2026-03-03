/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#e8f1f8',
                    100: '#c5d9ed',
                    200: '#9fbfe0',
                    300: '#79a5d3',
                    400: '#5791c9',
                    500: '#357dbf',
                    600: '#1e5f8a', // main brand color
                    700: '#174e74',
                    800: '#103d5c',
                    900: '#092c44',
                },
                teal: {
                    50: '#e0f7f5',
                    100: '#b3ece8',
                    200: '#80dfda',
                    300: '#4dd2cc',
                    400: '#26c8c1',
                    500: '#0d9488', // main teal
                    600: '#0b8077',
                    700: '#086964',
                    800: '#065751',
                    900: '#04403c',
                },
                accent: '#5eead4',
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui'],
                heading: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(24px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(135deg, #092c44 0%, #1e5f8a 50%, #0d9488 100%)',
                'card-gradient': 'linear-gradient(135deg, #1e5f8a 0%, #0d9488 100%)',
            },
            boxShadow: {
                'glow-teal': '0 0 30px rgba(13, 148, 136, 0.3)',
                'glow-primary': '0 0 30px rgba(30, 95, 138, 0.3)',
                'card': '0 4px 24px rgba(9, 44, 68, 0.12)',
                'card-hover': '0 12px 40px rgba(9, 44, 68, 0.22)',
            },
        },
    },
    plugins: [],
};
