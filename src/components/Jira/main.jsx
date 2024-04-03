import { faDotCircle, faEllipsis, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Form, Input, Popconfirm, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { api } from "../../../axiosService";

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
            style: {backgroundColor: '#ff4d4f', color: 'white', border: 'white'}
        }}
        cancelText="Cancel">
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
    const [logs, setLogs] = useState([])
    const typeLog = {
        'log': '#00FF00',
        'error': '#FF0000',
        'warn': ' #CD7F32',
        'assert': '#A020F0',
        'trace': '#0000FF'

    }

    const formatDate = (timestamp) => {
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
    
    return `${formattedDate} : : ${formattedTime}`
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
                const res = await api.get('api/logs').then((res) => res.data)
                console.log(res)
                setLogs(res)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    
        // No cleanup needed for this effect, so you can leave the return statement empty
    }, []);
    


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
                <PopConfirmToEdit title={"Edit Connection Information?"} description={"You will be unable to revert"} componentDisabled={emailFormDisabled} setComponentDisabled={setEmailFormDisabled}/>
            }>
                <Form
                 layout="vertical"
                 disabled={emailFormDisabled}
                >
                <Form.Item label="Sender Email Address" required tooltip="Email will be used to send notifications to users">
                    <Input placeholder="test-email@inventive-group.com"
                     />
                </Form.Item>
                
                <Form.Item label="Sender Email Password" required>
                    <Input placeholder="********" type="password"
                     />
                </Form.Item>
                <div className="text-end">
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
                <PopConfirmToEdit title={"Edit Connection Information?"} description={"You will be unable to revert"} componentDisabled={componentDisabled} setComponentDisabled={setComponentDisabled}/>
            }>
                <Form
                form={form}
                layout="vertical"
                initialValues={{
                    requiredMarkValue: requiredMark,
                }}
                onValuesChange={onRequiredTypeChange}
                requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}
                disabled={componentDisabled}
                >
                <Form.Item label="Jira Domain" required tooltip="This is a required field">
                    <Input placeholder="Jira Domain"
                     />
                </Form.Item>
                <Form.Item label="Jira API key" required tooltip="This is a required field">
                    <Input placeholder="************" type="password"/>
                </Form.Item>
                <Form.Item label="Jira Admin" required tooltip="This is a required field">
                    <Input placeholder="test-email@inventive-group.com" type="email"/>
                </Form.Item>
               <div className="text-end">
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
                    <span className={`text-[${typeLog[l.type]}]`}>[{l.type.toUpperCase()}] : : {formatDate(l.createdAt)}</span>
                    <span className={`${typeLog[l.type] == 'error' ? 'text-red-500' : 'text-white'} ms-8`}>{l.content}</span>
                </div>
                )): null } 
            </div>

            </Card>
            

            
        </div>
        
      </div>
    )
}

export default Main;



