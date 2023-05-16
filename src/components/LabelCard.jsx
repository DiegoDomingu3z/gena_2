import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, Formik } from 'formik';
import { addToBasket } from '../../store/Orders/thunks';
const LabelCard = ({ setToggleCartCanvas, toggleCartCanvas }) => {
  const labels = useSelector((state) => state.Label.activeLabels)
  const dispatch = useDispatch()
  const [qtyValue, setQtyValue] = useState('')



  return (
    <div className=' grid justify-items-center laptoplg:grid-cols-4 grid-cols-2 gap-8 max-h-[80rem] laptop:h-[37.5rem] overflow-auto pb-4 p-2 pr-10'>
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
                await dispatch(addToBasket({ finalArr, qty, id }))
                await setToggleCartCanvas(!toggleCartCanvas)
                setTimeout(async () => {
                  await setToggleCartCanvas(false)
                }, 1500)
                document.getElementById(`${l._id}`).reset()
                document.getElementById(`${l.docNum}`).reset()
              }}
            >
              {({ isSubmitting }) => (
                <Form id={l._id}>
                  <div className='bg-white w-full h-76 laptop:h-auto rounded-lg drop-shadow-md font-genaPrimary'>
                    <div className='w-full h-[15rem] rounded-md justify-center flex items-center'>
                      <iframe src={`images/pdflabels/${l.categoryName}/${l.subCategoryName}/${l.fileName}`} width="100%" height="100%" className='rounded-t-md'></iframe>

                    </div>
                    <div className='p-4'>
                      <div className='text-end text-xs'>{l.docNum}</div>
                      <div className='text-center text-md text-gray-500 mb-5'>{l.name}</div>
                      <div className='text-center text-md font-semibold'>
                        <span>Pack of {l.unitPack}</span>
                      </div>
                      <div >
                        <Field className=" bg-gray-50 ms-3.5 border border-gray-300 mt-1
                            sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-11/12 p-2.5 dark:bg-gray-700
                           dark:border-gray-600 dark:placeholder-gray-400
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" max={l.maxOrderQty}
                          placeholder={`Enter Qty: MAX(${l.maxOrderQty})`} name="qty" required key={l.docNum} id={l.docNum} />
                        {l.isKanban ?
                          l.fields.map((f) => {
                            return (
                              <div className='flex'><Field className="bg-gray-50 ms-3.5 border border-gray-300 mt-1
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
                      <div className='text-center mt-3'><button className='bg-[#1baded] px-3 py-1 rounded-lg text-white mt-2 hover:bg-white hover:text-[#1baded] border border-[#1baded] hover:scale-110 hover:shadow-md transition-all ease-in-out' type='submit' disabled={isSubmitting}>Add to Order</button></div>
                    </div>
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