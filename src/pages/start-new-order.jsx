import React from 'react'
import Layout from '~/components/Layout'
import LabelSearch from '~/components/LabelSearch'
import LabelCard from '~/components/LabelCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


const startNewOrder = () => {
  
  // const labelCards = () => {
  //   write some logic here that gets all Labels
  //   labels.map((label) => {
  //     return (
  //       <LabelCard />
  //     )
  //   })
  // }

  return (
    <Layout title={"Gena | New Order"}>
      <div className={"flex flex-col p-20"}>
        <div className='flex items-end'>
          <div className='mr-auto'><h1 className='text-3xl font-medium font-genaPrimary'>Labels</h1></div>
          <div className='flex justify-end items-end gap-5 w-2/5'>
            <FontAwesomeIcon className='p-3 rounded-full drop-shadow-sm bg-[#233042] text-white' icon={faMagnifyingGlass} />
            <input name='labelSearch' type="text" className='w-2/4 drop-shadow-md bg-white text-[#233042] rounded-md h-10 transition-all ease-in-out outline-none focus:drop-shadow-lg focus:translate-y-10 focus:w-4/5 p-5' placeholder='Type name of label here' />
          </div>
        </div>
        <div className='mb-10 mt-5 border-t border-gray-300 rounded-full' />
        <div className='grid w-full h-full'>
          <LabelCard />
        </div>
    </div>
    </Layout>
  )
}

export default startNewOrder