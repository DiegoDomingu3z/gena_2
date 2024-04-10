import { faDotCircle, faEllipsis, faEye, faEyeSlash, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Form, Input, Popconfirm, Spin, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { api } from "../../../axiosService";
import { useDispatch, useSelector } from "react-redux";
import { getConfig, testEmailConnection, testJiraDomainConnection, updateConfig } from "../../../store/Configuration/Thunks";
import { SyncOutlined } from "@ant-design/icons";

const customizeRequiredMark = (label, { required }) => (
    <>
      {required ? <Tag color="error">Required</Tag> : <Tag color="warning">optional</Tag>}
      {label}
    </>
  );

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



const Main = () => {
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const [componentDisabled, setComponentDisabled] = useState(true);
    const [emailFormDisabled, setEmailFormDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [testingConnection, setTestConnection] = useState(false)
    const [testJiraConnection, setTestJiraConnection] = useState(false)
    const [logs, setLogs] = useState([])
    const configuration = useSelector((state) => state.Configuration.configuration);
    console.log(configuration.senderEmailAddress, 'email')
    console.log(configuration, 'config')
    const dispatch = useDispatch()
    const typeLog = {
        'log': '#00FF00',
        'error': '#FF0000',
        'warn': ' #CD7F32',
        'assert': '#A020F0',
        'trace': '#0000FF'

    }

    const formatDate = (timestamp, view) => {
        const date = new Date(timestamp);
        
    // Get the month, day, and year
    const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = date.getDate();
    const year = date.getFullYear();
    // Get the hours, minutes, and seconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    const formattedDate = `${month}/${day}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    if (view == 'terminal') {  
        return `${formattedDate} : : ${formattedTime}`
    } else if ('regular'){
        return  `${formattedDate} - ${formattedTime}`
    }
    }
    


    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };

    const refreshLogs = async () => {
        setLoading(true)
        const res = await api.get('api/logs').then((res) => res.data)
        setTimeout(() => {
            setLogs(res)
            setLoading(false)
        }, 800)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem("accessToken")
                dispatch(getConfig({token}))
                const res = await api.get('api/logs').then((res) => res.data)
                setLogs(res)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    
        // No cleanup needed for this effect, so you can leave the return statement empty
    }, []);
    

    const submitEmailForm = (values) => {
        const token = sessionStorage.getItem("accessToken")
        dispatch(updateConfig({values, token})).then(() => {
            setEmailFormDisabled(true)
        })
    }

    const submitJiraForm = async (values) => {
        const token = sessionStorage.getItem("accessToken")
        await dispatch(updateConfig({values, token})).then(() => {
            setComponentDisabled(true)
        })
    }

    const valueChange = (input, value) => {
        document.getElementById(input).value = value;
    }

    const testConnection = async () => {
        setTestConnection(true)
        await dispatch(testEmailConnection()).then(() => {
                setTestConnection(false)
        })
    }

    const JiraConnection = async () => {
        setTestJiraConnection(true)
        dispatch(testJiraDomainConnection()).then(() => {
            setTestJiraConnection(false)
        })
    }



    return (
        <div className="flex flex-col pl-20 pr-20 pt-20 pb-4">
        <div className={""}>
          <div className="flex items-end">
            <div className="mr-auto">
              <h1 className="text-3xl font-medium font-genaPrimary">
                Gena Settings
              </h1>
            </div>
          </div>
          <div className="mb-10 mt-5 border-t border-gray-300 rounded-full" />
          <Card 
            title="Email Configuration"
            className="w-full mt-5 mb-5"
            extra={
                <div className="flex">
                    <Button type="primary" className="me-2 bg-blue-500"
                    onClick={() => testConnection()}
                    >Test Connection</Button> 
                    {configuration.emailConnectionStatus == undefined && testingConnection == false ?
                    <Tag color="warning" className="flex items-center">No Connection</Tag>
                    : null}
                    {testingConnection ? 
                    <Tag icon={<SyncOutlined spin />} color="purple" className="flex items-center">
                    Connecting
                  </Tag> : null
                    }
                    {configuration?.emailConnectionStatus == true ?
                    <Tooltip title={`Last Test ${formatDate(configuration.emailConnectionDateTested)}`}>
                    <Tag color="success" className="flex items-center">Active Connection</Tag>
                    </Tooltip>
                    : null}
                    {configuration.emailConnectionStatus == false ?
                    <Tooltip  title={`Last Test ${formatDate(configuration.emailConnectionDateTested, 'regular')}`}>
                    <Tag color="error" className="flex items-center">Connection Failed</Tag>
                        </Tooltip>
                    : null}
                    
               
                <PopConfirmToEdit
                 title={"Edit Connection Information?"} 
                 description={"You will be unable to revert"} 
                 componentDisabled={emailFormDisabled} 
                 setComponentDisabled={setEmailFormDisabled}/>
                 </div>
            }>
                <Form
                 layout="vertical"
                 disabled={emailFormDisabled}
                 onFinish={submitEmailForm}
                 fields={[
                    {
                     name: ['senderEmailAddress'], 
                     value: configuration.senderEmailAddress  
                    },
                    {
                     name: ['senderEmailPassword'], 
                     value: configuration.senderEmailPassword  
                    }
                 ]}
                >
                <Form.Item label="Sender Email Address" name="senderEmailAddress" required tooltip="Email will be used to send notifications to users" 
                 rules={[
                    {
                      required: true,
                      message: 'Please input an email!',
                    },
                  ]} initialValue={configuration.senderEmailAddress} value={configuration.senderEmailAddress}>
                    <Input id="senderEmailAddress" placeholder={configuration.senderEmailAddress} onChange={(e) => valueChange('senderEmailAddress', e.target.value)}
                    initialValue={configuration.senderEmailAddress} value={configuration.senderEmailAddress}
                     />
                </Form.Item>
                
                <Form.Item label="Sender Email Password" name="senderEmailPassword" required
                 rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}>
                    <Input placeholder="********" type={emailFormDisabled ? 'password' : 'text'} />
                </Form.Item>
               
                <div className="text-end">
                <Button className="bg-red-500 text-white mr-3 hover:text-red-400" htmlType="reset" onClick={() => setEmailFormDisabled(!emailFormDisabled)}>
                    Cancel
                </Button>
                <Button htmlType="submit" className="bg-[#1677ff] text-white">
                    Update
                </Button>
               </div>
                </Form>
            </Card>

            <Card 
            title="Jira Connection Information"
            className="w-full"
            extra={
                <div className="flex">
                    <Button type="primary" className="me-2 bg-blue-500"
                    onClick={() => JiraConnection()}
                    >Test Connection</Button> 
                    {configuration.jiraConnectionStatus == undefined && testJiraConnection == false ?
                    <Tag color="warning" className="flex items-center">No Connection</Tag>
                    : null}
                    {testJiraConnection ? 
                    <Tag icon={<SyncOutlined spin />} color="purple" className="flex items-center">
                    Connecting
                  </Tag> : null
                    }
                    {configuration?.jiraConnectionStatus == true ?
                    <Tooltip title={`Last Test ${formatDate(configuration.jiraConnectionDateTested)}`}>
                    <Tag color="success" className="flex items-center">Active Connection</Tag>
                    </Tooltip>
                    : null}
                    {configuration.jiraConnectionStatus == false ?
                    <Tooltip  title={`Last Test ${formatDate(configuration.jiraConnectionDateTested, 'regular')}`}>
                    <Tag color="error" className="flex items-center">Connection Failed</Tag>
                        </Tooltip>
                    : null}
                <PopConfirmToEdit title={"Edit Connection Information?"} description={"You will be unable to revert"} componentDisabled={componentDisabled} setComponentDisabled={setComponentDisabled}/>
                </div>
            }>
                <Form
                form={form}
                layout="vertical"
                onFinish={submitJiraForm}
                fields={[
                    {
                        name: ['JiraDomain'],
                        value: configuration.JiraDomain
                    },
                    {
                        name: ['jiraApiKey'],
                        value: configuration.jiraApiKey
                    },
                    {
                        name: ['jiraAdmin'],
                        value: configuration.jiraAdmin
                    }
                ]}
                onValuesChange={onRequiredTypeChange}
                disabled={componentDisabled}
                >
                <Form.Item label="Jira Domain" name="JiraDomain" required tooltip="This is a required field"
                rules={[
                    {
                      required: true,
                      message: 'Please input a Domain!',
                    },
                  ]}>
                    <Input placeholder="my-company-domain"
                     />
                </Form.Item>
                <Form.Item label="Jira API key" required tooltip="This is a required field" name="jiraApiKey"
                rules={[
                    {
                      required: true,
                      message: 'Please input an API Key!',
                    },
                  ]}>
                    <Input placeholder="************" type="password"/>
                </Form.Item>
                <Form.Item label="Jira Admin" name="jiraAdmin" required tooltip="This is a required field" 
                rules={[
                    {
                      required: true,
                      message: 'Please input an email!',
                    },
                  ]}>
                    <Input placeholder="test-email@inventive-group.com" type="email"/>
                </Form.Item>
               <div className="text-end">
                <Button className="bg-red-500 text-white mr-3 hover:text-red-400">
                    Cancel
                </Button>
                <Button htmlType="submit" className="bg-[#1677ff] text-white">
                    Update
                </Button>
               </div>
             
                </Form>
                
            </Card>
            <Card 
            title="Server logs"
            className="w-full mt-5 mb-5"
            extra={
                <>
                {loading == false ? 
                    
                    <Button className="hover:text-[#1677ff]" onClick={() => refreshLogs()}>
                    <FontAwesomeIcon className="text-slate-400 w-[15px] h-[15px] "
                    icon={faRefresh} />
                    </Button>
                    :
                    <Spin />
                }
                </>
            }
          >
            <div className="bg-black w-full h-[500px] overflow-y-auto">
                {logs.length > 0 ? logs.map((l) => (

                <div className="ms-3 mb-2 mt-2">
                    <span className={`${l.type == 'error' ? 'text-red-500' : 'text-[#00FF00]'}`}>[{l.type.toUpperCase()}] : : {formatDate(l.createdAt, 'terminal')}</span>
                    <span className={`${l.type == 'error' ? 'text-red-500' : 'text-[#00FF00]'} ms-8`}>{l.content}</span>
                </div>
                )): null } 
            </div>

            </Card>
            

            
        </div>
        
      </div>
    )
}

export default Main;



