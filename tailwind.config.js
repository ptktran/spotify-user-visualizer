/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: 
    {
        screens: {
            'sm': '300px',
            // => @media (min-width: 640px) { ... }
      
            'md': '600px',
            // => @media (min-width: 768px) { ... }
      
            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }
      
            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }
      
            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
        fontFamily: {
            coolvetica: ['Coolvetica', 'sans-serif'],
            manrope: ['Manrope', 'sans-serif']
        },
        colors: {
            'spotify-grey': '#212121',
            'spotify-green': '#1ed760',
            'pastel-pink': '#ffd3e1',
            'vintage-pink': '#f9afc3',
            'pastel-purple': '#a6c1ee',
            'offwhite': '#FCF8F1',
            'pastel-yellow': '#feb938',
            'vintage-blue': '#99c9cd',
            'vintage-yellow': '#f8ee8c',
            'vintage-green': '#a3bc88',
            'navy': '#002947'
        },
        backgroundImage: {
            'home-gradient': "url('./assets/bg.jpg')",
            '2nd-gradient': "url('./assets/bg4.png')"
        }
    },
  },
  plugins: [],
}