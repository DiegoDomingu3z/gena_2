import React from 'react'
import Layout from '~/components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import OrderCard from '~/components/OrderCard'
import { api } from '../../axiosService'
import { useState, useEffect } from 'react'
import OrderModal from '~/components/OrderModal'
import orders from '~/testDB'
import { Menu } from 'antd';
import LeadsOrderApproval from '~/components/LeadsOrderApproval'
import { useSelector } from 'react-redux'




const CurrentOrders = () => {
    const [modalState, setModalState] = useState(false);
    const [tab, setTab] = useState('my-orders');
    const account = useSelector((state) => state.Account.account)

    const pickTab = (e) => {
        setTab(e.key);
    };


    return (
        <Layout title={'Gena | Current Orders'}>
            {modalState && <OrderModal modalState={modalState} setModalState={setModalState} />}
            <div className={"flex flex-col p-20"}>
                <div className='flex items-end'>
                    <div className='mr-auto'><h1 className='text-3xl font-medium font-genaPrimary'>Current Orders</h1></div>
                    <div className='flex justify-end items-end gap-5 w-2/5'>
                        <FontAwesomeIcon className='p-3 rounded-full drop-shadow-sm bg-[#233042] text-white w-4' icon={faMagnifyingGlass} />
                        <input name='orderSearch' type="text" className='laptop:w-2/4 w-4/5 drop-shadow-md bg-white text-[#233042] rounded-md h-10 transition-all ease-in-out outline-none focus:drop-shadow-lg focus:translate-y-10 focus:w-4/5 p-5' placeholder='Type order # here' />
                    </div>
                </div>

                <div className='mb-2 mt-5 border-t border-gray-300 rounded-full' />

                {
                    account.privileges == 'team-lead' || account.privileges == 'group-lead' ?
                        <div>
                            <div>
                                <Menu onClick={pickTab} selectedKeys={[tab]} mode="horizontal">
                                    <Menu.Item className='absolute' key="my-orders">My Orders
                                        <span className='bg-red-500 p-1 rounded-full px-2 text-xs text-white absolute top-0'>1</span>
                                    </Menu.Item>
                                    <Menu.Item className='relative' key="approve-order">Orders I need to approve
                                        <span className='bg-red-500 p-1 rounded-full px-2 text-xs text-white absolute top-0'>1</span></Menu.Item>
                                </Menu>
                            </div>
                            <div className='bg-white p-5 rounded-md shadow-md overflow-auto h-[90rem] laptop:h-[44rem]'>
                                <h1 className='text-xl font-medium mb-10'>My Orders</h1>
                                <div className='grid grid-cols-5 justify-items-center font-medium mb-5'>
                                    <h4>Order ID</h4>
                                    <h4>Labels</h4>
                                    <h4>Date</h4>
                                    <h4>Status</h4>
                                    <h4>Actions</h4>
                                </div>
                                <div className='flex flex-col'>
                                    {tab == 'my-orders' && <OrderCard />}
                                </div>
                                <div>
                                    {tab == 'approve-order' && <LeadsOrderApproval />}
                                </div>
                            </div>
                        </div>
                        :
                        <OrderCard />

                }

            </div>
        </Layout>
    )
}

export default CurrentOrders