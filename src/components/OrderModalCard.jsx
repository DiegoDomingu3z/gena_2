import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { getMyOrders, updateLabel } from '../../store/Orders/thunks'
import Swal from 'sweetalert2'



const OrderModalCard = () => {
  // const [activeLabels, setActiveLabels] = useState('')
  const dispatch = useDispatch();
  const [activeOrder] = useSelector((state) => state.Orders.activeOrder)
  const labelsArray = useSelector((state) => state.Orders.myOrders.arr)
  const labels = activeOrder ? activeOrder.labels : []
  console.log(activeOrder)
  const [arr, setArr] = useState([])
  const activeLabels = labelsArray
    .flatMap(innerArray => innerArray)
    .filter((value, i) => {
      return value.orderId == activeOrder?._id
    })

  const toast = async () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast',
        container: 'updateLabelToast',
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
    await Toast.fire({
      icon: 'success',
      title: 'Label Updated!'
    })
  }


  const label = activeLabels.map((label, i) => {
    console.log(label, 'active')
    const { pdf, docNum, name } = label
    let vals = labels[i].textToPut.reduce((acc, curr) => {
      acc[curr.name] = curr.text || '';
      return acc;
    }, {});

    let test = labels[i].textToPut.reduce((acc, curr) => {
      acc['name'] = curr.name,
        acc['text'] = curr.text || ''

      return acc
    }, {})

    return (
      <div key={label._id}>
        <Formik
          initialValues={vals}
          enableReinitialize
          onSubmit={async (values) => {
            console.log(values)
            const valuesArray = Object.keys(values).map((key) => {
              return { [key]: values[key] };
            })
            console.log(valuesArray)
            const token = sessionStorage.getItem('accessToken');
            const orderId = label.orderId
            const labelId = label._id
            console.log(values)
            try {
              await dispatch(updateLabel({ token, orderId, labelId, valuesArray }))
              await dispatch(getMyOrders(token))
              toast()
            } catch (error) {
              console.log(error)
            }
          }
          }
        >
          {({ isSubmitting }) => (
            <Form id={label.labelId}>
              <div className='bg-white w-full h-76 laptop:h-auto rounded-lg drop-shadow-md font-genaPrimary'>
                <div className='w-full h-[15rem] rounded-md justify-center flex items-center'>
                  <iframe src={`images/pdflabels/${label.categoryName}/${label.subCategoryName}/${label.fileName}`} width="100%" height="100%" className='rounded-t-md'></iframe>

                </div>
                <div className='p-4'>
                  <div className='text-end text-xs'>{label.docNum}</div>
                  <div className='text-center text-md text-gray-500 mb-5'>{label.name}</div>
                  <div className='text-center text-md font-semibold'>
                    <span>Pack of {label.unitPack}</span>
                  </div>
                  <div >
                    {
                      labels[i].textToPut.map((field) => {
                        return (
                          <Field className=" bg-gray-50 ms-3.5 border border-gray-300 mt-1
                            sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-11/12 p-2.5 dark:bg-gray-700
                            dark:border-gray-600 dark:placeholder-gray-400
                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={field.name} name={field.name} key={label.docNum} id={label.docNum} />
                        )
                      })
                    }
                  </div>
                  <div className='text-center mt-3'><button className='bg-[#1baded] px-3 py-1 rounded-lg text-white mt-2 hover:bg-[#16b9ff] hover:scale-110 hover:shadow-md transition-all ease-in-out' type='submit' disabled={isSubmitting}>Update Label</button></div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    )
  })

  return (
    <>
      {label}
    </>
  )

}

export default OrderModalCard