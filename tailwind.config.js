/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'my-image': "url('/logo.png')",
      },
      width: {
        '512': '512px',  // Key can be any name, but using the pixel value helps remember what it does
        '150': '150px',
        '250': '250px',
        '180': '180px',
        
      },
      height: {
        '512': '512px',  // Key can be any name, but using the pixel value helps remember what it does
        '150': '150px',
        '250': '250px',
        '160': '160px',
      },
    },
  },
  plugins: [],
};
