import React, { useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getMaterials } from '../../../store/Material/Thunks'

const NewLabel = () => {
    const dispatch = useDispatch()
    const material = useSelector((state) => state.Material)

    // useEffect(() => {
    //     const token = sessionStorage.getItem('accessToken')
    //     dispatch(getMaterials(token))
    // }, [material])




    return (
        <div>
            <div className='bg-[#7490b9] h-20'>
                <h1 className='text-center pt-6 text-white text-2xl font-bold'>New Label Dashboard</h1>
            </div>
            <div className={'flex gap-10 flex-col items-center justify-center'}>
                <div className={'md:w-11/12 w-4/5 self-center justify-self-center bg-white rounded-xl p-5 drop-shadow-lg mt-10'}>
                    <Formik
                        initialValues={{
                            labelName: '',
                            fields: [],
                            maxOrderQty: 1,
                            docNum: '',
                            fileName: '',
                            isKanban: false,
                            unitPack: 1,
                            materialTypeId: ''
                        }}>
                        <Form>
                            <div className='flex justify-around gap-8'>
                                <div className='grow'>
                                    <label htmlFor='firstName' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Label Name: <span className='text-red-500'>*</span></label>
                                    <Field type="text" name="labelName" id="labelName" className="bg-gray-50 border border-gray-300
                                     text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                       dark:focus:border-blue-500" placeholder="label name..." required="" />
                                </div>
                                <div className='grow'>
                                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Document Number: <span className='text-red-500'>*</span></label>
                                    <Field type="text" name="docNum" id="docNum" placeholder="Doc#" className="bg-gray-50 border
                                     border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                     block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                      dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className='grow'>
                                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Order Qty: <span className='text-red-500'>*</span></label>
                                    <Field type="number" name="maxOrderQty" id="maxOrderQty" placeholder="max#" className="bg-gray-50 
                                    border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                    block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                    dark:focus:ring-blue-500 dark:focus:border-blue-500 " required="" />
                                </div>
                            </div>
                            <div className='flex justify-around gap-8 mt-10'>
                                <div className='grow'>
                                    <label htmlFor='unitPack' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Units Per Pack <span className='text-red-500'>*</span></label>
                                    <Field type="number" name="unitPack" id="signupUserName" className="bg-gray-50 border border-gray-300
                                     text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                                     dark:border-gray-600 dark:placeholder-gray-400
                                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="#..." required="" />
                                </div>
                                <div className='grow'>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Material Type <span className='text-red-500'>*</span></label>
                                    <Field component='select' name="materialTypeId" id="materialTypeId" className="bg-gray-50 border border-gray-300
                                     text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" >

                                    </Field>
                                </div>
                            </div>
                        </Form>

                    </Formik>
                </div>
            </div>

        </div>
    )
}

export default NewLabel