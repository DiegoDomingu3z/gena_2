

import { Menu } from 'antd';
import { useState } from 'react';
import PrintShopApproved from './PrintShopApproved';
import { useSelector } from 'react-redux';

const PrintOrders = () => {
    const approvedOrders = useSelector((state) => state.PrintShop.approvedOrders)
    const processingOrders = useSelector((state) => state.PrintShop.processingOrders)
    const deliveredOrders = useSelector((state) => state.PrintShop.deliveredOrders)
    const [tab, setTab] = useState('approved-orders');
    const pickTab = (e) => {
        setTab(e.key);
    };

    return (
        <div className={"flex flex-col p-20"}>
            <div className='flex items-end'>
                <div className='mr-auto'><h1 className='text-3xl font-medium font-genaPrimary'>Print Orders</h1></div>
            </div>
            <div className='mb-2 mt-5 border-t border-gray-300 rounded-full' />
            <Menu onClick={pickTab} selectedKeys={[tab]} mode="horizontal">
                <Menu.Item className='absolute' key="approved-orders">Approved Orders
                    {approvedOrders.length > 0 ?
                        <span className='bg-red-500 p-1 rounded-full px-2 text-xs text-white absolute top-0'>{approvedOrders.length}</span>
                        : null
                    }
                </Menu.Item>
                <Menu.Item className='relative' key="processing-orders">Processing Orders
                    {processingOrders.length > 0 ?
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
                {tab == 'approved-orders' && <PrintShopApproved />}
            </div>
        </div>

    )
}


export default PrintOrders;