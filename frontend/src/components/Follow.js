import React from 'react'

function Follow(props) {

  const {title,hideElem,data} = props
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-30 backdrop-brightness-50'>
        <div className="bg-white border rounded-xl w-96 h-96 overflow-auto animate-[pulse_1s_ease-in-out_1]">
            <div className='relative my-2 font-semibold flex justify-center items-center'>
                <p className='w-full text-center '>{title}</p>
                <i className="absolute right-2 fas fa-times text-3xl float-right cursor-pointer" onClick={()=>hideElem(false)}></i>
            </div>
            <hr />
            {data && data.map((item)=>{
            return (<div className="flex flex-col mx-4 mt-2 space-y-1 mb-1" key={item._id}>
                <div className="flex space-x-3 items-center">
                <img src="/default.jpg" alt="" className="w-9 h-9 rounded-full"/>
              <div className="w-full mx-10 lg:mx-0 mt-1 lg:mt-0">
                <p className="font-semibold">{item.username}</p>
                <p className="text-sm text-slate-500">{item.name}</p>
              </div>
              <button className="outline-none text-white text-sm font-semibold  bg-blue-500  px-2 py-1 rounded-sm my-3 lg:my-0">
              Profile
            </button>
                </div>
            </div>)
            })}
        </div>
    </div>
  )
}

export default Follow