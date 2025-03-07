import type { Config } from 'tailwindcss';

export default {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontSize: {
        '3xl': ['32px', { lineHeight: '42px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        xl: ['20px', { lineHeight: '32px' }],
        '2lg': ['18px', { lineHeight: '26px' }],
        lg: ['16px', { lineHeight: '26px' }],
        md: ['14px', { lineHeight: '24px' }],
        sm: ['13px', { lineHeight: '22px' }],
        xs: ['12px', { lineHeight: '20px' }],
      },
      colors: {
        black: {
          100: '#F9F9F9',
          200: '#6B6B6B',
          300: '#5E5E5E',
          400: '#525252',
          500: '#454545',
          600: '#373737',
          700: '#2B2B2B',
          800: '#1F1F1F',
          900: '#121212',
          950: '#050505',
        },
        blue: {
          100: '#FFFFFF',
          200: '#ECEFF4',
          300: '#CBD3E1',
          400: '#ABB8CE',
          500: '#8B9DBC',
          600: '#6A82A9',
          700: '#52698E',
          800: '#40516E',
          900: '#2D394E',
          950: '#1A212D',
        },
        gray: {
          100: '#DEDEDE',
          200: '#C4C4C4',
          300: '#ABABAB',
          400: '#919191',
        },
      },
      fontFamily: {
        mont: ['var(--font-montserrat)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
