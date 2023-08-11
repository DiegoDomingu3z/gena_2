import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { getMyOrders, getOrdersToApprove, removeOrder, setActiveOrder } from '../../store/Orders/thunks'
import { Tooltip } from 'antd'
import Swal from 'sweetalert2'


const OrderCard = ({ deleted, setDeleted, modalState, setModalState, blobs, setBlobs, toggleSort }) => {
  const dispatch = useDispatch();
  // const [selectedOrder, setSelectedOrder] = useState();
  let order = useSelector((state) => state.Orders.myOrders.orders)
  const activeOrder = useSelector((state) => state.Orders.activeOrder)

  const statusColors = {
    'waiting for approval': 'bg-[#ef5350]',
    'processing': 'bg-[#ff9800]',
    'approved': 'bg-[#1baded]',
    'delivered': 'bg-[#63cb67]',
    'declined': 'bg-[#fb3939]'
  }


  const deleteOrder = async (id) => {
    const token = sessionStorage.getItem('accessToken')
    Swal.fire({
      title: `Remove Order: <br> ${id}?`,
      text: "You will not be able to revert this",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let timerInterval
        await Swal.fire({
          title: `Deleting Order: <br> ${id}`,
          html: 'This may take some time <br> <b></b> Seconds left.',
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        })
        dispatch(removeOrder({ id, token }))
        setDeleted(!deleted)
      }
    })

  }
  useEffect(() => {
    const getOrders = async () => {
      const token = sessionStorage.getItem('accessToken')
      await dispatch(getMyOrders(token))
      await dispatch(getOrdersToApprove(token))
    }
    console.log("GETTING CALLED")
    getOrders()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleUpdateModal = async (id) => {

    const orderId = id

    const singleOrder = await order.filter((order) => {
      return order._id == orderId
    })

    await dispatch(setActiveOrder(singleOrder))
    setModalState(!modalState)
  }

  return (
    <div className='p-5'>
      {order ?
        (toggleSort === 'newest' ? [...order].sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn)) : order).map((o) => {
          return(

            <div className='grid grid-cols-5 justify-items-center bg-white border-t py-5 justify-between hover:bg-slate-100 pl-2' key={o._id}>
            <p className='text-sm'>{o._id}</p>
            <p className=''>{o.labels.length}</p>
            <p className=''>{formatDate(o.createdOn)}</p>
            <span className={`px-5 ${statusColors[o.status]} text-white rounded-lg max-h-8 flex items-center text-sm`}>{o.status}</span>
            <div className='flex gap-5 w-32 place-self-end'>
              <Tooltip placement='top' title="Edit Order">
                <button

                  onClick={() => {
                    setBlobs([])
                    handleUpdateModal(o._id)
                  }}
                  data-order-id={o._id} className={`text-[#233043] hover:bg-[#ff9800] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full ${(o.status === 'processing' || o.status === 'delivered') && 'pointer-events-none'}`}>
                  <FontAwesomeIcon icon={faPencil} /></button>
              </Tooltip>
              <Tooltip placement='top' title="Delete Order">
                <button
                  onClick={() => deleteOrder(o._id)} className={`text-[#233043] hover:bg-[#ff1b1b] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full ${o.status === 'processing' && 'pointer-events-none'}`}><FontAwesomeIcon icon={faTrash} /></button>
              </Tooltip>
              {o.notes ?
                <Tooltip placement="top" title={o.notes}>
                  <button className='text-[#233043] hover:bg-[#233043] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full'>
                    <FontAwesomeIcon icon={faNoteSticky} />
                  </button>
                </Tooltip>
                : null
              }
            </div>

          </div>
              )
})

        : null


      }

    </div>
  )
}

export default OrderCard