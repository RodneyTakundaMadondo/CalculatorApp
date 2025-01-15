/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors:{
        textColor1:'hsl(221, 14%, 31%)',
        keyShadowPrimary:'hsl(28, 16%, 65%)',//  for the main number buttons
        keyShadowSecondary:'hsl(224, 28%, 35%)',// for the reset and del buttons
        keyShadowTertiary:'hsl(6, 70%, 34%)', // for the equals button
        
      },
      screens:{
        esPhone:'250px'
      }
    },
  },
  plugins: [],
}

