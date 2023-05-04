import React from 'react'
import Layout from '~/components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import OrderCard from '~/components/OrderCard'
import { api } from '../../axiosService'
import { useState, useEffect } from 'react'
import OrderModal from '~/components/OrderModal'
import orders from '~/testDB'





const CurrentOrders = () => {
    const [modalState, setModalState] = useState(false);


    const orderRow = orders.map((order) => {
        return (
            <OrderCard
                key={order.createdOn}
                modalState={modalState}
                setModalState={setModalState}
                date={order.createdOn}
                status={order.status}
                labels={order.labels}
            />
        )
    })



  return (
    <Layout title={'Gena | Current Orders'}>
        {modalState && <OrderModal modalState={modalState} setModalState={setModalState} />}
        <div className={"flex flex-col p-20"}>
            <div className='flex items-end'>
                <div className='mr-auto'><h1 className='text-3xl font-medium font-genaPrimary'>Current Orders</h1></div>
                <div className='flex justify-end items-end gap-5 w-2/5'>
                    <FontAwesomeIcon className='p-3 rounded-full drop-shadow-sm bg-[#233042] text-white w-4' icon={faMagnifyingGlass} />
                    <input name='orderSearch' type="text" className='laptop:w-2/4 w-4/5 drop-shadow-md bg-white text-[#233042] rounded-md h-10 transition-all ease-in-out outline-none focus:drop-shadow-lg focus:translate-y-10 focus:w-4/5 p-5' placeholder='Type name of label here' />
                </div>
            </div>
            <div className='mb-10 mt-5 border-t border-gray-300 rounded-full' />
            <div className='bg-white p-5 rounded-md shadow-md'>
                <h1 className='text-xl font-medium mb-10'>Orders</h1>
                <div className='grid grid-cols-5 justify-items-center font-medium mb-5'>
                    <h4>Order ID</h4>
                    <h4>Labels</h4>
                    <h4>Date</h4>
                    <h4>Status</h4>
                    <h4>Actions</h4>
                </div>
                <div className='flex flex-col'>
                    {orderRow}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CurrentOrders