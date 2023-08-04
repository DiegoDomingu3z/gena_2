import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsersInDepartment } from "../../../store/Departments/Thunks"
import { Formik, Field, Form } from "formik"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners"
import { Modal } from 'antd';
import DepartmentUserModal from "./DepartmentUserModal"

const DepartmentUsers = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const users = useSelector((state) => state.Department.users)
    const [deptName, setDeptName] = useState(null)
    const [activeUser, setActiveUser] = useState(null)
    const [modalState, setModalState] = useState(false);
    const account = useSelector((state) => state.Account.account)


    useEffect(() => {
        const { departmentId } = router.query
        const { name } = router.query
        if (departmentId) {
            dispatch(getUsersInDepartment(departmentId))
            setDeptName(name)
        }
    }, [router.query, modalState])



    const openModal = () => {
        setModalState(!modalState)
    }





    return (
        <div>
            {modalState && <DepartmentUserModal modalState={modalState} setModalState={setModalState} activeUser={activeUser} />}
            <div className="flex flex-col p-20 pb-8">
                <div className={""}>

                    <div className='flex items-end'>
                        <div className='mr-auto'><h1 className='text-3xl font-medium font-genaPrimary'>{deptName} | Team</h1></div>
                    </div>
                    <div className='mb-10 mt-5 border-t border-gray-300 rounded-full' />
                </div>
                <div className='bg-white p-5 rounded-md shadow-md overflow-auto h-[90rem] laptop:h-[44rem]'>
                    <div className="grid grid-cols-6 p-5 font-semibold border-b">
                        <div className="">Name</div>
                        <div>Department</div>
                        <div>Position</div>
                        <div>Group Lead</div>
                        <div>Team Lead</div>
                        <div>Email</div>
                    </div>
                    <div>
                    </div>

                    <div className={''}>
                        {
                            users.length > 0 ?

                                users.map((u) => (

                                    <div
                                        onClick={() => {
                                            if (account.privileges == 'admin') {
                                                openModal()
                                                setActiveUser(u)
                                            }
                                        }}
                                        className={'w-full grid grid-cols-6 p-5 border-b hover:bg-gray-100 transition-all ease-in-out cursor-pointer  justify-between'} key={u._id}>
                                        <span>{u.firstName} {u.lastName}</span>
                                        <span>{u.department}</span>
                                        <span>{u.privileges}</span>
                                        <span>{u.groupLead != ' ' || undefined ? u.groupLead : 'N/A'}</span>
                                        <span>{u.teamLead != ' ' || undefined ? u.teamLead : 'N/A'}</span>
                                        <span>{u.email ? u.email : 'N/A'}</span>
                                        {/* <div className="flex gap-5">
                                            <button className="text-[#233043] hover:bg-[#233043] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full"><FontAwesomeIcon icon={faPencil} /></button>
                                            <button className="text-[#233043] hover:bg-[#233043] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div> */}
                                    </div>
                                ))
                                :
                                <div className="flex justify-center">
                                    {deptName ?
                                        <div className="mt-60 text-lg font-bold antialiased">No users in {deptName}</div>
                                        :
                                        <div className="mt-60 ">
                                            <RingLoader color="#36d7b7" size={90} />
                                        </div>}
                                </div>


                        }
                    </div>
                </div>
            </div>

        </div >
    )
}

export default DepartmentUsers;