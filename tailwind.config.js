/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}", // <== components papkasini qo‘shish
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        darkBlue: "#404d3b", 
        primary: '#171D22', // main dark blue
        bgPrimary: '#5ED5A8', // main green 
        bgDark: '#1B232A', // secondary dark blue
        mainDark: '#192027',
        textGray: '#777777', // text gray
        textRed: '#DD4B4B', // text red
        textGreen: '#5ED5A8', // text green
        textBlue: '#A7AFB7'
      },
      spacing: {
        "10px": "10px",
        "20px": "20px",
        "30px": "30px",
        "40px": "40px",
        "50px": "50px",
        "60px": "60px",
        "70px": "70px",
        "80px": "80px",
        "90px": "90px",
        "100px": "100px",
      },
      fontFamily: {
        pthin: ["Poppins-Thin"],
        pextralight: ["Poppins-ExtraLight"],
        plight: ["Poppins-Light"],
        pregular: ["Poppins-Regular"],
        pmedium: ["Poppins-Medium"],
        psemibold: ["Poppins-SemiBold"],
        pbold: ["Poppins-Bold"],
        pextrabold: ["Poppins-ExtraBold"],
        pblack: ["Poppins-Black"],
        space: ["SpaceMono"],
        Jakarta: ["Jakarta", "sans-serif"],
        JakartaBold: ["Jakarta-Bold", "sans-serif"],
        JakartaExtraBold: ["Jakarta-ExtraBold", "sans-serif"],
        JakartaExtraLight: ["Jakarta-ExtraLight", "sans-serif"],
        JakartaLight: ["Jakarta-Light", "sans-serif"],
        JakartaMedium: ["Jakarta-Medium", "sans-serif"],
        JakartaSemiBold: ["Jakarta-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
}