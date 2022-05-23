import React from 'react'

function Footer() {
  return (
    <footer className="text-center mt-10 ">
    <div className="p-4 text-white space-x-3">
        <a
          className="px-3 py-2 rounded-full bg-red-500 "
          href="mailto:charchit.dahiya@gmail.com"
          target="_blank" rel="noreferrer"
        >
          <i className="fab fa-google"></i>
        </a>
        <a
          className="px-3 py-2 rounded-full bg-blue-600"
          href="https://www.linkedin.com/in/charchit-dahiya-a59b41213"
          target="_blank" rel="noreferrer"
        >
          <i className="fab fa-linkedin-in"> </i>
        </a>
        <a
          className="px-3 py-2 rounded-full bg-gray-800"
          href="https://github.com/m-charchit"
          role="button"
          target="_blank" rel="noreferrer"
        >
          <i className="fab fa-github"> </i>
        </a>
        <a
          className="px-3 py-2 rounded-full bg-purple-800"
          href="https://instagram.com/charchit.dahiya"
          role="button"
          target="_blank" rel="noreferrer"
        >
          <i className="fab fa-instagram"></i>
        </a>
    </div>
    <div
      className="text-gray-500 mb-3 "
    >
      © Copyright 2022 | Charchit
    </div>
  </footer>
  )
}

export default Footer