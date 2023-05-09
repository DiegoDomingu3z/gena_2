import React from 'react'
import { useSelector } from 'react-redux'
import { useCanvasDrawer } from '~/Contexts/canvasDrawerContext'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong, faTrash } from '@fortawesome/free-solid-svg-icons'


const CartCanvasDrawer = ({ toggleCartCanvas, setToggleCartCanvas }) => {
  const basket = useSelector((state) => state.Orders.basket)
  return (
    <div className={toggleCartCanvas ? 'pt-12 top-0 right-0 w-96 bg-white drop-shadow-2xl fixed h-full z-40 ease-in-out duration-500 flex flex-col gap-20' : "pt-5 top-0 w-96 bg-white drop-shadow-2xl fixed h-full z-40 ease-in-out duration-500 flex flex-col -right-full gap-20"}>
      <div className='w-full flex flex-col justify-center'>
        <button onClick={() => setToggleCartCanvas(!toggleCartCanvas)} className='border transition-all ease-in-out duration-300 hover:scale-110 bg-[#233043] hover:bg-white hover:text-inherit mb-10 w-3/4 self-center rounded-md h-10 text-white text flex items-center justify-center gap-5'><FontAwesomeIcon className='text-xl' icon={faArrowRightLong} /> Close</button>
      </div>
      <CartCanvasLabelCard />
      <div className='absolute bottom-0 '>
        <div className='mb-3 m-2 mx-5  rounded-lg w-64 h-48'>
          <textarea className='rounded-lg bg-[#233042] text-white p-5' placeholder='Notes...' name="" id="" cols="39" rows="6"></textarea>
        </div>
      </div>
    </div>
  )
}

export default CartCanvasDrawer



const CartCanvasLabelCard = () => {
  return (
    <div className='border-b-2 p-4 flex'>
      <div className='flex gap-24 mr-auto'>
        <h4 className='text-gray-500'>
          DOC #: <p className='inline-block text-black absolute left-[4.5rem]'>10445</p>
        </h4>
        <h4 className='text-gray-500'>
          Qty: <p className='inline-block text-black absolute left-[12.5rem]'>3</p>
        </h4>
      </div>
      <div>
        <button className='text-[#233043] hover:bg-[#233043] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full'><FontAwesomeIcon icon={faTrash} /></button>
      </div>
    </div>
  )
}