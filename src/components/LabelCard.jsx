import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, Formik } from 'formik';
import { addToBasket } from '../../store/Orders/thunks';
const LabelCard = ({ setToggleCartCanvas, toggleCartCanvas }) => {
  const labels = useSelector((state) => state.Label.activeLabels)
  const dispatch = useDispatch()

  return (
    <div className=' grid grid-cols-4 gap-8 h-[40.3rem]  overflow-y-scroll '>
      {labels ?
        labels.map((l, index) => {
          let vals = l.fields.reduce((acc, curr) => {
            acc[curr.name] = curr.value || '';
            return acc;
          }, {});
          vals['qty'] = '';
          return (

            <Formik
              initialValues={vals}
              onSubmit={async (values) => {
                const { qty, ...newValues } = values;
                delete values.qty;
                let id = l._id
                let finalArr = []
                for (const property in newValues) {
                  let obj = {
                    name: property,
                    text: newValues[property]
                  }
                  finalArr.push(obj)
                }
                console.log(finalArr)
                await dispatch(addToBasket({ finalArr, qty, id }))
                await setToggleCartCanvas(!toggleCartCanvas)
                setTimeout(async () => {
                  console.log("GETTING CALLED TOGGLE")
                  await setToggleCartCanvas(false)
                  console.log(toggleCartCanvas)
                }, 1500)
                document.getElementById(`${l._id}`).reset()
                document.getElementById(`${l.docNum}`).reset()
              }}
            >
              {({ isSubmitting }) => (
                <Form id={l._id}>
                  <div className='bg-[#dfe8f6] w-full h-76 laptop:w-80 laptop:h-auto rounded-lg drop-shadow-md font-genaPrimary p-4'>
                    <div className='text-end text-xs'>{l.docNum}</div>
                    <div className='text-center text-lg font-bold mb-2'>{l.name}</div>
                    <div className='w-full h-[15rem] rounded-md justify-center flex items-center'>
                      <iframe src={`images/pdflabels/${l.categoryName}/${l.subCategoryName}/${l.fileName}`} width="100%" height="220" className='rounded-lg'></iframe>
                    </div>
                    <div className='text-center text-md font-semibold'>
                      <span>Pack of {l.unitPack}</span>
                    </div>
                    <div >
                      <Field className=" bg-gray-50 ms-3.5 border border-gray-300 text-center mt-1
           sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-11/12 p-2.5 dark:bg-gray-700
           dark:border-gray-600 dark:placeholder-gray-400
           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" max={l.maxOrderQty}
                        placeholder={`ENTER QTY: MAX(${l.maxOrderQty})`} name="qty" required key={l.docNum} id={l.docNum} />
                      {l.isKanban ?
                        l.fields.map((f) => {
                          console.log(f.name)
                          return (
                            <div className='flex'><Field className="bg-gray-50 ms-3.5 border border-gray-300 text-center mt-1
                          sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-11/12 p-2.5 dark:bg-gray-700
                          dark:border-gray-600 dark:placeholder-gray-400
                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name={f.name} type={f.type} placeholder={f.name} key={f._id} required />
                              {f.type === 'checkbox' ? <span className=''>{f.name.toUpperCase()}</span> : null}
                            </div>
                          )
                        })
                        : null

                      }
                    </div>
                    <div className='text-center mt-3'><button className='bg-red-500 px-3 py-1 rounded-lg text-white' type='submit' disabled={isSubmitting}>Add to Order</button></div>
                  </div>
                </Form>
              )}
            </Formik>

          )
        })


        : null}

    </div>
  )
}

export default LabelCard