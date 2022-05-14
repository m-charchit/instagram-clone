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
          "from" : {transform:'scale(1.2)',opacity:"0"},
          "to" : {transform:'scale(1)',opacity:"1"}
        }
      }
    },
  },
  plugins: [],
}
