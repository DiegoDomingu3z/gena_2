import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Formik, Form, Field } from 'formik'
import useEasterEgg from '~/hooks/useEasterEgg'
import { useDispatch } from 'react-redux'
import { reportTicket } from '../../store/Emails/Thunks'
import Swal from 'sweetalert2'

const TicketModal = ({ setTicketModal, ticketModal }) => {
  useEasterEgg();
  const dispatch = useDispatch()

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
      title: 'Ticket Submitted!'
    })
  }
  const failToast = async () => {
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
      icon: 'warning',
      title: 'There was an issue submitting your ticket'
    })
  }

  return (
    <div className='fixed left-0 w-screen h-screen laptop:h-screen bg-slate-400 bg-opacity-80 z-40 backdrop-blur-sm flex justify-center items-center'>
      <div className='bg-[#f7f9fc] w-3/5 laptop:w-2/5 laptop:h-[44rem] h-[44rem] rounded-lg px-10 py-5 flex flex-col'>
        <button onClick={() => setTicketModal(!ticketModal)} className='text-2xl self-end hover:bg-[#233043] rounded-full h-8 w-8 hover:text-white transition-all ease-in-out'><FontAwesomeIcon icon={faXmark} /></button>
        <h1 className='font-semibold text-lg'>Submit A Support Ticket</h1>
        <Formik
          initialValues={{
            subject: '',
            description: '',
            importance: ''
          }}
          onSubmit={async (values, helpers) => {
            try {
              var data = values
              const token = sessionStorage.getItem('accessToken')
              setTicketModal(!ticketModal)
              helpers.resetForm();
              await dispatch(reportTicket({ data, token }))
              successToast();
            } catch (error) {
              failToast();
            }

          }}
        >
          <Form>
            <div className='mt-10'>
              <label htmlFor="subject" className='block mb-2 text-sm font-medium text-gray-900'>Subject</label>
              <Field type="text" name="subject" id="subject" className='bg-gray-50 border border-gray-300
              text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-5'>
              </Field>
              <label htmlFor="description" className='block mb-2 text-sm font-medium text-gray-900'>Description</label>
              <Field type="text" component="textarea" name="description" id="description" className='bg-gray-50 border border-gray-300
              text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 max-h-[10rem] min-h-[5rem] mb-5'>
              </Field>
              <label htmlFor="importance" className='block mb-2 text-sm font-medium text-gray-900'>Importance</label>
              <Field component="select" name="importance" id="importance" required="" className='bg-gray-50 border border-gray-300
              text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[60%] lg:w-[50%] p-2.5 mb-10'>
                <option className='text-gray-500' selected>What is the business impact?</option>
                <option value="low">Low</option>
                <option value="high">High</option>
              </Field>
              <button className='bg-[#28aeeb] p-2 px-5 rounded-lg text-white w-full' type='submit' >submit</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default TicketModal