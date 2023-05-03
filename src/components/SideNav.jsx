import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faSuitcase, faHouse, faList } from '@fortawesome/free-solid-svg-icons'
import { useLoginInput } from '~/Contexts/LoginContext'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccount } from '../../store/Account/thunks';


export const NavButtons = () => {
  const user = useSelector((state) => state.Account)
  const dispatch = useDispatch()


  useEffect(() => {
    const token = sessionStorage.getItem('accessToken')
    dispatch(getAccount(token))
  }, [])



  const router = useRouter();

  return (
    <>
      <div className='w-full flex flex-col justify-center mb-auto'>
        <Link href={'/home'} className={router.pathname !== '/home' && user.accessToken ? "flex items-center gap-5" : "hidden"}>
          <button className={'h-14 w-full flex items-center gap-5 p-8 transition-all ease-in-out duration-150 text-white hover:shadow-md hover:tracking-wide hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8'}>
          <FontAwesomeIcon className='text-slate-400' icon={faHouse} />
            <span className='font-genaPrimary'>Home</span>
          </button>
        </Link>
        <Link href={'/start-new-order'} className={router.pathname === '/home' && user.account.privileges != 'printshop' ? "flex items-center gap-5" : "hidden"}>
          <button className={'h-14 w-full flex items-center gap-5 p-8 transition-all ease-in-out duration-150 text-white hover:shadow-md hover:tracking-wide hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8'}>
            <FontAwesomeIcon className='text-slate-400' icon={faCirclePlus} />
            <span className='font-genaPrimary'>New Order</span>
          </button>
        </Link>
        <Link href={'/current-orders'} className={router.pathname === '/home' && user.account.privileges != 'printshop' ? "flex items-center gap-5" : "hidden"}>
          <button className={'h-14 w-full flex items-center gap-5 p-8 transition-all ease-in-out duration-150 text-white hover:shadow-md hover:tracking-wide hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8'}>
            <FontAwesomeIcon className='text-slate-400' icon={faSuitcase} />
            <span className='font-genaPrimary'>Current Orders</span>
          </button>
        </Link>
        <Link href={'/new-label'} className={router.pathname === '/home' && user.account.privileges != 'printshop' ? "flex items-center gap-5" : "hidden"}>
          <button className={'h-14 w-full flex items-center gap-5 p-8 transition-all ease-in-out duration-150 text-white hover:shadow-md hover:tracking-wide hover:border-t-0 hover:border-l-0 hover:border-b-0 hover:bg-opacity-30 hover:bg-slate-900 hover:border-r-white hover:border-8'}>
            <FontAwesomeIcon className='text-slate-400' icon={faList} />
            <span className='font-genaPrimary'>Print Orders</span>
          </button>
        </Link>
      </div>
      <div className='w-full h-16'>
        {/* <button className='text-white mb-5'>Report Issue</button> */}
        {<div className='text-white bg-[#1e2a38] w-full h-full flex justify-center items-center'>{user.accessToken ? `${user.account.firstName} ${user.account.lastName}` : "Welcome to GENA!"}</div>}
      </div>
    </>
  )
}

const SideNav = () => {
  return (
    <div className='bg-[#233043] w-44 md:w-[300px] h-screen hidden laptop:flex flex-col items-center shadow-lg pt-5'>
      <div className='w-full flex justify-center mb-20'>
        <Image src="/images/GENA-Logo.png" width={60} height={60} alt="GENA Image" />
      </div>
      <NavButtons />
    </div>
  )
}

export default SideNav