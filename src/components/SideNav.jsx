import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'

export const NavButtons = () => {
  const router = useRouter();

  return (
    <>
      <div className='w-full flex flex-col justify-center mb-auto pl-8'>
        <Link href={'/start-new-order'}><button className={router.pathname === '/' ? 'h-20 w-full text-left transition-all ease-in-out duration-150 text-white hover:shadow-md hover:tracking-wide hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:border-r-white hover:border-8' : 'display-none'}>New Label Order</button></Link>
        <Link href={'/current-orders'}><button className={router.pathname === '/' ? 'h-20 w-full text-left transition-all ease-in-out duration-150 text-white hover:shadow-md hover:tracking-wide hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:border-r-white hover:border-8' : 'display-none'}>Current Orders</button></Link>
      </div>
      <div>
        <button className='text-white mb-5'>Report Issue</button>
      </div>
    </>
  )
}

const SideNav = () => {
  return (
    <div className='bg-sky-950 w-44 md:w-64 h-screen flex flex-col items-center shadow-lg'>
      <div className='w-full flex justify-center mb-52'>
        <span className='text-white'>GENA</span>
      </div>
      <NavButtons />
    </div>
  )
}

export default SideNav