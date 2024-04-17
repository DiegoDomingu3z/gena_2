import { Button, Card, Form, Input, Popconfirm, Spin, Tag, Tooltip, Collapse, Select, Space, Table, Statistic} from "antd";
const { Countdown } = Statistic;
import { memo, useEffect, useState } from "react";
const { Option } = Select;
import { SettingOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faSquare } from "@fortawesome/free-solid-svg-icons";
import { Cron } from 'react-js-cron'
import 'react-js-cron/dist/styles.css'
import { api } from "../../../axiosService";
import { stringToArray, arrayToString, getSchedule, getUnits } from "cron-converter";
import { useDispatch, useSelector } from "react-redux";
import { getCronJobs, updateCronJob } from "../../../store/Configuration/Thunks";


const { Panel } = Collapse;
const CronJobs = () => {
  const data = useSelector((state) => state.Configuration.crons);
  const token = useSelector((state) => state.Account.accessToken)
  const dispatch = useDispatch()
  const [countDownState, setCountDownState] = useState(false)
  const separateCamelCase = (camelCaseString) => {
    let words = [];
    let currentWord = '';
    for (let i = 0; i < camelCaseString.length; i++) {
        const char = camelCaseString[i];
        if (char === char.toUpperCase() && currentWord) {
            words.push(currentWord);
            currentWord = char;
        } else {
            currentWord += char;
        }
    }
    if (currentWord) {
        words.push(currentWord);
    }

    return words.join(' ').toLowerCase();
}

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{separateCamelCase(text)}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Next Execution',
      dataIndex: 'cronTime',
      key: 'cronTime',
      render: (time) => <a>{getNextCronCall(time, 'run-time')}</a>
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        console.log(status)
        let color = status == true ? 'success' : 'volcano';
        let stat = status == true ? 'ACTIVE' : 'DEACTIVATED'
        return (
                  <Tag color={color}>
                    {stat}
                   </Tag>
              );
        
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Start Cron Job">
          <button  onClick={(event) => {
            event.stopPropagation()
            dispatch(updateCronJob({data: {status: true}, token, id: record._id}))
          }} disabled={record.status}>
          <Tag color="success" className="flex items-center justify-between"><FontAwesomeIcon icon={faPlay} /> <span className="ms-2">Run</span></Tag>
          </button>
            </Tooltip>
            <Tooltip title="Stop Cron Job">
          <button onClick={(event) => {
            event.stopPropagation()
            dispatch(updateCronJob({data: {status: false}, token, id: record._id}))
          }} disabled={!record.status}>
          <Tag color="error" className="flex items-center justify-between"><FontAwesomeIcon icon={faSquare} /> <span className="ms-2">Stop</span></Tag>
          </button>
            </Tooltip>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getCronJobs())
}, []);

  const getNextCronCall = (cronTime, type) => {
    const arr = stringToArray(cronTime)
    let reference = new Date()
    let schedule = getSchedule(arr, reference, "America/Denver")
    const date = schedule.next()
    const dateObject = date.c
    let formattedDateTime;
  if (type == 'countdown') {
     formattedDateTime = new Date(
      dateObject.year,
      dateObject.month - 1, 
      dateObject.day,
      dateObject.hour,
      dateObject.minute,
      dateObject.second,
      dateObject.millisecond
  ).getTime();
  return formattedDateTime
  } else if (type == 'run-time'){
    formattedDateTime = new Date(
      dateObject.year,
      dateObject.month - 1, 
      dateObject.day,
      dateObject.hour,
      dateObject.minute,
      dateObject.second,
      dateObject.millisecond
  ).toLocaleString('en-US');
  return `${formattedDateTime}`
  }
  }


  const generatedRow = ({record}) => {
    const [value, setValue] = useState(record.cronTime);
    const id = record._id
    const updateCronTime = () => {
        const data = {cronTime: value}
        dispatch(updateCronJob({data, token, id}))
    }

    return (
      <div className="m-3">
        <h2 className="border-b-2 font-bold text-lg flex justify-between">
          <span>Edit {separateCamelCase(record.name)}</span>
          <div className="flex items-center">
            <h2 className="me-2">Execution Countdown:</h2>
            {record.status == true ?

              <Countdown value={getNextCronCall(record.cronTime, 'countdown')}  onFinish={() =>
                {getCronJobs()}}/>
                : <h2 className="text-red-500">Currently Disabled</h2>
              }
          </div>
        </h2>
        <div className="mt-4 flex">
          <Cron value={value} setValue={setValue} clockFormat="24-hour-clock" clearButton={false}/>
          <div className="ms-2">
            <Button type="primary"
             danger 
             onClick={() => setValue(record.cronTime)}
             disabled={value == record.cronTime ? true : false}>Reset</Button>
            <Button type="primary" 
            className="bg-[#1677ff] ms-2"
            onClick={() => updateCronTime()}
            disabled={value == record.cronTime ? true : false}
            >Update</Button>
          </div>
        </div>
      </div>
    );
  }
  const MemoizedExpandedRowRender = memo(generatedRow);

    return(
        <>
        <Card title="Cron Job Scheduler" className="mb-5 mt-5">
        <Table columns={columns} 
        dataSource={data} 
        pagination={{position: ['none', 'none']}}
        expandable={{
          expandedRowRender: (record) => <MemoizedExpandedRowRender record={record} />,
        }}
        />
        </Card>
        </>
    )
}

export default CronJobs