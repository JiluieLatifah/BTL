/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        radiant: {
          light: '#fdf2f4',
          DEFAULT: '#dc91a8', // Radiant pink theme
          dark: '#c77890',
        },
        medical: {
          light: '#fdf2f4',
          DEFAULT: '#dc91a8', // Backward compatibility for existing className
          dark: '#c77890',
        },
        logo: {
          light: '#fff0f2',
          DEFAULT: '#ff5777', // Logo color
        },
        momo: {
          light: '#FFF0F5',
          DEFAULT: '#A50064', // Secondary pink/red
          dark: '#7A0049',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
