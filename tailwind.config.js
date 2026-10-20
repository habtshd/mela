/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        coral: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          500: '#f97316',
          600: '#ea580c',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e5ebe5',
          200: '#cddacb',
          500: '#6c8d68',
          700: '#476244',
        },
        temer: {
          50: '#f6f9ee',
          100: '#ebf4d9',
          200: '#d7e9b4',
          300: '#bed986',
          400: '#a3c55c',
          500: '#84a441', // Official Temer Olive/Lime Green
          600: '#739138',
          700: '#576f2b',
          800: '#465825',
          900: '#3c4c23',
          dark: '#0b0b0b',
          charcoal: '#181d24',
          slate: '#2d2d2d',
          gold: '#c3ae4b',
          bronze: '#bc8664',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Epilogue', 'Poppins', '"Plus Jakarta Sans"', 'sans-serif'],
        accent: ['Poppins', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'temer': '0 10px 30px -10px rgba(132, 164, 65, 0.35)',
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
