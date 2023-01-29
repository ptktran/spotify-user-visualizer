/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: 
    {
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
    },
  },
  plugins: [],
}
