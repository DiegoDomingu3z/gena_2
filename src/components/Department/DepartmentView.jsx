import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import { createDepartment, removeDept, updateDepartmentName } from "../../../store/Departments/Thunks";
import Swal from "sweetalert2";
const DepartmentView = ({ triggerUseEffect, setTriggerUseEffect }) => {
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


    const updateDeptModal = async (id, name) => {
        const token = sessionStorage.getItem('accessToken')
        const { value: newName } = await Swal.fire({
            title: `Update ${name}'s name?`,
            html: `This will update everyone's account in this department with the new name`,
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            inputValue: name,
            inputValidator: (value) => {
                if (!value) {
                    return 'If You are not changing the name, please press cancel'
                }
            },
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Update'
        })
        if (newName) {
            let timerInterval
            let seconds = await Math.floor(Math.random() * 8) + 1;
            const milliseconds = await seconds * 1000;
            await Swal.fire({
                title: `Updating Department: <b>${name} </b> to <b>${newName}</b>`,
                html: 'This may take a couple of seconds, system is changing multiple account information with new data <br> <b></b>',
                timer: milliseconds,
                timerProgressBar: true,
                allowOutsideClick: () => {
                    const popup = Swal.getPopup()
                    popup.classList.remove('swal2-show')
                    setTimeout(() => {
                        popup.classList.add('animate__animated', 'animate__headShake')
                    })
                    setTimeout(() => {
                        popup.classList.remove('animate__animated', 'animate__headShake')
                    }, 500)
                    return false
                },
                didOpen: () => {
                    dispatch(updateDepartmentName({ token, id, newName }))
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)

                }
            })

            setTriggerUseEffect(!triggerUseEffect)
        }


    }

    const deleteDepartment = async (id, name) => {
        const token = sessionStorage.getItem('accessToken')
        Swal.fire({
            title: `Delete entire Department: ${name}`,
            html: `<b>This will delete <u>ALL USERS</u> inside this department!</b> <br> 
            If you want to keep certain users in the system please move them to other departments before performing this action`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then(async (result) => {
            if (result.isConfirmed) {

                let timerInterval
                let seconds = await Math.floor(Math.random() * 8) + 1;
                const milliseconds = await seconds * 1000;
                await Swal.fire({
                    title: `Deleting Department: <b>${name} </b> and all users inside of it`,
                    html: 'This may take a couple of seconds, system is deleting multiple account information<br> <b></b>',
                    timer: milliseconds,
                    timerProgressBar: true,
                    allowOutsideClick: () => {
                        const popup = Swal.getPopup()
                        popup.classList.remove('swal2-show')
                        setTimeout(() => {
                            popup.classList.add('animate__animated', 'animate__headShake')
                        })
                        setTimeout(() => {
                            popup.classList.remove('animate__animated', 'animate__headShake')
                        }, 500)
                        return false
                    },
                    didOpen: () => {
                        dispatch(removeDept({ token, id }))
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)

                    }
                })
                setTriggerUseEffect(!triggerUseEffect)
            }
        })
    }


    return (
        <div className="flex flex-col pl-20 pr-20 pt-20 pb-4">
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

                                    <div className="flex gap-2">
                                        <button className="text-[#233043] hover:bg-[#ff9800] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full"
                                            onClick={(event) => {
                                                event.stopPropagation(); // Stop propagation here
                                                updateDeptModal(d._id, d.name)
                                            }}>
                                            <FontAwesomeIcon icon={faPencil} />
                                        </button>
                                        <button className="text-[#233043] hover:bg-[#fa2222] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full"
                                            onClick={(event) => {
                                                deleteDepartment(d._id, d.name)
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