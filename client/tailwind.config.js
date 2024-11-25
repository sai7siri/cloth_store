/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container : {
        center : true,
        padding : {
          DEFAULT : "1rem",
          sm: "1.5rem",
          md: "2rem"
        }
      }
    },
  },
  plugins: [
      daisyui,
  ],
}

