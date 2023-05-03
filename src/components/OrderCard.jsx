import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import orders from '~/testDB'

const OrderCard = ({ modalState, setModalState, date, status, labels }) => {

  // Open a modal when the edit button is clicked to display all labels in the order.
  // The thumbnail picture will just be the first label added to the order.

  // For Order status: Grab label status and use one of these colors:
  const statusColors = {
    'waiting for approval': 'bg-[#ef5350]',
    'processing': 'bg-[#ff9800]',
    'approved': 'bg-[#1baded]',
    'delivered': 'bg-[#63cb67]'
  }

  const statusDisplayText = {
    'waiting for approval': 'Waiting for approval',
    'approved': 'Approved',
    'processing': 'Processing',
    'delivered': 'Delivered'
  }

  const qty = labels.reduce((acc, label) => {
    return label.qty + acc
  }, 0)


  return (
      <div className='grid grid-cols-5 justify-items-center bg-white border-t py-5 justify-between hover:bg-slate-100'>
        <p>#000253</p>
        <p className=''>{qty}</p>
        <p className=''>{date}</p>
        <span className={`px-5 ${statusColors[status]} text-white rounded-lg max-h-8 flex items-center`}>{statusDisplayText[status]}</span>
        <div className='flex gap-5'>
          <button onClick={() => {setModalState(!modalState)}} className='text-[#233043] hover:bg-[#233043] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full'><FontAwesomeIcon icon={faPencil} /></button>
          <button className='text-[#233043] hover:bg-[#233043] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full'><FontAwesomeIcon icon={faTrash} /></button>
        </div>
      </div>
  )
}

export default OrderCard