import React from 'react'

function ProfileCard() {
  return (
    <div className="flex flex-col lg:flex-row py-2 lg:space-x-3 cursor-pointer text-center lg:text-left items-center bg-white lg:bg-inherit border lg:border-0 ">
              <img src="/default.jpg" alt="" className={`w-20 h-20 lg:w-9 lg:h-9 rounded-full`}/>
              <div className="w-full mx-10 lg:mx-0 mt-1 lg:mt-0">
                <p className="font-semibold">charchit</p>
                <p className="text-sm text-slate-500">CHARCHIT</p>
              </div>
              <button className="outline-none lg:text-blue-600 text-white text-sm font-semibold lg:hover:text-blue-700 bg-blue-500 lg:bg-white px-2 py-1 rounded-sm my-3 lg:my-0">
              Profile
            </button>
              </div>
  )
}

export default ProfileCard