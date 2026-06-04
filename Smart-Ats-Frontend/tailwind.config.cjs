/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,html}'
  ],
  theme: {
    extend: {},
    screens: {
      // Mobile-first custom small breakpoint for ~390px devices
      'sm': '390px',
      // keep the typical medium and large breakpoints
      'md': '768px',
      'lg': '1024px',
      // Desktop target per request
      'xl': '1440px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}
