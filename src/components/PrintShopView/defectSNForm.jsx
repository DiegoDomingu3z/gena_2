import { Button, Modal, Space } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { api } from '../../../axiosService';
import Swal from 'sweetalert2';





const DefectSNForm = ({snModal, setSNModal, orderId, creator}) => {
  const [snLabels, setSNLabels] = useState([])
  const validateInput= (value) => {
    let error;
    if (!value) {
      error = 'Required';
    }
    return error
  }



  useEffect(() => {

    const getLabels = async() => {
      await api.get('api/sn-labels').then((res) => {
        setSNLabels(res.data)
      })
    }


      getLabels()
  }, [])

  const submission = async (data) => {
    const token = sessionStorage.getItem("accessToken");
    const createdData = await api.post('api/sn-labels/defect', data, {
      headers: {
        Authorization: token,
      }})
      console.log(createdData)
  }

  const successToast = async () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
        container: "addToCartToast",
      },
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    await Toast.fire({
      icon: "success",
      title: "Defects Added!",
    });
  };


    return(
        <>
        <Modal
        centered
        open={snModal}
        onOk={() => setSNModal(false)}
        onCancel={() => setSNModal(false)}
        width={1100}
        keyboard={true}
        style={{height: 500}}
        okText="Submit"
        cancelText="Cancel"
        footer={[
            <div></div>
          ]}
      >
        <div>
            <div>
                <h1 className='text-2xl mb-1'><b>Serial Number Defect Form</b></h1>
                <div>Order ID: {orderId}</div>
                <div>Order Creator: {creator}</div>
            </div>
         
            <Formik
                initialValues={{
                    labelId: "",
                    orderId: orderId,
                    comment: "",
                    sn: "",
                    docNum: ""
                }}
                validate={(values) => {
                  const errors = {}
                  if (!values.sn) {
                    errors.sn = "Serial Numbers must be inputted";
                  } else if (!values.labelId) {
                    errors.labelId = "Document Number must be selected"
                  }
                  return errors;
              
                }}  
                onSubmit={async(values) => {
                  // Convert string to array
                  const numbersArray = values.sn.split(',').map(number => parseInt(number.trim(), 10));
                  values['sn'] = numbersArray
                  const matchingObject = snLabels.find((s) => s._id === values.labelId);
                  if (matchingObject) {
                      values['docNum'] = matchingObject.docNum;
                  } else {
  
                    values['docNum'] = null; 
                  }
                  await submission(values).then((res) => {
                    document.getElementById('defectForm').reset()
                    setSNModal(false)
                    successToast()
                  })
                }}
            >
              {({handleSubmit, isSubmitting}) => (

          
                <Form id='defectForm'>

            <div className='mt-5'>
                <div>
                    <div>
                <label htmlFor="labelId"><b className='text-lg'>Document Number <sup className='text-red-500'>*</sup> </b></label>
                    </div>
                    <div className='mt-2'>
                <Field type="text" name="labelId" id="labelId" validate={validateInput} 
                      component="select" className="bg-gray-50 border border-gray-300
                      text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                      dark:focus:border-blue-500" required>
                        <option className="text-gray-600" >SELECT A SERIAL NUMBER LABEL</option>
                    {snLabels.length > 0 ? 
                    snLabels.map((s) => (
                      <option key={s._id} value={s._id}>{s.docNum}</option>
                    )) : null}
                </Field>
                <ErrorMessage name="labelId" component="div" className="text-red-500" />
                <div className='mt-3 mb-2'>
                    <label htmlFor='serials'><b className='text-lg'>Serial Numbers <sup className='text-red-500'>*</sup></b>
                     <span className='ms-3 text-red-500'>Separate numbers with commas, ex: 1, 2, 3</span> </label>
                <Field type="text" 
required
placeholder="1,2,3" name="sn" id="sn"
className="bg-gray-50 border border-gray-300 
text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
dark:focus:border-blue-500"
                />
                <ErrorMessage name="sn" component="div" className="text-red-500" />
                          </div>
                          <div>
                            <div>
                                <label htmlFor="comment"><b className='text-lg'>Comments</b></label>
                            </div>
                            <Field id="comment" name="comment"
                            type="text"
                            as="textarea"
                            className="bg-gray-50 border border-gray-300 h-[200px]
                            text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                            dark:focus:border-blue-500"
                            />
                            
                          </div>
                          </div>
                          </div>
                          <div className='flex justify-end mt-5'>
                          <Button className='me-2' key="submit" danger type="primary" onClick={()=> {
                            document.getElementById('defectForm').reset()
                            setSNModal(false)
                          }} >
              Cancel
            </Button>
            <Button
              className='bg-blue-500 text-white hover:text-white' type='submit' onClick={() => handleSubmit()}
            >
              Submit
            </Button>
                          </div>
            </div>
                                </Form>
                                    )}
            </Formik>
        </div>
      </Modal>
      </>
    )
}




export default DefectSNForm