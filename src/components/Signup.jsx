import React from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field } from 'formik';
import { createAccount, login } from '../../store/Account/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';



const Signup = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const user = useSelector((state) => state.Account)
    const [inputValues, setInputValues] = useState({});

    const handleInput = (e) => {
        setInputValues((prev) => (
            {
                [e.target.name]: e.target.value,
                ...prev
            }
        ))
        console.log(inputValues)
    }


  return (
        <div className={'flex gap-y-10 flex-col justify-center items-center h-full'}>
            <Image src="/images/GENA-Logo.png" className='bg-[#233043] rounded p-2' width={80} height={80} alt="GENA Image" />
            <div className='flex w-4/5'>
                <Link href="/">
                    <button className='justify-self-start bg-white rounded-full px-4 py-2 drop-shadow-md transition-all ease-in-out duration-200 hover:bg-[#1baded] hover:text-white'>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                </Link>
                <div></div>
            </div>
            <div className={'md:w-4/5 w-4/5 self-center justify-self-center bg-white rounded-xl p-5 drop-shadow-lg'}>
                <Formik 
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        userName: '',
                        password: '',
                        department: '',
                        email: '',
                        teamLead: '',
                        privileges: 'team-member',
                        groupLead: '',
                        companyName: ''
                    }}
                    onSubmit={async (values) => {
                        await dispatch(createAccount(values))
                        const data = {
                            userName: values.userName,
                            password: values.password
                        }
                        await dispatch(login(data))
                        const token = sessionStorage.getItem('accessToken')
                        token && router.push('/')
                    }}
                >
                {({ isSubmitting }) => (
                    <Form className="space-y-4 md:space-y-6 flex flex-col">
                        <div className='flex justify-around gap-8'>
                            <div className='grow'>
                                <label htmlFor='firstName' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                <Field onChange={handleInput} type="text" name="firstName" id="firstName" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="First" required="" />
                            </div>
                            <div className='grow'>
                                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                <Field onChange={handleInput} type="text" name="lastName" id="lastName" placeholder="Last" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} required="" />
                            </div>
                        </div>
                        <div className='flex justify-around gap-8'>
                            <div className='grow'>
                                <label htmlFor='userName' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <Field type="text" name="userName" id="signupUserName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. JaneD" required="" />
                            </div>
                            <div className='grow'>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <Field type="password" name="password" id="signupPassword" placeholder="•••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                        </div>
                        <div className='flex justify-around gap-8'>
                            <div className='grow w-[11.5rem]'>
                                <label htmlFor='department' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                                <Field component='select' name="department" id="department" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. Marketing" required="">
                                    <option value="none">N/A</option>
                                    <option value="marketing">Marketing</option>
                                    <option value="sales">Sales</option>
                                    <option value="production">Production</option>
                                    <option value="engineering">Engineering</option>
                                    <option value="printShop">Print Shop</option>
                                </Field>
                            </div>
                            <div className='grow'>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <Field type="email" name="email" id="email" placeholder="e.g. johnd@inventive-group.com" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                        </div>
                        <div className='flex justify-around gap-8'>
                            <div className='grow'>
                                <label htmlFor='teamLead' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Team Lead</label>
                                <Field type="text" name="teamLead" id="teamLead" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. AlexR" required="" />
                            </div>
                            <div className='grow'>
                                <label htmlFor="groupLead" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group Lead</label>
                                <Field type="text" name="groupLead" id="groupLead" placeholder="e.g. BenC" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                        </div>
                        <div className='flex justify-around gap-8'>
                            <div className='grow'>
                                <label htmlFor='companyName' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
                                <Field component='select' type="text" name="companyName" id="companyName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. AlexR" required="" >
                                    <option value="none">N/A</option>
                                    <option value="IG">IG</option>
                                    <option value="IWS">IWS</option>
                                </Field>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            {user.account === 'ACCOUNT DOES NOT EXISTS' && <p className="text-red-500 text-sm">* Please fill out all fields</p>}
                            {user.account === 'INCORRECT Password' && <p className="text-red-500 text-sm">* Username already exists</p>}
                        </div>
                        <button disabled={isSubmitting} type='submit' className="w-44 self-center text-white bg-[#1baded] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
                    </Form>
                )}
                </Formik>
            </div>
        </div>
  )
}

export default Signup