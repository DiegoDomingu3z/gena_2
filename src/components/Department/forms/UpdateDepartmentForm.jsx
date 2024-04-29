import { Button, Form, Input, Radio, Tag } from "antd"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDepartmentName } from "../../../../store/Departments/Thunks";
import useGenaToast from "../../toasts-modals/GenaToast";

const UpdateDepartmentForm = ({modalState, setModalState, department}) => {
    // ! SCOPED VARIABLES */
    const [form] = Form.useForm();
    const token = sessionStorage.getItem("accessToken");
    const dispatch = useDispatch()
    const {successToast, errorToast, contextHolder} = useGenaToast()

    // ! SCOPED FUNCTIONS */
    const customizeRequiredMark = (label, { required }) => (
    <>
        {required ? <Tag color="error">Required</Tag> : null}
        {label}
    </>
      );

    const updateDepartment = async (values) => {
        const newName = values.newDeptName
        const id = department._id
        dispatch(updateDepartmentName({token, id, newName})).then(() => {
            successToast("Department Updated SuccessFully")
            setTimeout(() => setModalState(false), 1000)
        }).catch((err) => {
            errorToast("Oops Something went wrong", err)
        })
    }

    // ! RETURNING JSX */
    return (
        <div>
            {contextHolder}
       <Form
       form={form}
       onFinish={updateDepartment}
       initialValues={{
           requiredMarkValue: 'customize',
        }}
        layout={"vertical"}
        requiredMark={customizeRequiredMark}
        >
      <Form.Item label="Current Department Name"  tooltip="This is the current name stored in the database" name="originalDeptName" initialValue={department.name}>
        <Input placeholder="Original Name" value={department.name} disabled/>
      </Form.Item>
      <Form.Item
        label="New Department Name"
        tooltip={{
            title: 'Enter the new department name',
        }}
        name="newDeptName"
        required
        >
        <Input placeholder="New Department Name" />
      </Form.Item>
        <div className="flex gap-3">
            <Button type="primary" danger onClick={() => setModalState(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" className="bg-blue-500">Submit</Button>
        </div>
    
        
       </Form>
          </div>
    )
}

export default UpdateDepartmentForm