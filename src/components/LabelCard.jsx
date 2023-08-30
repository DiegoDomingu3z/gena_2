import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, Formik } from 'formik';
import { addToBasket } from '../../store/Orders/thunks';
import Swal from 'sweetalert2'
import handleViewport from 'react-in-viewport';

const IframeBlock = (props) => {
  const { inViewport, forwardedRef, src, alwaysRendered } = props
  const shouldRender = inViewport || alwaysRendered.includes(src._id);
  return (
    <iframe id={src._id} ref={forwardedRef} src={shouldRender ? `/api/getPdfs?categoryName=${src.categoryName}&subCategoryName=${src.subCategoryName}&fileName=${src.fileName}` : ''} width="100%" height="100%" className='rounded-t-md'></iframe>
  )
}
const ViewportBlock = handleViewport(IframeBlock);


const LabelCard = ({ setToggleCartCanvas, toggleCartCanvas, setRender, render }) => {
  const labels = useSelector((state) => state.Label.activeLabels)
  const dispatch = useDispatch()
  const [alwaysRenderedIframes, setAlwaysRenderedIframes] = useState([]);

  const handleEnterViewport = (iframeId) => {
    if (!alwaysRenderedIframes.includes(iframeId)) {
      setAlwaysRenderedIframes(prev => [...prev, iframeId]);
    }
  };

  useEffect(() => {
    setAlwaysRenderedIframes([])
  }, [labels])


  const toast = async () => {
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
      title: 'Added to Cart!'
    })
  }



  return (
    <div className='grid justify-items-center laptoplg:grid-cols-4 grid-cols-2 gap-8 max-h-[80rem] laptop:h-[37.5rem] overflow-auto pb-4 p-2 pr-10'>
      {labels ?
        labels.map((l, index) => {
          let vals = l.fields.reduce((acc, curr) => {
            acc[curr.name] = curr.value || '';
            return acc;
          }, {});
          vals['qty'] = '';
          return (
            <Formik
              key={l._id}
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
                setRender(!render)
                toast()
                document.getElementById(`${l._id}`).reset()
                document.getElementById(`${l.docNum}`).reset()
              }}
            >
              {({ isSubmitting }) => (
                <Form id={l._id} key={index}>
                  <div className='bg-white w-full h-76 laptop:h-auto rounded-lg drop-shadow-md font-genaPrimary'>
                    <div className='w-full h-[15rem] rounded-md justify-center flex items-center'>
                      <ViewportBlock key={l._id} alwaysRendered={alwaysRenderedIframes} src={l} onEnterViewport={() => handleEnterViewport(l._id)} onLeaveViewport={() => console.log('leave')} />
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
                              <div key={f._id} className={f.type === 'checkbox' ? 'flex gap-5' : ''}>
                                <div className='pt-1'><Field className="bg-gray-50 ms-3.5 border border-gray-300 mt-1
                            sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-11/12 p-2.5 dark:bg-gray-700
                            dark:border-gray-600 dark:placeholder-gray-400
                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name={f.name} id={f.name} type={f.type} placeholder={f.name} key={f._id} required={f.type === 'checkbox' ? false : true} />
                                </div>
                                <div className=''>
                                  {f.type === 'checkbox' ? <label htmlFor={f.name} className=''>{f.name.toUpperCase()}</label> : null}
                                </div>
                              </div>
                            )
                          })
                          : null

                        }
                      </div>
                      <div className='text-center mt-3'><button className='bg-[#1baded] px-3 py-1 rounded-lg text-white mt-2 hover:bg-[#16b9ff] hover:scale-110 hover:shadow-md transition-all ease-in-out' type='submit' disabled={isSubmitting}>Add to Order</button></div>
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