module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}","./public/index.html"
  ],
  theme: {
    extend: {
      animation:{
        "showModal":"100ms ease-out 0ms 1 normal none running showModal"
      },
      keyframes: {
        showModal : {
          "from" : {opacity:"0",transform:'scale(1.2)',},
          "to" : {opacity:"1",transform:'scale(1)',}
        }
      }
    },
  },
  plugins: [],
}
