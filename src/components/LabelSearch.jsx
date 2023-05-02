import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const LabelSearch = () => {

  return (
    <div className='w-full h-16 flex flex-col'>
        <div className='flex justify-end items-center mt-2 pr-16 pt-10 gap-5'>
          <FontAwesomeIcon className='p-3 rounded-full drop-shadow-sm bg-[#233042] text-white' icon={faMagnifyingGlass} />
          <input name='labelSearch' type="text" className='w-1/4 drop-shadow-md bg-white text-white focus:text-[#233042] rounded-md h-10 transition-all ease-in-out outline-none focus:drop-shadow-lg focus:translate-y-10 focus:w-2/5 p-5' placeholder='Type name of label here' />
        </div>
    </div>
  )
}

export default LabelSearch