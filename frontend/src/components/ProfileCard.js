import React from 'react'

function ProfileCard(props) {
  return (
    <div className="flex flex-col lg:flex-row px-3 py-2 space-y-2 lg:space-x-3 cursor-pointer items-center bg-white lg:bg-none">
              <img src="/default.jpg" alt="" className={`w-${props.imgSize} h-${props.imgSize} rounded-full`}/>
              <div className="w-full">
                <p className="font-semibold">charchit</p>
                <p className="text-sm text-slate-500">CHARCHIT</p>
              </div>
              <button className="outline-none text-blue-600 text-sm font-semibold hover:text-blue-700 ">
              Profile
            </button>
              </div>
  )
}

export default ProfileCard