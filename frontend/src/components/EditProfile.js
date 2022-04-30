import React from 'react'

function EditProfile() {
  return (
    <div className="md:container mx-auto lg:px-60 md:px-20 py-5 px-5">
        <div className="flex flex-col space-y-4 md:flex-row">
            <img src="/default.jpg" alt="" className='w-60 h-60 self-center rounded-full'/>
            <div className="flex flex-col space-y-9 w-full px-5">
                <div className='flex flex-col '>
            <label htmlFor="NameInput">Name</label>
          <input
            type="text"
            id="NameInput"
            className="outline-none mt-1 block w-full p-2 border-2 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-300 focus:ring-opacity-60"
          />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="bioInput">Bio</label>
          <textarea
            id="bioInput"
            className="outline-none mt-1 block w-full p-1 border-2 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-300 focus:ring-opacity-60"
          ></textarea>
          </div>
            </div>
        </div>
        <div className='text-center'>
        <button className='py-2 px-3 bg-blue-500 text-white text-sm font-semibold rounded-md shadow-lg shadow-blue-500/50 focus:outline-none w-1/2 mt-7 '>Update</button>
        </div>
    </div>
  )
}

export default EditProfile