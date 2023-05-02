import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

const OrderCard = () => {

  return (
    <div className='flex flex-col bg-[#dfe8f6] w-full h-96 laptop:max-w-sm rounded-lg drop-shadow-md font-genaPrimary p-4'>
        <div className='w-full border border-black h-[15rem] rounded-md justify-center flex items-center mb-auto'>
          PDF
        </div>
        <div className='flex'>
            <div className='mr-auto'>
                <p className='text-[#376fd0]'>Status: <span className='text-black'>Pending Approval</span></p>
            </div>
            <div className='flex gap-5'>
                <button><FontAwesomeIcon className='text-white bg-[#233043] hover:bg-white hover:text-[#233043] hover:scale-125 p-[.4rem] rounded-full transition-all ease-in-out' icon={faPencil} /></button>
                <button><FontAwesomeIcon className='text-white bg-[#233043] hover:bg-white hover:text-[#233043] hover:scale-125 p-[.4rem] rounded-full transition-all ease-in-out' icon={faTrash} /></button>
            </div>
        </div>
    </div>
  )
}

export default OrderCard