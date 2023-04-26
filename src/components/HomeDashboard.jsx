import React from 'react'
import { useLoginInput } from '~/Contexts/LoginContext'

const HomeDashboard = () => {
    const user = useLoginInput();
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = today.toLocaleString('default', { month: 'short' }); //January is 0!
    const yyyy = today.getFullYear();
    const date = mm + ' ' + dd;

  return (
    <div className={user.user ? "flex flex-col p-20" : "hidden"}>
        <div className='flex items-end'>
            <div className='mr-auto'><h1 className='text-3xl font-medium font-genaPrimary'>{user.user && user.user.firstName}'s Dashboard</h1></div>
            <span className='rounded bg-[#1baded] text-white py-1 px-4'>Today: {date}</span>
        </div>
        <div className='mb-10 mt-5 border-t border-gray-300 rounded-full' />
        <div className='grid w-full h-full'>
            <div className='bg-[#dfe8f6] w-96 h-96 rounded-lg drop-shadow-md font-genaPrimary p-4'>
                <h1 className='text-xl text-[#376fd0]'>Current Orders</h1>
            </div>
        </div>
    </div>
  )
}

export default HomeDashboard