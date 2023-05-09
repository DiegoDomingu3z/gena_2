import React from 'react'
import { useSelector } from 'react-redux'
import { useCanvasDrawer } from '~/Contexts/canvasDrawerContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'


const CartCanvasDrawer = ({ toggleCartCanvas, setToggleCartCanvas }) => {
  const basket = useSelector((state) => state.Orders.basket)
  return (
    <div className={toggleCartCanvas ? 'pt-5 top-0 right-0 w-72 bg-[#233043] drop-shadow-2xl fixed h-full z-40 ease-in-out duration-700 flex flex-col ' : "pt-5 top-0 w-56 bg-[#233043] drop-shadow-2xl fixed h-full z-40 ease-in-out duration-500 flex flex-col -right-full"}>
      <div className='relative h-full'>
        <div className='flex justify-between mx-4'>
          <span className='text-white text-3xl mt-1 font-semibold'>
            Label Cart
          </span>
          <button className='text-white ' onClick={() => setToggleCartCanvas(!toggleCartCanvas)}>
            <FontAwesomeIcon className='p-3 rounded-full drop-shadow-sm
       bg-[#233042] text-white' icon={faXmarkCircle} size='xl' /></button>
        </div>
        <div className='w-full flex justify-center mb-20'>
          <p className="text-white">Display orders and whatnot here</p>
        </div>
        <div className='absolute bottom-0 '>
          <div className='mb-3 m-2 mx-5  rounded-lg w-64 h-48'>
            <textarea className='rounded-lg' name="" id="" cols="32" rows="8"></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartCanvasDrawer