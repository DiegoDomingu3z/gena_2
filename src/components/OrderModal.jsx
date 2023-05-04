import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import OrderModalCard from './OrderModalCard'

const OrderModal = ({ modalState, setModalState }) => {
  return (
    <div className='border border-black absolute left-0 w-screen h-screen bg-slate-400 bg-opacity-80 z-40 backdrop-blur-sm flex justify-center items-center'>
        <div className='bg-[#f7f9fc] w-4/5 laptop:w-3/5 h-[38rem] rounded-lg px-10 py-5 flex flex-col'>
            <button onClick={() => setModalState(!modalState)} className='text-2xl self-end hover:bg-[#233043] rounded-full h-8 w-8 hover:text-white transition-all ease-in-out'><FontAwesomeIcon icon={faXmark} /></button>
            <h1 className='font-medium'>Labels for El Piscatory</h1>
            <div className='grid laptop:grid-cols-2 gap-y-12 justify-items-center mt-10'>
                <OrderModalCard />
                <OrderModalCard />
            </div>
        </div>
    </div>
  )
}

export default OrderModal