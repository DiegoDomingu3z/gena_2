import React from 'react'
import { useEffect } from 'react';
import Link from 'next/link';
import Layout from '~/components/Layout'
import { useLoginInput, useLoginInputUpdate, useSignupLogin, useSubmitLogin } from '~/Contexts/LoginContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
    const userInputs = useLoginInput();
    const updateInputs = useLoginInputUpdate();
    const logUserIn = useSubmitLogin();
    const signUserUp = useSignupLogin();
    const user = userInputs.user;
    const loginState = userInputs.loginState;
    const setLoginState = userInputs.setLoginState;



    // useEffect(() => {
    //     console.log(userInputs.userInputs)
    // }, [userInputs])

  return (
        <div className={'flex gap-10 flex-col justify-center items-center h-full'}>
            <div className='flex w-4/5'>
                <Link href="/">
                    <button className='justify-self-start bg-white rounded-full px-4 py-2 drop-shadow-md transition-all ease-in-out duration-200 hover:bg-[#1baded] hover:text-white'>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                </Link>
            </div>
            <div className={'md:w-4/5 w-4/5 self-center justify-self-center bg-white rounded-xl p-5 drop-shadow-lg'}>
                <form className="space-y-4 md:space-y-6 flex flex-col" onSubmit={signUserUp}>
                    <div className='flex justify-around gap-8'>
                        <div className='grow'>
                            <label htmlFor='firstName' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                            <input type="text" onChange={updateInputs} name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First" required="" />
                        </div>
                        <div className='grow'>
                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                            <input type="text" onChange={updateInputs} name="lastName" id="lastName" placeholder="Last" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                    </div>
                    <div className='flex justify-around gap-8'>
                        <div className='grow'>
                            <label htmlFor='userName' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="text" onChange={updateInputs} name="userName" id="signupUserName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. JaneD" required="" />
                        </div>
                        <div className='grow'>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" onChange={updateInputs} name="password" id="signupPassword" placeholder="•••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                    </div>
                    <div className='flex justify-around gap-8'>
                        <div className='grow w-[11.5rem]'>
                            <label htmlFor='department' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                            <select onChange={updateInputs} name="department" id="department" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. Marketing" required="">
                                <option value="none">N/A</option>
                                <option value="marketing">Marketing</option>
                                <option value="sales">Sales</option>
                                <option value="production">Production</option>
                                <option value="engineering">Engineering</option>
                                <option value="printShop">Print Shop</option>
                            </select>
                        </div>
                        <div className='grow'>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" onChange={updateInputs} name="email" id="email" placeholder="e.g. johnd@inventive-group.com" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                    </div>
                    <div className='flex justify-around gap-8'>
                        <div className='grow'>
                            <label htmlFor='teamLead' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Team Lead</label>
                            <input type="text" onChange={updateInputs} name="teamLead" id="teamLead" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. AlexR" required="" />
                        </div>
                        <div className='grow'>
                            <label htmlFor="groupLead" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group Lead</label>
                            <input type="text" onChange={updateInputs} name="groupLead" id="groupLead" placeholder="e.g. BenC" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                    </div>
                    <div className='flex justify-around gap-8'>
                        <div className='grow'>
                            <label htmlFor='companyName' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
                            <select type="text" onChange={updateInputs} name="companyName" id="companyName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. AlexR" required="" >
                                <option value="none">N/A</option>
                                <option value="IG">IG</option>
                                <option value="IWS">IWS</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="signupRemember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div>
                    <button type='submit' className="w-44 self-center text-white bg-[#1baded] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
                </form>
            </div>
        </div>
  )
}

export default Signup