import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import { createDepartment } from "../../../store/Departments/Thunks";
const DepartmentView = () => {
    const dept = useSelector((state) => state.Department.departments)
    const router = useRouter()
    const user = useSelector((state) => state.Account)

    const dispatch = useDispatch()
    const showUsers = (id, name) => {
        const queryParams = {
            departmentId: id,
            name: name
        };
        router.push({
            pathname: "/Department-Users",
            query: queryParams,
        });
    }

    const createDept = (data) => {
        const token = sessionStorage.getItem('accessToken')
        dispatch(createDepartment({ data, token }))
    }


    return (
        <div className="flex flex-col p-20 pb-8">
            <div>

                <div className='flex items-end'>
                    <div className='mr-auto'><h1 className='text-3xl font-medium font-genaPrimary'>Departments</h1></div>
                </div>
                <div className='mb-10 mt-5 border-t border-gray-300 rounded-full' />
            </div>
            <div className={'bg-white p-5 rounded-md shadow-md overflow-auto h-[90rem] laptop:h-[44rem]'}>
                {
                    dept ?
                        dept.map((d) => (
                            <div onClick={() => showUsers(d._id, d.name)}
                                className={'w-full p-5 border-b hover:bg-gray-100 transition-all ease-in-out cursor-pointer flex justify-between'} key={d._id}>
                                <span>{d.name}</span>
                                {user.account.privileges == 'admin' ?

                                    <div className="flex gap-5">
                                        <button className="text-[#233043] hover:bg-[#233043] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full"
                                            onClick={(event) => {
                                                event.stopPropagation(); // Stop propagation here

                                            }}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                    : null
                                }
                            </div>
                        ))
                        :
                        <div className="mt-80 ">
                            <RingLoader color="#36d7b7" size={90} />
                        </div>
                }
            </div>
            <div className={(user.accessToken) && (user.account.privileges == 'admin') ? "flex flex-col mt-3" : "hidden"}>
                <Formik
                    initialValues={{
                        name: ''
                    }}
                    onSubmit={async (values) => {
                        console.log(values)
                        createDept(values)
                        document.getElementById('deptForm').reset()
                    }}>
                    {({ isSubmitting }) => (
                        <Form id="deptForm">
                            <div className="md:w-6/12 w-2/5 self-center justify-self-center flex">
                                <Field name="name" id="name" type="text" className="bg-gray-50 border border-gray-300
                                     text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                     dark:focus:border-blue-500" placeholder="Department Name" required />
                                <button className="bg-blue-300 px-5 ms-5 rounded-lg" type="submit" disabled={isSubmitting}>Submit</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default DepartmentView