import { Avatar, Button, Form, Input, Select } from "antd";
import { customizeRequiredMark, formatImgString } from "../../../func/resuableFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../store/Users/Thunks";
import { getDepartments, getGroupLead, getLeads } from "../../../store/Departments/Thunks";
import { createAccount } from "../../../store/Account/thunks";
import useGenaToast from "../toasts-modals/GenaToast";

const NewUserForm = ({setOpen}) => {
    // ! SCOPED VARIABLES */
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const users = useSelector((state) => state.Users.users)
    const departments = useSelector((state) => state.Department.departments);
    const leads = useSelector((state) => state.Department.leads);
    const groupLeads = useSelector((state) => state.Department.groupLeads);
    const [usernames, setUsernames] = useState(null)
    const {successToast, errorToast, contextHolder} = useGenaToast()
    // ! SCOPED FUNCTIONS */
    const addUser = (values) => {
        delete values.confirmPassword;
        dispatch(createAccount(values)).then(() => {
            successToast(`Successfully added ${values.firstName} ${values.lastName}`,
             "If email was provided, account data will be sent automatically.")
             setTimeout(() => {
                form.resetFields()
                setOpen(false)
             }, 1000)
        }).catch((err) => { errorToast("Oops Something went wrong!", err)})
    }
    const inputRule = (message) => {
        return {
            required: true,
            message: message
        }
    }

    useEffect(() => {
        dispatch(getLeads());
        dispatch(getDepartments());
        dispatch(getGroupLead());
        dispatch(getUsers()).then(() => {
            const mappedUsernames = users.map(user => user.userName.toLowerCase());
            setUsernames(mappedUsernames)
        })
      }, []);
    // ! RETURNING JSX */
    return (
        <div>
            {contextHolder}
        <Form
        form={form}
        onFinish={addUser}
        onFinishFailed={() => errorToast("Unsuccessful", "Please confirm submission details")}
        requiredMark={customizeRequiredMark}
        initialValues={{
            requiredMarkValue: 'customize',
        }}
        layout={"vertical"}
        >
            <div className="flex justify-between gap-4">
            <Form.Item required label="First Name" name="firstName" hasFeedback
            rules={[inputRule("First name is required!")]} className="w-1/2">
                <Input placeholder="first name" />
            </Form.Item>
            <Form.Item required label="Last Name" name="lastName" hasFeedback
            rules={[inputRule("Last name is required!")]} className="w-1/2">
                <Input placeholder="last name" />
            </Form.Item>
                </div>
            <div className="flex justify-between gap-4 mt-2">
            <Form.Item label="Username" name="userName" hasFeedback
            rules={[inputRule("Username is required!"),
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (value && usernames.includes(value.toLowerCase())) {
                        return Promise.reject(new Error('This username is already taken!'));
                    } else {
                        return Promise.resolve();
                    }
                },
            })
        ]} className="w-1/2">
                <Input placeholder="username" />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                className="w-1/2"
                rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (value && !value.includes("inventive-group.com")) {
                                return Promise.reject(new Error('Email does not exist within company domain!'));
                            } else {
                                return Promise.resolve();
                            }
                        },
                    }),
                ]}
                >
    <Input placeholder="newuser@inventive-group.com" />
</Form.Item>

            </div>
            <div className="flex justify-between gap-4 mt-2">
            <Form.Item required label="Password" name="password" hasFeedback
            rules={[inputRule("Password is required!")]} className="w-1/2">
                <Input prefix={<FontAwesomeIcon icon={faLock} />} placeholder="********" type="password"/>
            </Form.Item>
            <Form.Item required label="Confirm Password" name="confirmPassword" hasFeedback
            dependencies={['password']}
            rules={[inputRule("You must confirm the password!"),
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
            }),]} className="w-1/2">
                <Input prefix={<FontAwesomeIcon icon={faLock} />} placeholder="********" type="password"/>
            </Form.Item>
            </div>
            <div className="flex justify-between gap-4 mt-2">
              <Form.Item label="Team Lead" name="teamLeadId" hasFeedback className="w-1/2">
                  <Select placeholder="Select Team Lead">
                {leads.length > 0 ?
                leads.map((l) => (
                        <Select.Option value={l._id} key={l._id} >
                            <div className="flex justify-between">
                            <span>{l.firstName} {l.lastName}</span> 
                            <Avatar shape="square" size="small"  src={`${formatImgString(l.firstName, l.lastName, "jpg")}`} />
                            </div>
                            </Select.Option>
                    ))
                    : null}
                    </Select>
              </Form.Item>
              <Form.Item label="Group Lead" name="groupLeadId" hasFeedback className="w-1/2">
                <Select placeholder="Select Group Lead">
                    {groupLeads.length > 0 ?
                    groupLeads.map((g) => (
                        <Select.Option value={g._id} key={g._id}>
                            <div className="flex justify-between">
                            <span>{g.firstName} {g.lastName}</span> 
                            <Avatar shape="square" size="small"  src={`${formatImgString(g.firstName, g.lastName, "jpg")}`} />
                            </div>
                        </Select.Option>
                    )) : null}
                </Select>
              </Form.Item>
            </div>
            <div className="flex justify-between gap-4 mt-2">
                <Form.Item label="Department" name="departmentId" hasFeedback className="w-1/2" required
                rules={[inputRule("You must assign user to a department!")]}>
                    <Select placeholder="Select Department">
                        {departments.length > 0 ?
                        departments.map((l) => (
                            <Select.Option value={l._id} key={l._id}>{l.name}</Select.Option>
                        )) : null}
                    </Select>

                </Form.Item>
                <Form.Item label="Role" name="privileges" hasFeedback className="w-1/2" required
                 rules={[inputRule("You must assign user to a role!")]}>
                    <Select placeholder="Select Role">
                        <Select.Option value="admin">Admin</Select.Option>
                        <Select.Option value="group-lead">Group Lead</Select.Option>
                        <Select.Option value="team-lead">Team Lead</Select.Option>
                        <Select.Option value="team-member">Team Member</Select.Option>
                    </Select>
                </Form.Item>
            </div>
            <div className="flex gap-3">
                <Button type="primary" danger onClick={() => {
                    form.resetFields()
                    setOpen(false)
                }}>Cancel</Button>
                <Button type="primary" htmlType="submit" className="bg-accent">Submit</Button>
            </div>
        </Form>
                    </div>
    )
}

export default NewUserForm;