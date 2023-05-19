import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import OrderModalCard from './OrderModalCard'
import { useDispatch } from 'react-redux'
import { getSingleOrder } from '../../store/Orders/thunks'
import { useEffect } from 'react'

const OrderModal = ({ modalState, setModalState }) => {
  // const orders = useSelector((state) => state.Orders.myOrders)
  // const dispatch = useDispatch();
  // let token;

  // useEffect(() => {
  //   token = sessionStorage.getItem('accessToken');
  // }, [])


  return (
    <div className='absolute left-0 w-screen h-screen bg-slate-400 bg-opacity-80 z-40 backdrop-blur-sm flex justify-center items-center'>
      <div className='bg-[#f7f9fc] w-4/5 laptop:w-3/5 h-[38rem] rounded-lg px-10 py-5 flex flex-col'>
        <button onClick={() => setModalState(!modalState)} className='text-2xl self-end hover:bg-[#233043] rounded-full h-8 w-8 hover:text-white transition-all ease-in-out'><FontAwesomeIcon icon={faXmark} /></button>
        <h1 className='font-medium'>Labels in this order</h1>
        <div className='grid justify-items-center laptoplg:grid-cols-4 grid-cols-2 gap-8 max-h-[80rem] laptop:h-[37.5rem] overflow-auto pb-4 p-2 pr-10'>
          <OrderModalCard />
        </div>
      </div>
    </div>
  )
}

export default OrderModal