import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../store/userLogin'
import { Formik, Form, Field } from 'formik'


const Login = () => {

    const dispatch = useDispatch();
    const userName = useSelector((state) => state)

    // const handleInput = (e) => {
    //     const value = e.target.value;
    //     dispatch({
    //         type: UPDATE_CURRENT_USER,
    //         payload: {
    //             [e.target.name]: value,
    //             ...currentUser,
    //         }
    //       });
    //     }
        
        


  return (
    <div className='md:w-2/5 w-4/5 self-center justify-self-center bg-white rounded-xl p-5 drop-shadow-lg'>
        <Formik 
            initialValues={{
                userName: "",
                password: ""
            }}
            onSubmit={async (values) => {
                dispatch(login(values))
            }}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4 md:space-y-6" action="http://localhost:4005/api/account/login">
                    <div>
                        <label htmlFor='Username' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <Field type="text" name="userName" id="userName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter username" required="" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <Field type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <Field id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                    </p>
                </Form>
            )}
        </Formik>
    </div>
  )
}

export default Login