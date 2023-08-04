import React from 'react'
import { Formik, Field, Form } from 'formik'
import { useState } from 'react';
import { createNewMaterial } from '../../../store/Material/Thunks';
import { useDispatch, useSelector } from 'react-redux'

const NewMaterial = () => {
  const dispatch = useDispatch();
  const materials = useSelector((state) => state.Material)
  console.log(materials.materials)
  const [inputValues, setInputValues] = useState(['']);
  return (
      <div className={"flex flex-col pt-20 pr-20 pl-20"}>
      <div className='flex items-end'>
          <div className='mr-auto'><h1 className='text-3xl font-medium font-genaPrimary'>Create A New Material</h1></div>
      </div>
      <div className='mb-10 mt-5 border-t border-gray-300 rounded-full' />
      <div className={'flex gap-10 flex-col items-center overflow-auto h-[90rem] laptop:h-[44.5rem] pb-5'}>
          <div className={'laptop:w-3/5 w-4/5 self-center justify-self-center bg-white rounded-xl p-5 drop-shadow-lg'}>
          <Formik
                        initialValues={{
                            name: ''
                        }}
                        onSubmit={async (values) => {
                            const token = sessionStorage.getItem('accessToken');
                            console.log(values)
                            dispatch(createNewMaterial({token, values}))
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form id='newLabelForm'>
                                <div className='flex justify-around gap-8'>
                                    <div className='grow'>
                                        <label htmlFor='name' className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">New Material Name</label>
                                        <Field type="text" name="name" id="materialName" className="bg-gray-50 border border-gray-300
                                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                        dark:focus:border-blue-500" placeholder='e.g. "Plutonium"' required />
                                    </div>
                                    
                                </div>
                                <div className='w-full'><button className='bg-[#28aeeb] w-full mt-5 p-2 px-5 rounded-lg text-white' type='submit' >submit</button></div>
                            </Form>
                        )}

                    </Formik>
                    <div className='mt-20'>
                        <div className='text-xl font-medium'>
                            Materials
                        </div>
                        <div className='mb-10 mt-5 border-t border-gray-300 rounded-full' />
                        <div>
                            Put Material Card Components down here
                        </div>
                    </div>
          </div>
      </div>
    </div>
  )
}

export default NewMaterial