import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='flex items-center justify-center flex-col space-y-5 py-10'>
        <h1 className='text-3xl font-semibold'>Sorry, this page isn't available.</h1>
        <p className='text-lg'>The link you followed may be broken, or the page may have been removed. <Link to="/" className="text-blue-800">Go back to Instagram</Link>.
</p>
    </div>
  )
}

export default NotFound