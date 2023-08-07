import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Formik, Field, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartments, getGroupLead, getLeads } from '../../../store/Departments/Thunks'
import { updateUser } from '../../../store/Account/thunks'
import Swal from 'sweetalert2'


const DepartmentUserModal = ({ modalState, setModalState, activeUser }) => {
  const dept = useSelector((state) => state.Department.departments)
  const leads = useSelector((state) => state.Department.leads)
  const groupLeads = useSelector((state) => state.Department.groupLeads)
  const dispatch = useDispatch()
  const cleanImg = (string) => {
    const pattern = /\([^()]*\)/g;
    const cleanString = string.replace(pattern, '');
    return cleanString.trim();
  }
  useEffect(() => {
    dispatch(getDepartments())
    dispatch(getLeads())
    dispatch(getGroupLead())
  }, [])

  const dataForSubmission = {
    firstName: activeUser.firstName,
    lastName: activeUser.lastName,
    userName: activeUser.userName,
    password: '',
    departmentId: activeUser.departmentId,
    email: activeUser.email,
    privileges: activeUser.privileges,
    groupLeadId: activeUser.groupLeadId,
    teamLeadId: activeUser.teamLeadId
  }

  const successToast = async () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast',
        container: 'addToCartToast',
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
    await Toast.fire({
      icon: 'success',
      title: 'User Updated!'
    })
  }
  const failureToast = async () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      iconColor: 'orange',
      customClass: {
        popup: 'colored-toast',
        container: 'addToCartToast',
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
    await Toast.fire({
      icon: 'warning',
      title: 'No Data Changed!'
    })
  }
  return (
    <div className='absolute left-0 w-screen h-screen laptop:h-screen bg-slate-400 bg-opacity-80 z-40 backdrop-blur-sm flex justify-center items-center'>
      <div className='bg-[#f7f9fc] w-4/5 laptop:w-3/5 laptop:h-[44rem] h-[88rem] rounded-lg px-10 py-5 flex flex-col'>
        <button onClick={() => setModalState(!modalState)} className='text-2xl self-end hover:bg-[#233043] rounded-full h-8 w-8 hover:text-white transition-all ease-in-out'><FontAwesomeIcon icon={faXmark} /></button>
        <div className='flex mb-5'>
          <img src={`http://internalweb/wp-content/uploads/${cleanImg(activeUser.firstName)}-${activeUser.lastName}.jpg`} alt={`Employee image`} className='h-14 ms-3 rounded-lg' />
          <h1 className='font-medium text-xl mt-5 ms-3'>{activeUser.firstName} {activeUser.lastName}</h1>
        </div>

        <Formik
          initialValues={dataForSubmission}

          onSubmit={async (values) => {
            const token = sessionStorage.getItem("accessToken")
            const id = activeUser._id
            if(JSON.stringify(dataForSubmission) != JSON.stringify(values)){
              dispatch(updateUser({ token, id, values }))
              successToast()
              setModalState(!modalState)
              return
            }
            failureToast()
          }}>
          {({ isSubmitting }) => (
            <Form>
              <div className={`grid justify-items-center gap-8 laptoplg:grid-cols-3 grid-cols-2 max-h-[80rem]`}>
                <div className='grow w-full'>
                  <label htmlFor='firstName' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name <span className='text-red-500'>*</span></label>
                  <Field type="text" name="firstName" id="firstName"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                  dark:focus:border-blue-500`} placeholder="First" required />
                </div>
                <div className='grow w-full'>
                  <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name <span className='text-red-500'>*</span></label>
                  <Field type="text" name="lastName" id="lastName" placeholder="Last"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} required />
                </div>
                <div className='grow w-full'>
                  <label htmlFor='userName' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username <span className='text-red-500'>*</span></label>
                  <Field type="text" name="userName" id="signupUserName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. JaneD" required />
                </div>
                <div className='grow w-full'>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Set New Password</label>
                  <Field type="password" name="password" id="signupPassword" placeholder="•••••••••" className="bg-gray-50 border
                                     border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full 
                                     p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                     dark:focus:border-blue-500"  />
                </div>
                <div className='grow w-full'>
                  <label htmlFor='departmentId' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department <span className='text-red-500'>*</span></label>
                  <Field component='select' name="departmentId" id="departmentId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. Marketing" required>
                    <option value={activeUser.departmentId} selected >{activeUser.department}</option>
                    {dept ?
                      dept.map((d) => (
                        <option value={d._id} key={d._id}>{d.name}</option>
                      )) : null
                    }

                  </Field>
                </div>
                <div className='grow w-full'>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <Field type="email" name="email" id="email" placeholder="e.g. johnd@inventive-group.com" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div className='grow w-full'>
                  <label htmlFor='teamLeadId' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Team Lead</label>
                  <Field type="select" name="teamLeadId" id="teamLeadId" component='select'
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
                <div className='grow w-full'>
                  <label htmlFor="groupLead" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group Lead</label>
                  <Field type="select" name="groupLeadId" id="groupLeadId" component='select'
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                                    w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                     dark:focus:border-blue-500">
                    <option value="" disabled >Select Group Lead</option>
                    {groupLeads ?
                      groupLeads.map((g) => (
                        <option key={g._id} value={g._id}>{g.firstName} {g.lastName}</option>
                      )) : null

                    }

                  </Field>
                </div>
                <div className='grow w-full'>
                  <label htmlFor="groupLead" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Privileges <span className='text-red-500'>*</span></label>
                  <Field type="text" name="privileges" id="privileges" component='select' required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                  dark:focus:border-blue-500">
                    <option value="" disabled >Select Privileges</option>
                    <option value="admin"  >Admin</option>
                    <option value="group-lead">Group Lead</option>
                    <option value="printshop"  >PrintShop</option>
                    <option value="team-lead"  >Team Lead</option>
                    <option value="team-member"  >Team Member</option>
                  </Field>
                </div>
              </div>
              <div className='text-center mt-8 latptop:mt-14'>
                <button className=' text-white bg-[#1baded] rounded-md py-2 px-8' type='submit' disabled={isSubmitting}>Submit</button>
              </div>
            </Form>
          )}
        </Formik>

      </div>
    </div>
  )
}

export default DepartmentUserModal