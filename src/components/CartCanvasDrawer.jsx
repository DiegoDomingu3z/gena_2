import React from 'react'
import { useCanvasDrawer } from '~/Contexts/canvasDrawerContext'


const CartCanvasDrawer = ({toggleCartCanvas, setToggleCartCanvas}) => {

  return (
    <div className={toggleCartCanvas ? 'pt-5 top-0 right-0 w-56 bg-[#233043] drop-shadow-2xl fixed h-full z-40 ease-in-out duration-500 flex flex-col' : "pt-5 top-0 w-56 bg-[#233043] drop-shadow-2xl fixed h-full z-40 ease-in-out duration-500 flex flex-col -right-full"}>
        <button className='text-white' onClick={() => setToggleCartCanvas(!toggleCartCanvas)}>X</button>
      <div className='w-full flex justify-center mb-20'>
        <p className="text-white">Display orders and whatnot here</p>
      </div>
    </div>
  )
}

export default CartCanvasDrawer