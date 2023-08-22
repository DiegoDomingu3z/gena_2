import React, { useEffect } from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field } from 'formik';
import { createAccount, login } from '../../store/Account/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import { getDepartments, getGroupLead, getLeads } from '../../store/Departments/Thunks';
import Swal from 'sweetalert2';
import { sendCredentials } from '../../store/Emails/Thunks';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';


const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const user = useSelector((state) => state.Account)
    const dept = useSelector((state) => state.Department.departments)
    const leads = useSelector((state) => state.Department.leads)
    const groupLeads = useSelector((state) => state.Department.groupLeads)
    const router = useRouter()
    useEffect(() => {
        dispatch(getDepartments())
        dispatch(getLeads())
        dispatch(getGroupLead())
    }, [])



    console.log(groupLeads, 'leads')
    const toast = async (firstName, lastName, departmentId) => {
        console.log(dept)
        const dep = dept.filter(d => d._id == departmentId)
        console.log(dep)
        Swal.fire({
            toast: true,
            title: `${firstName} ${lastName} is now part of the ${dep[0].name} team`,
            position: 'center',
            showConfirmButton: true,
            confirmButtonText: `Go to ${dep[0].name} team`,
            iconColor: 'white',
            confirmButtonColor: '#28aeeb',
            timer: 6000,
            customClass: {
                popup: 'colored-toast',
                container: 'addToCartToast'
            },
            timerProgressBar: true,
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                router.push(`/Department-Users?departmentId=${departmentId}&name=${dep[0].name}`)
            }
        })
    }

    const sendUserCredentials = (data) => {
        const token = user.accessToken
        dispatch(sendCredentials({ data, token }))
    }


    return (
        <div className={'flex gap-y-10 flex-col justify-center items-center h-full'}>
            <div className={'md:w-4/5 w-4/5 self-center justify-self-center bg-white rounded-xl p-5 drop-shadow-lg'}>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        userName: '',
                        password: '',
                        departmentId: '',
                        email: '',
                        teamLeadId: '',
                        privileges: '',
                        groupLeadId: '',
                    }}
                    onSubmit={async (values) => {
                        console.log(values)
                        dispatch(createAccount(values))
                            .then((res) => {
                                toast(values.firstName, values.lastName, values.departmentId)
                                // if (values.email != '') {
                                //     sendUserCredentials(values)
                                // }
                            }).catch((error) => {
                                console.log(error);
                            });
                        document.getElementById('sign-up-form').reset()
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form id='sign-up-form' className="space-y-4 md:space-y-6 flex flex-col">
                            <div className='flex justify-around gap-8'>
                                <div className='grow'>
                                    <label htmlFor='firstName' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name <span className='text-red-500'>*</span></label>
                                    <Field type="text" name="firstName" id="firstName"
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                    block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                     dark:focus:border-blue-500`} placeholder="First" required />
                                </div>
                                <div className='grow'>
                                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name <span className='text-red-500'>*</span></label>
                                    <Field type="text" name="lastName" id="lastName" placeholder="Last"
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} required />
                                </div>
                            </div>
                            <div className='flex justify-around gap-8'>
                                <div className='grow'>
                                    <label htmlFor='userName' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username <span className='text-red-500'>*</span></label>
                                    <Field type="text" name="userName" id="signupUserName"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. JaneD" required />
                                </div>
                                <div className='grow'>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password <span className='text-red-500'>*</span></label>
                                    <div className='relative'><Field type={showPassword ? 'text' : 'password'} name="password" id="signupPassword" placeholder="•••••••••" className="bg-gray-50 border
                                     border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full 
                                     p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                      dark:focus:border-blue-500" required />{!showPassword && <FontAwesomeIcon className='absolute top-[35%] right-[10%] laptop:right-[6%] hover:cursor-pointer' onClick={() => setShowPassword(true)} icon={faEye} />}{showPassword && <FontAwesomeIcon className='absolute top-[35%] right-[9.9%] laptop:right-[5.9%] hover:cursor-pointer' onClick={() => setShowPassword(false)} icon={faEyeSlash} />}</div>
                                </div>
                            </div>
                            <div className='flex justify-around gap-8'>
                                <div className='grow w-[11.5rem]'>
                                    <label htmlFor='departmentId' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department <span className='text-red-500'>*</span></label>
                                    <Field component='select' name="departmentId" id="departmentId"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                                      focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. Marketing" required>
                                        <option value="" >Select Department</option>
                                        {dept ?
                                            dept.map((d) => (
                                                <option value={d._id} key={d._id}>{d.name}</option>
                                            )) : null
                                        }

                                    </Field>
                                </div>
                                <div className='grow'>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <Field type="email" name="email" id="email" placeholder="e.g. johnd@inventive-group.com" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                            </div>
                            <div className='flex justify-around gap-8'>
                                <div className='grow'>
                                    <label htmlFor='teamLeadId' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Team Lead</label>
                                    <Field type="text" name="teamLeadId" id="teamLeadId" component='select'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                                    w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                     dark:focus:border-blue-500">
                                        <option value="" selected >Select Team Lead</option>
                                        {leads ?
                                            leads.map((l) => (
                                                <option key={l._id} value={l._id}>{l.firstName} {l.lastName}</option>
                                            )) : null
                                        }

                                    </Field>
                                </div>
                                <div className='grow'>
                                    <label htmlFor="groupLead" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group Lead</label>
                                    <Field type="text" name="groupLeadId" id="groupLeadId" component='select'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                                    w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                     dark:focus:border-blue-500">
                                        <option value="" selected >Select Group Lead</option>
                                        {groupLeads ?
                                            groupLeads.map((g) => (
                                                <option key={g._id} value={g._id}>{g.firstName} {g.lastName}</option>
                                            )) : null

                                        }
                                    </Field>
                                </div>
                            </div>
                            <div>
                                <div className='grow'>
                                    <label htmlFor="groupLead" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Privileges <span className='text-red-500'>*</span></label>
                                    <Field type="text" name="privileges" id="privileges" component='select' required
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                                    w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                     dark:focus:border-blue-500">
                                        <option value="" selected disabled >Select Privileges</option>
                                        <option value="admin"  >Admin</option>
                                        <option value="group-lead">Group Lead</option>
                                        <option value="printshop"  >PrintShop</option>
                                        <option value="team-lead"  >Team Lead</option>
                                        <option value="team-member"  >Team Member</option>
                                    </Field>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                {user.account === 'ACCOUNT DOES NOT EXISTS' && <p className="text-red-500 text-sm">* Please fill out all fields</p>}
                                {user.account === 'INCORRECT Password' && <p className="text-red-500 text-sm">* Username already exists</p>}
                            </div>
                            <button disabled={isSubmitting} type='submit'
                                className="w-44 self-center text-white bg-[#1baded] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 
                                font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Signup