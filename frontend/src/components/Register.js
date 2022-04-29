import React from 'react'

function Register() {
  return (
    <div className="flex items-center justify-center flex-col space-y-1">
        <div className="flex flex-col px-10 py-14 border bg-white my-7 space-y-5 items-center">
            <img src="igNavbarLogo.png" alt="" className='w-40'/>
            <div className="flex flex-col">
                <input type="text" className='outline-none px-2 py-2 w-72 border bg-gray-100 bg-opacity-25 focus:border-gray-400 text-sm mb-2' placeholder='Username' />
                <input type="text" className='outline-none px-2 py-2 w-72 border bg-gray-100 bg-opacity-25 focus:border-gray-400 text-sm mb-2' placeholder='Name' />
                <input type="text" className='outline-none px-2 py-2 w-72 border bg-gray-100 bg-opacity-25 focus:border-gray-400 text-sm mb-2' placeholder='Email' />
                <input type="password" className='outline-none px-2 py-2 w-72 border bg-gray-100 bg-opacity-25 focus:border-gray-400 text-sm mb-2' placeholder='Password' />
                <input type="password" className='outline-none px-2 py-2 w-72 border bg-gray-100 bg-opacity-25 focus:border-gray-400 text-sm mb-4' placeholder='Confirm Password' />
                <button className='outline-none text-white font-semibold  bg-blue-500 py-1 rounded-md active:bg-blue-300'>Sign Up</button>
            </div>
            
        </div>
        <div className="flex px-24 py-5 border bg-white items-center">
            <span>Have an account ? <a href="" className='font-semibold text-blue-400'>Log In</a></span>
            
        </div>
    </div>
  )
}

export default Register