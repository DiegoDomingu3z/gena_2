import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { currentUser } from '../../store/userLogin';


export const NavButtons = () => {
  const currentUser = useSelector((state) => state.currentUser)
  console.log(currentUser)
  const router = useRouter();

  return (
    <>
      <div className='w-full flex flex-col justify-center mb-auto'>
        <Link href={'/start-new-order'} className={router.pathname === '/' ? "flex items-center gap-5 text-sm md:text-md" : "hidden"}>
          <button className={'h-14 w-full flex items-center gap-5 p-8 transition-all ease-in-out duration-150 text-white hover:shadow-md hover:tracking-wide hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-10 hover:bg-white hover:border-r-white hover:border-8'}>
            <FontAwesomeIcon icon={faCirclePlus} />
            <span>New Label Order</span>
          </button>
        </Link>
        <Link href={'/current-orders'} className={router.pathname === '/' ? "flex items-center gap-5 text-sm md:text-md" : "hidden"}>
          <button className={'h-14 w-full flex items-center gap-5 p-8 transition-all ease-in-out duration-150 text-white hover:shadow-md hover:tracking-wide hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-10 hover:bg-white hover:border-r-white hover:border-8'}>
            <FontAwesomeIcon icon={faSuitcase} />
            <span>Current Orders</span>
          </button>
        </Link>
      </div>
      <div>
        <button className='text-white mb-5'>Report Issue</button>
        {currentUser && <div className='text-white'>{currentUser.userName}</div>}
      </div>
    </>
  )
}

const SideNav = () => {
  return (
    <div className='bg-sky-950 w-44 md:w-64 h-screen flex flex-col items-center shadow-lg pt-5'>
      <div className='w-full flex justify-center mb-20'>
        <Image src="/images/GENA-Logo.png" width={60} height={60} alt="GENA Image"/>
      </div>
      <NavButtons />
    </div>
  )
}

export default SideNav