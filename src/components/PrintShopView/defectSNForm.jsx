import { Button, Modal, Space } from 'antd';
import { Field, Form, Formik } from 'formik';





const DefectSNForm = ({snModal, setSNModal, orderId, creator}) => {



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
            <Button key="submit" danger type="primary" onClick={()=> setSNModal(false)} >
              Cancel
            </Button>,
            <Button
              className='bg-blue-500 text-white hover:text-white'
            >
              Submit
            </Button>,
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
                    docNum: "",
                    orderId: orderId,
                    comment: "",
                    sn: ""
                }}
            >
                <Form>

            <div className='mt-5'>
                <div>
                    <div>
                <label htmlFor="DocNum"><b className='text-lg'>Document Number <sup className='text-red-500'>*</sup> </b></label>
                    </div>
                    <div className='mt-2'>
                <Field type="text"
                      component="select" className="bg-gray-50 border border-gray-300
                      text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                      dark:focus:border-blue-500">
                    <option >doc0123</option>
                </Field>
                <div className='mt-3 mb-2'>
                    <label htmlFor='serials'><b className='text-lg'>Serial Numbers <sup className='text-red-500'>*</sup></b>
                     <span className='ms-3 text-red-500'>Separate numbers with commas, ex: 1, 2, 3</span> </label>
                <Field type="text"

placeholder="1,2,3"
className="bg-gray-50 border border-gray-300 
text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
dark:focus:border-blue-500">
                </Field>
                          </div>
                          <div>
                            <div>
                                <label htmlFor="comment"><b className='text-lg'>Comments</b></label>
                            </div>
                            <Field
                            type="text"
                            as="textarea"
                            className="bg-gray-50 border border-gray-300 h-[200px]
                            text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                            dark:focus:border-blue-500"
                            >
                            </Field>
                          </div>
                          </div>
                          </div>
            </div>
                                </Form>
            </Formik>
        </div>
      </Modal>
      </>
    )
}




export default DefectSNForm