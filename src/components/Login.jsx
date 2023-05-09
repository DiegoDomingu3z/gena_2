import { useEffect } from 'react';
import Link from 'next/link';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/Account/thunks';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Login = () => {

    const dispatch = useDispatch()
    const router = useRouter()
    const user = useSelector((state) => state.Account)

    useEffect(() => {
        const token = sessionStorage.getItem('accessToken')
        token && router.push('/home')
    }, [user])


    return (
        <div className='h-full flex flex-col justify-center items-center gap-y-10'>
            <Image src="/images/GENA-Logo.png" className='bg-[#233043] rounded p-2' width={80} height={80} alt="GENA Image" />
            <div className='md:w-2/5 w-4/5 self-center justify-self-center bg-white rounded-xl p-5 drop-shadow-lg' >
                <Formik
                    initialValues={{
                        userName: '',
                        password: ''
                    }}
                    onSubmit={async (values) => {
                        dispatch(login(values))
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4 md:space-y-6" >
                            <div>
                                <div className='flex'>
                                    <label htmlFor='Username' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mr-auto">Username</label>
                                    {user.account === 'ACCOUNT DOES NOT EXISTS' && <p className='text-red-500 text-sm'>* User does not exist</p>}
                                </div>
                                <Field type="text" name="userName" id="userName" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${user.account === 'ACCOUNT DOES NOT EXISTS' && 'animate-wiggle border-red-500'}`} placeholder="Enter username" required="" />
                            </div>
                            <div>
                                <div className="flex">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mr-auto">Password</label>
                                    {user.account === 'INCORRECT Password' && <p className="text-red-500 text-sm">* Incorrect Password</p>}
                                </div>
                                <Field type="password" name="password" id="password" placeholder="••••••••" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${user.account === 'INCORRECT Password' && 'animate-wiggle border-red-500'}`} required="" />
                            </div>
                            <div className="flex items-center justify-between">
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button type='submit' disabled={isSubmitting} className="w-full text-white bg-[#1baded] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </Form>
                    )}

                </Formik>
            </div>
        </div>
    )
}

export default Login