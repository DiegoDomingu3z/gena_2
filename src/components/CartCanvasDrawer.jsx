import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'


const CartCanvasDrawer = ({toggleCartCanvas, setToggleCartCanvas}) => {

  return (
    <div className={toggleCartCanvas ? 'pt-5 top-0 right-0 w-96 bg-white drop-shadow-2xl fixed h-full z-40 ease-in-out duration-500 flex flex-col' : "pt-5 top-0 w-96 bg-white drop-shadow-2xl fixed h-full z-40 ease-in-out duration-500 flex flex-col -right-full"}>
      <div className='w-full flex flex-col justify-center'>
        <button onClick={() => setToggleCartCanvas(!toggleCartCanvas)} className='border transition-all ease-in-out duration-300 hover:scale-110 bg-[#233043] hover:bg-white hover:text-inherit mb-10 w-3/4 self-center rounded-md h-10 text-white text flex items-center justify-center gap-5'><FontAwesomeIcon className='text-xl' icon={faArrowRightLong} /> Close</button>
      </div>
      <CartCanvasLabelCard />
    </div>
  )
}

export default CartCanvasDrawer



const CartCanvasLabelCard = () => {
  return (
    <div>
      <div>

      </div>
    </div>
  )
}