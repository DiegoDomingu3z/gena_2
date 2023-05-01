import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
const HomeDashboard = () => {
    const { account } = useSelector((state) => state.Account)
    const dispatch = useDispatch()


    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = today.toLocaleString('default', { month: 'short' }); //January is 0!
    const yyyy = today.getFullYear();
    const date = mm + ' ' + dd;



  return (
    <div className={"flex flex-col p-20"}>
        <div className='flex items-end'>
            <div className='mr-auto'><h1 className='text-3xl font-medium font-genaPrimary'>{account && account.firstName}'s Dashboard</h1></div>
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