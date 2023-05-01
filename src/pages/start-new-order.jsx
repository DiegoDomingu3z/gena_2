import React from 'react'
import Layout from '~/components/Layout'
import LabelSearch from '~/components/LabelSearch'
import LabelCard from '~/components/LabelCard'


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
        <LabelSearch />
        <div className={"flex flex-col p-20"}>
        <div className='flex items-end'>
            <div className='mr-auto'><h1 className='text-3xl font-medium font-genaPrimary'>Labels</h1></div>
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