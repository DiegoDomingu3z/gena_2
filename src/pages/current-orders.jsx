import React from 'react'
import Layout from '~/components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import OrderCard from '~/components/OrderCard'
import { api } from '../../axiosService'
import { useState } from 'react'
import { useEffect } from 'react'




const CurrentOrders = () => {
    // const [ordersArray, setOrdersArray] = useState(null);

//  $$$$$$\             $$\            $$$$$$\                  $$\                                     $$\   $$\                                     
// $$  __$$\            $$ |          $$  __$$\                 $$ |                                    $$ |  $$ |                                    
// $$ /  \__| $$$$$$\ $$$$$$\         $$ /  $$ | $$$$$$\   $$$$$$$ | $$$$$$\   $$$$$$\   $$$$$$$\       $$ |  $$ | $$$$$$\   $$$$$$\   $$$$$$\        
// $$ |$$$$\ $$  __$$\\_$$  _|        $$ |  $$ |$$  __$$\ $$  __$$ |$$  __$$\ $$  __$$\ $$  _____|      $$$$$$$$ |$$  __$$\ $$  __$$\ $$  __$$\       
// $$ |\_$$ |$$$$$$$$ | $$ |          $$ |  $$ |$$ |  \__|$$ /  $$ |$$$$$$$$ |$$ |  \__|\$$$$$$\        $$  __$$ |$$$$$$$$ |$$ |  \__|$$$$$$$$ |      
// $$ |  $$ |$$   ____| $$ |$$\       $$ |  $$ |$$ |      $$ |  $$ |$$   ____|$$ |       \____$$\       $$ |  $$ |$$   ____|$$ |      $$   ____|      
// \$$$$$$  |\$$$$$$$\  \$$$$  |       $$$$$$  |$$ |      \$$$$$$$ |\$$$$$$$\ $$ |      $$$$$$$  |      $$ |  $$ |\$$$$$$$\ $$ |      \$$$$$$$\       
//  \______/  \_______|  \____/        \______/ \__|       \_______| \_______|\__|      \_______/       \__|  \__| \_______|\__|       \_______| 



    // useEffect(() => {
    //     getOrders()
    // }, [])

    // const orderCard = ordersArray.map((order) => {
    //     return (
    //         <OrderCard
    //             key={order.createdOn}
    //             labels={order.labels}
    //         />
    //     )
    // })
    





  return (
    <Layout title={'Gena | Current Orders'}>
        <div className={"flex flex-col p-20"}>
            <div className='flex items-end'>
                <div className='mr-auto'><h1 className='text-3xl font-medium font-genaPrimary'>Current Orders</h1></div>
                <div className='flex justify-end items-end gap-5 w-2/5'>
                    <FontAwesomeIcon className='p-3 rounded-full drop-shadow-sm bg-[#233042] text-white w-4' icon={faMagnifyingGlass} />
                    <input name='orderSearch' type="text" className='laptop:w-2/4 w-4/5 drop-shadow-md bg-white text-[#233042] rounded-md h-10 transition-all ease-in-out outline-none focus:drop-shadow-lg focus:translate-y-10 focus:w-4/5 p-5' placeholder='Type name of label here' />
                </div>
            </div>
            <div className='mb-10 mt-5 border-t border-gray-300 rounded-full' />
            <div className='grid laptop:grid-cols-3 laptop:justify-items-center gap-y-12 w-full px-8 h-[95rem] laptop:h-[44rem] overflow-auto rounded-md laptop:border py-5'>
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
            </div>
        </div>
    </Layout>
  )
}

export default CurrentOrders