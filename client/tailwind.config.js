/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,cjs,mjs,ts,jsx,tsx}"],

  theme: {
    extend: {},
  },
  plugins: [
    function addCustomUtilities({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',  
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
};
