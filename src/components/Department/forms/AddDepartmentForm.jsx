import { Button, Form, Input, Tag } from "antd"
import { useState } from "react";
import { useDispatch } from "react-redux";
import useGenaToast from "~/components/toasts-modals/GenaToast";
import { createDepartment } from "../../../../store/Departments/Thunks";

const AddDepartmentForm = ({setOpen}) => {
    // ! SCOPED VARIABLES */
    const [form] = Form.useForm()
    const token = sessionStorage.getItem("accessToken");
    const dispatch = useDispatch()
    const {successToast, errorToast, contextHolder} = useGenaToast()
    // ! SCOPED FUNCTIONS */
    const closeToast = () => {
      setTimeout(() => setOpen(false), 1500)
    }
    const addDepartment = (values) => {
        if (values.name == undefined) { errorToast("No Name Inputted"); return;}
        const data = values
        dispatch(createDepartment({data, token})).then(() => { 
          successToast(`Added ${values.name} Successfully`)
          closeToast()
        })
        .catch((err) => {
          errorToast("Oops something went wrong", err)
          closeToast()
        })
    }

    const customizeRequiredMark = (label, { required }) => (
    <>
        {required ? <Tag color="error">Required</Tag> : null}
        {label}
    </>
      );
    // ! RETURNING JSX */

    return(
        <div>
          {contextHolder}
          <Form
          form={form}
          onFinish={addDepartment}
          initialValues={{
            requiredMarkValue: 'customize',
         }}
         layout={"vertical"}
         requiredMark={customizeRequiredMark}
          >
            <Form.Item label="Department Name"  required name="name">
              <Input placeholder="Name..." className="mt-2"/>
            </Form.Item>
            <div className="flex gap-3">
                <Button type="primary" danger onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="primary" htmlType="submit" className="bg-accent">Add</Button>
            </div>
          </Form>
        </div>
    )
}

export default AddDepartmentForm