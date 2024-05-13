import { faEllipsis, faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Avatar, Button, Card, Form, Select, Tooltip, Popconfirm, Row, Col, Divider, Badge } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { api } from "../../../axiosService"
import { formatImgString } from "../../../func/resuableFunctions"
import useGenaToast from "../toasts-modals/GenaToast"
import { updateMainPrintAccount } from "../../../store/Configuration/Thunks"
const { Meta } = Card;

const PopConfirmToEdit = ({title, description, componentDisabled, setComponentDisabled}) => {
    const formSwitch = (status) => {
        setComponentDisabled(status)
    }
    return (
        <Popconfirm
        title={title}
        description={description}
        onConfirm={() => formSwitch(false)}
        onCancel={() => formSwitch(true)}
        okText="Unlock To Edit"
        okButtonProps={{
            style: { backgroundColor: '#1677ff' }
        }}
        cancelButtonProps={{
            style: {backgroundColor: 'red', color: 'white', border: 'white'}
        }}
        cancelText="cancel">
                <Button className="items-center flex hover:text-[#1677ff]">
                <FontAwesomeIcon className="text-slate-400 w-[15px] h-[15px]  "
                icon={faEllipsis} />
                </Button>
        </Popconfirm>
    )
}

const MainPrintShopAccount = () => {
    const [disableForm, setDisableForm] = useState(true)
    const [accounts, setAccounts] = useState([])
    const dispatch = useDispatch()
    const [currentMainAccount, setCurrentMainAccount] = useState(null)
    const {successToast, errorToast, contextHolder} = useGenaToast()
    const configuration = useSelector((state) => state.Configuration.configuration)
    const submitForm = async (values) => {
            const token = sessionStorage.getItem('accessToken')
            const id = configuration._id
            dispatch(updateMainPrintAccount({values, id, token})).then((res) => {
                setDisableForm(true)
                successToast("Main Print Shop Account Updated")
            }).catch((err) => errorToast("Oops Something went wrong", "Please contact your company developer"))
    }

    useEffect(() => {
        const fetchPrintShopAccount = async() => {
            try {
                const res = await api.get('api/account/print-shop').then((res) => res.data)
                .catch((err) => console.log(err))
                setAccounts(res)
                console.log(res)
                const acc = res.find(obj => obj._id == configuration?.mainPrintShopAccount)
                console.log(acc)
                if (acc) {
                    setCurrentMainAccount(acc)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchPrintShopAccount()
    }, [configuration, MainPrintShopAccount])




    return(
        <Card title="Main Print Shop Account" extra={<div className="flex gap-3">
            {contextHolder}
            <Tooltip title="Used to determine if print shop is open on the dashboard">
            <Button className="items-center flex hover:text-[#1677ff]">
            <FontAwesomeIcon className="text-slate-400 w-[15px] h-[15px]"
                icon={faQuestionCircle} />
                </Button>
                </Tooltip>
                <PopConfirmToEdit
                 title={"Edit Connection Information?"} 
                 description={"You will be unable to revert"} 
                 componentDisabled={disableForm} 
                 setComponentDisabled={setDisableForm}/>
        </div>}>
            <Row gutter={12}>
            <Col span={8} className="">
            <Divider>Main Print Shop Account</Divider>
            <div className="flex justify-center">
                <Badge.Ribbon text="Print Shop Master" color="green" className="hover:scale-105 cursor-pointer transition-all ease-in-out">
                            <Card 
                                style={{
                                    width: 300,
                                }}
                                >
                                <Meta
                                avatar={<Avatar src={currentMainAccount ? formatImgString(currentMainAccount.firstName, currentMainAccount.lastName, 'jpg') :
                                "https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                            } />}
                            title={currentMainAccount ? `${currentMainAccount.firstName} ${currentMainAccount.lastName}` : 'No Account Set'}
                            description={currentMainAccount ? currentMainAccount.email : ''}
                            />
                            </Card>
                            </Badge.Ribbon>
                            </div>
                        </Col>
                        <Col span={1} className="h-full">
                            <Divider type="vertical" className="h-[200px]"/>
                        </Col>
                    <Col span={14}>
                    <Divider>Update Main Print Shop Account</Divider>
                    <div className="">
                <Form layout="vertical"
                 disabled={disableForm}
                 onFinish={submitForm}
                 fields={[
                     {
                         name: ['mainPrintShopAccount'], 
                         value: configuration.MainPrintShopAccount  
                        },
                    ]}>
                    <Form.Item  name={'mainPrintShopAccount'}>
                        <Select>
                            {accounts.length > 0 ? 
                            accounts.map((a, index) => (
                                <Select.Option value={a._id} key={index}>  
                                <div className="flex justify-between">
                                <span>{a.firstName} {a.lastName}</span> 
                                <Avatar shape="square" size="small"  src={`${formatImgString(a.firstName, a.lastName, "jpg")}`} />
                                </div></Select.Option>
                            ))
                            : null
                        }
                        </Select>
                    </Form.Item>
                    <div className="text-end">
                    <Button htmlType="submit" className="bg-[#1677ff] text-white">
                    Update
                </Button>
                    </div>
                </Form>
                        </div>
                        </Col>
                        
                        </Row>
        </Card>
    )
}

export default MainPrintShopAccount