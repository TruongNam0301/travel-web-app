/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#FFFFFF',
          100: '#FAFCFB',
          200: '#F5F8F6',
          300: '#F2F6F4',
          400: '#F0F5F2',
          500: '#F0F5F2',
          600: '#C0D1C7',
          700: '#A1BAB0',
          800: '#82A399',
          900: '#648C82',
        },
        black: {
          50: '#E6E7E7',
          100: '#C0C3C2',
          200: '#8A8E8C',
          300: '#545A56',
          400: '#2D332F',
          500: '#121714',
          600: '#0E120F',
          700: '#0A0D0B',
          800: '#060807',
          900: '#030403',
        },
        green: {
          50: '#EDF4F0',
          100: '#D9E8E1',
          200: '#B4D1C3',
          300: '#8EBBA5',
          400: '#6AA587',
          500: '#618A73',
          600: '#4E705D',
          700: '#3A5646',
          800: '#273C30',
          900: '#152219',
        },
      },
    },
  },
  plugins: [],
}
