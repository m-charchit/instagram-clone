import React from 'react'

function Spinner({size}) {
  return (
    <div className="text-center">
        <i className={`fas fa-spinner fa-spin ${size === "large" ? "text-5xl" : "text-3xl" } text-gray-500`}></i>
    </div>
  )
}

export default Spinner