import React from 'react'

const Navbar = () => {
  return (
    <nav className = 'flex justify-between bg-zinc-800 text-white py-4 px-2 my-3 mx-2 rounded-md'>
        <div className="logo">
            <span className='font-bold text-xl mx-8 text-yellow-600'>DO<span className='text-white'>do</span></span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-semibold transition-all duration-500'>Home</li>
            <li className='cursor-pointer hover:font-semibold transition-all duration-500'>Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar