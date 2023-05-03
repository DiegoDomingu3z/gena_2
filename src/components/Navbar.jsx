import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex laptop:hidden border border-black w-full h-16 fixed items-center px-8'>
        <button className='text-2xl'><FontAwesomeIcon icon={faBars} /></button>
    </nav>
  )
}

export default Navbar