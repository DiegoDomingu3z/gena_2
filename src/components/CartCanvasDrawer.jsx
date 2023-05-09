import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCanvasDrawer } from '~/Contexts/canvasDrawerContext'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong, faTrash } from '@fortawesome/free-solid-svg-icons'
import { getBasketLabels, removeFromBasket } from '../../store/Orders/thunks'


const CartCanvasDrawer = ({ toggleCartCanvas, setToggleCartCanvas }) => {
  return (
    <div className={toggleCartCanvas ? 'pt-6 top-0 right-0 w-96 bg-white drop-shadow-2xl fixed h-full z-40 ease-in-out duration-500 flex flex-col gap-5' : "pt-5 top-0 w-96 bg-white drop-shadow-2xl fixed h-full z-40 ease-in-out duration-500 flex flex-col -right-full gap-20"}>
      <div className='w-full flex flex-col justify-center mb-8'>
        <button onClick={() => setToggleCartCanvas(!toggleCartCanvas)}
          className='border transition-all ease-in-out duration-300 hover:scale-110 bg-[#233043] hover:bg-white hover:text-inherit w-3/4 self-center rounded-md h-10 text-white text flex items-center justify-center gap-5'><FontAwesomeIcon className='text-xl' icon={faArrowRightLong} /> Close</button>
      </div>
      <CartCanvasLabelCard toggleCartCanvas={toggleCartCanvas} />
      <div className='absolute bottom-8 w-full flex flex-col items-center'>
        <div className='mb-1 text-center rounded-lg w-full h-48'>
          <textarea className='rounded-lg bg-[#233042] text-white p-5 max-h-44 min-h-[6rem]' placeholder='Notes...' name="" id="" cols="40" rows="6"></textarea>
        </div>
        <div className='w-full flex flex-col justify-center'>
          <button className='bg-[#1baded] mx-3 p-3 rounded-xl text-white hover:bg-white border border-[#1baded] hover:text-[#1baded] transition-all ease-in-out'>Submit Order</button>
        </div>
      </div>
    </div>
  )
}

export default CartCanvasDrawer



const CartCanvasLabelCard = ({ toggleCartCanvas }) => {
  const dispatch = useDispatch()
  const basket = useSelector((state) => state.Orders.labelBasket)
  const labels = useSelector((state) => state.Label.activeLabels)
  const [basketLabels, setBasketLabels] = useState([])

  const removeFromOrder = (id) => {
    const filterBasketLabel = basketLabels.filter(b => b._id != id)
    setBasketLabels(filterBasketLabel)
    dispatch(removeFromBasket(id))
  }



  useEffect(() => {
    const getLabels = async () => {
      setBasketLabels([])
      for (let i = 0; i < basket.length; i++) {
        const label = basket[i];
        let showLabels = labels.filter(l => l._id == label.labelId)
        let labelObj = showLabels.shift()
        setBasketLabels(prevFiles => [...prevFiles, labelObj])

      }
    }
    getLabels()
    console.log(basket, 'basketss')
    console.log(basketLabels, 'basket labelss')
  }, [toggleCartCanvas])



  return (
    <div className='overflow-y-auto	h-3/5'>
      {basketLabels.length > 0 ?
        basketLabels.map((label, i) => (
          <div key={i}>
            <div className='flex justify-center'>
              <iframe className='rounded' src={`images/pdflabels/${label.categoryName}/${label.subCategoryName}/${label.fileName}`}
                width="80%" height="50%" frameborder="0" ></iframe>
            </div>
            <div className='border-b-2 p-4 flex mb-2'>
              <div className='flex gap-24 mr-auto'>
                <h4 className='text-gray-500'>
                  DOC #: <span className='ms-1 font-semibold'>{label.docNum}</span>
                </h4>
                <h4 className='text-gray-500'>
                  Qty: <span className='ms-1 font-semibold'>{basket[i].qty}</span>
                </h4>
              </div>
              <div>
                <button className='text-[#233043] hover:bg-[#233043] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full' key={label._id} onClick={() => removeFromOrder(label._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        ))
        :
        <div className='flex flex-col w-full justify-center h-80 mt-20'>
          <div className='text-center text-xl text-semibold animate-bounce'>
            No Labels in Cart
          </div>
        </div>
      }
    </div>
  )
}