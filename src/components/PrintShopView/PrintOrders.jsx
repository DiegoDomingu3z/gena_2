

import { Menu } from 'antd';
import { useState } from 'react';
import PrintShopApproved from './PrintShopApproved';
import { useSelector } from 'react-redux';
import { PrinterOutlined } from '@ant-design/icons';
import ProcessingOrders from './ProcessingOrders';
const PrintOrders = () => {
    const approvedOrders = useSelector((state) => state.PrintShop.approvedOrders.orders)
    const processingOrders = useSelector((state) => state.PrintShop.processingOrders.orders)
    const deliveredOrders = useSelector((state) => state.PrintShop.deliveredOrders)
    const [multipleOrders, setMultipleOrders] = useState([])
    const [deliverMultipleOrders, setDeliverMultipleOrders] = useState([])
    const [tab, setTab] = useState('approved-orders');
    const pickTab = (e) => {
        setTab(e.key);
    };

    return (
        <div className={"flex flex-col p-20"}>
            <div className='flex justify-between'>
                <div className='mr-auto flex'><h1 className='text-3xl font-medium font-genaPrimary'>Print Orders</h1></div>
                {multipleOrders.length > 0 ? <div><button className='bg-[#1baded] text-white px-4 py-1 rounded-full'>Print Bulk <PrinterOutlined className='' /> </button></div> : null}
            </div>
            <div className='mb-2 mt-5 border-t border-gray-300 rounded-full' />
            <Menu onClick={pickTab} selectedKeys={[tab]} mode="horizontal">
                <Menu.Item className='absolute' key="approved-orders">Approved Orders
                    {approvedOrders ?
                        <span className='bg-red-500 p-1 rounded-full px-2 text-xs text-white absolute top-0'>{approvedOrders.length}</span>
                        : null
                    }
                </Menu.Item>
                <Menu.Item className='relative' key="processing-orders">Processing Orders
                    {processingOrders ?
                        <span className='bg-red-500 p-1 rounded-full px-2 text-xs text-white absolute top-0'>{processingOrders.length}</span>
                        : null
                    }
                </Menu.Item>
                <Menu.Item className='relative' key="delivered-orders">Delivered Orders
                    {deliveredOrders.length > 0 ?
                        <span className='bg-red-500 p-1 rounded-full px-2 text-xs text-white absolute top-0'>{deliveredOrders.length}</span>
                        : null
                    }
                </Menu.Item>
            </Menu>
            <div>
                {tab == 'approved-orders' && <PrintShopApproved multipleOrders={multipleOrders} setMultipleOrders={setMultipleOrders} />}

                {tab == 'processing-orders' && <ProcessingOrders deliverMultipleOrders={deliverMultipleOrders} setDeliverMultipleOrders={setDeliverMultipleOrders} />}
            </div>
        </div>

    )
}


export default PrintOrders;