import React from 'react'
import { Formik, Field, Form } from 'formik'
import { useState } from 'react';

const NewMaterial = () => {
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

                        }}
                        onSubmit={async (values) => {

                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form id='newLabelForm'>
                                <div className='flex justify-around gap-8'>
                                    <div className='grow'>
                                        <label htmlFor='firstName' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Material Name <span className='text-red-500'>*</span></label>
                                        <Field type="text" name="labelName" id="labelName" className="bg-gray-50 border border-gray-300
                                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                        dark:focus:border-blue-500" placeholder="" required />
                                    </div>
                                    <div className='grow'>
                                        <label htmlFor="docNum" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Something Else <span className='text-red-500'>*</span></label>
                                        <Field type="text" name="docNum" id="docNum" placeholder="" className="bg-gray-50 border
                                        border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                        dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>
                                    <div className='grow'>
                                        <label htmlFor="maxOrderQty" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Another Thing <span className='text-red-500'>*</span></label>
                                        <Field type="number" name="maxOrderQty" id="maxOrderQty" placeholder="" className="bg-gray-50 
                                        border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                        dark:focus:ring-blue-500 dark:focus:border-blue-500 " required />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-x-8 mt-10'>
                                    <div className=''>
                                        <label htmlFor='unitPack' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white underline"><a href="https://letmegooglethat.com/?q=Diego+is+a+goofball">Suspicious Link</a> <span className='text-red-500'>*</span></label>
                                        <Field type="number" name="unitPack" id="unitPack" className="bg-gray-50 border border-gray-300
                                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700
                                        dark:border-gray-600 dark:placeholder-gray-400
                                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" placeholder="" required />
                                    </div>
                                    <div className=''>
                                        <label htmlFor="materialTypeId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ANOTHER FIELD <span className='text-red-500'>*</span></label>
                                        <Field component='select' name="materialTypeId" id="materialTypeId" className="bg-gray-50 border border-gray-300
                                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700
                                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" required="" >
  
                                        </Field>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-x-8 mt-10'>

                                    <div className=''>
                                        <label htmlFor="materialType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">This is a lot of info<span className='text-red-500'>*</span></label>
                                        <Field component='select' name="categoryId" id="categoryId" className="bg-gray-50 border border-gray-300
                                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700
                                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" required >

                                        </Field>
                                    </div>
                                    <div className=''>
                                        <label htmlFor='unitPack' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lastoneipromise<span className='text-red-500'>*</span></label>
                                        <Field component='select' name="subCategoryId" id="subCategoryId" className="bg-gray-50 border border-gray-300
                                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700
                                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" required >

                                        </Field>
                                    </div>
                                </div>
                                <div className='flex justify-around gap-8 mt-10'>
                                    <div className='grow'>
                                        <div className='flex'>

                                        </div>
                                    </div>

                                </div>
                                <div>
                                    <div className='flex justify-between gap-8  '>
                                        
                                    </div>
                                </div>
                                <div className='text-end'><button className='bg-[#28aeeb] p-2 px-5 rounded-lg text-white' type='submit' >submit</button></div>
                            </Form>
                        )}

                    </Formik>
          </div>
      </div>
    </div>
  )
}

export default NewMaterial