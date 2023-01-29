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
            'pastel-purple': '#a6c1ee'
        },
        backgroundImage: {
            'home-gradient': "url('./assets/bg.jpg')",
        }
    },
  },
  plugins: [],
}