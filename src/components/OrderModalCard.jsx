import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { getMyOrders, updateLabel } from '../../store/Orders/thunks'
import Swal from 'sweetalert2'
import { PDFDocument, fill } from 'pdf-lib'
import { RingLoader } from 'react-spinners'


const OrderModalCard = ({ modalState, blobs, setBlobs }) => {
  // const [activeLabels, setActiveLabels] = useState('')
  const [submit, setSubmit] = useState(false);
  const [modifiedPDFs, setModifiedPDFs] = useState({})
  const dispatch = useDispatch();
  const [activeOrder] = useSelector((state) => state.Orders.activeOrder)
  const labelsArray = useSelector((state) => state.Orders.myOrders.arr)
  const labels = activeOrder ? activeOrder.labels : []
  const [labelOptions, setLabelOptions] = useState([])
  const activeLabels = labelsArray
    .flatMap(innerArray => innerArray)
    .filter((value, i) => {
      return value.orderId == activeOrder?._id
    })




    useEffect(() => {
      activeLabels.forEach((l) => {
        fetch(`/api/getPdfs?categoryName=${l.categoryName}&subCategoryName=${l.subCategoryName}&fileName=${l.fileName}`)
          .then((res) => res.arrayBuffer())
          .then(async (data) => {
            try {
              const pdfDoc = await PDFDocument.load(data);
              const form = pdfDoc.getForm();
              const fieldNames = form.getFields().map((field) => field.getName());
              if (fieldNames.includes('AREA')) {
                const dropdown = form.getDropdown('AREA');
                const options = dropdown.getOptions();
                let filtered = []
                for (let i = 0; i < options.length; i++) {
                  if (!filtered.includes(options[i])) {
                    filtered.push(options[i])
                  } else {
                    continue
                  }
                }
                setLabelOptions(options);
              }
            } catch (error) {
              console.error('Error loading PDF document:', error);
            }
          });
  
      });
  
    }, [activeLabels]);

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
      title: 'Label Updated!'
    })
  }
  const qtyTooHighToast = async (qty) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      iconColor: 'orange',
      customClass: {
        popup: 'colored-toast',
        container: 'addToCartToast',
      },
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    })
    await Toast.fire({
      icon: 'warning',
      title: `Exceeds Max Quantity of ${qty}`
    })
  }


  useEffect(() => {
    setBlobs([])
    const l = []
    const modifyPaths = async () => {
      for (let i = 0; i < activeLabels.length; i++) {
        const label = activeLabels[i];
        const modifiedLabel = await modifyPdf(
          `/api/getPdfs?categoryName=${label.categoryName}&subCategoryName=${label.subCategoryName}&fileName=${label.fileName}`,
          labels[i].textToPut
        )
        // console.log("Running", i)
        setBlobs(prev => [...prev, modifiedLabel])
        l.push(modifiedLabel)
      }
      setBlobs(l)
    }
    modifyPaths()
  }, [])
  
  const modifyPdf = async (path, text) => {
    try {
      const existingPdfBytes = await fetch(path).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const form = pdfDoc.getForm();
      const fieldNames = form.getFields().map((field) => field.getName());
      for (let i = 0; i < fieldNames.length; i++) {
        const fieldName = fieldNames[i];
        try {
          if (fieldName == 'AREA') {
            const dropdown = form.getDropdown(fieldName)
            dropdown.select(text[i].text)
          } else {

            const fieldToFill = form.getTextField(fieldName);
            fieldToFill.setText(text[i].text);
          }

        } catch (error) {
          const checkbox = form.getCheckBox(fieldName);
          if (text[i].text == 'true') {
            checkbox.check()
          }
        }
      }

      const modifiedPdfBytes = await pdfDoc.save();
      const pdfDataUri = createDataUri(modifiedPdfBytes);

      return pdfDataUri;
    } catch (error) {
      console.error('Error modifying PDF:', error);
      throw error;
    }
  };

  const createDataUri = (pdfBytes) => {
    const pdfData = new Blob([pdfBytes], { type: 'application/pdf' });
    const dataUri = URL.createObjectURL(pdfData);
    return dataUri;
  };


  const seeLabels = (index) => {
    if (blobs.length > 0) {
      return (
        <div className='w-full h-[15rem] rounded-md justify-center flex items-center'>
          <iframe src={blobs[index]} width="100%" height="100%" className='rounded-t-md'></iframe>
        </div>
      )
    } else {
      return (
        <div className="flex items-center justify-center">
          <RingLoader color="#36d7b7" />
        </div>
      )
    }
  }


  const label = activeLabels.map((label, i) => {
    const { pdf, docNum, name } = label
    let vals = labels[i].textToPut.reduce((acc, curr) => {
      acc[curr.name] = curr.text || '';
      return acc;
    }, {});
    vals.qty = labels[i].qty

    return (
      <div key={label._id}>
        <Formik
          initialValues={vals}
          enableReinitialize
          onSubmit={async (values) => {
            setSubmit(!submit)
            const valuesArray = Object.keys(values).map((key) => {
              return { [key]: values[key] };
            })
            const token = sessionStorage.getItem('accessToken');
            const orderId = label.orderId
            const labelId = label._id
            try {
              if(values.qty <= label.maxOrderQty){
                await dispatch(updateLabel({ token, orderId, labelId, valuesArray }))
                await dispatch(getMyOrders(token))
                toast()
                return
              }
              qtyTooHighToast(label.maxOrderQty)
            } catch (error) {
              console.log(error)
            }
          }
          }
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form id={label.labelId}>
              <div className='bg-white w-full h-76 laptop:h-auto rounded-lg drop-shadow-md font-genaPrimary'>
                {/* <div className='w-full h-[15rem] rounded-md justify-center flex items-center'>
                  <iframe src={`images/pdflabels/${label.categoryName}/${label.subCategoryName}/${label.fileName}`} width="100%" height="100%" className='rounded-t-md'></iframe>

                </div> */}
                {seeLabels(i)}
                <div className='p-4'>
                  <div className='text-end text-xs'>{label.docNum}</div>
                  <div className='text-center text-md text-gray-500 mb-5'>{label.name}</div>
                  <div className='text-center text-md font-semibold'>
                    <span>Pack of {label.unitPack}</span>
                  </div>
                  <div >
                    <Field className=" bg-gray-50 ms-3.5 border border-gray-300 mt-1
                            sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-11/12 p-2.5 dark:bg-gray-700
                            dark:border-gray-600 dark:placeholder-gray-400
                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3" placeholder="qty" name="qty" key={1} type="number" />
                    {
                      labels[i].textToPut.map((field, index) => {
                        if (field.name == 'AREA') {
                          return (
                            <div key={field._id} className={field.type === 'checkbox' ? 'flex gap-5' : ''}>
                              <Field component="select"
                                className="bg-gray-50 ms-3.5 border border-gray-300 mt-1 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name={field.name} id={field.name} type={field.type} placeholder={field.name} key={field._id} required={field.type === 'checkbox' ? false : false} >
                                {labelOptions.length > 0 ?
                                  labelOptions.map((o, index) => (
                                    <option key={index} id={o} name={o} value={o}>{o}</option>
                                  )) : null}
                              </Field>
                            </div>
                          )
                        } else if (field.text != '') {
                          return (
                            <div key={index}>
                              <Field className=" bg-gray-50 ms-3.5 border border-gray-300 mt-1
                              sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-11/12 p-2.5 dark:bg-gray-700
                              dark:border-gray-600 dark:placeholder-gray-400
                              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name={field.name} id={label.docNum} />
                            </div>
                          )
                        }
                      })
                    }
                  </div>
                  <div className='text-center mt-3'><button className={`${activeOrder.status == 'processing' || activeOrder.status == 'delivered' ? 'hidden' : ''} bg-[#1baded] px-3 py-1 rounded-lg text-white mt-2 hover:bg-[#16b9ff] hover:scale-110 hover:shadow-md transition-all ease-in-out`} type='submit' disabled={isSubmitting}>Update Label</button></div>
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