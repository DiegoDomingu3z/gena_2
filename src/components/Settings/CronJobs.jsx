import { Button, Card, Form, Input, Popconfirm, Spin, Tag, Tooltip, Collapse, Select, Space, Table, Statistic} from "antd";
const { Countdown } = Statistic;
import { useEffect, useState } from "react";
const { Option } = Select;
import { SettingOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faSquare } from "@fortawesome/free-solid-svg-icons";
import { Cron } from 'react-js-cron'
import 'react-js-cron/dist/styles.css'
import { api } from "../../../axiosService";



const { Panel } = Collapse;
const CronJobs = () => {
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  const [data, setData] = useState([])
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Run Time',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {status.map((stat) => {
            let color = stat == 'active' ? 'success' : 'volcano';
            return (
              <Tag color={color} key={stat}>
                {stat.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tag color="success" className="flex items-center justify-between"><FontAwesomeIcon icon={faPlay} /> <span className="ms-2">Run</span></Tag>
          <Tag color="error" className="flex items-center justify-between"><FontAwesomeIcon icon={faSquare} /> <span className="ms-2">Stop</span></Tag>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchCrons = async () => {
        const res = await api.get('api/config/crons').then((res) => res.data)
        setData(res)
    };
    
    fetchCrons();
}, []);




  const [value, setValue] = useState('30 5 * * 1,6')
  const onFinish = () => {
    console.log('finished!');
  };
  const onChange = (val) => {
    if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
      console.log('changed!');
    }
  };

    return(
        <>
        <Card title="Cron Job Scheduler" className="mb-5 mt-5">
        <Table columns={columns} 
        dataSource={data} 
        pagination={{position: ['none', 'none']}}
        expandable={{
          expandedRowRender: (record) => (
            <div className="m-3">
              <h2 className="border-b-2 font-bold text-lg flex justify-between"><span>Edit {record.name}  </span><Countdown value={deadline} onFinish={onFinish} /></h2>
              <div className="mt-4">

              <Cron value={record.cronTime} setValue={setValue} clockFormat="24-hour-clock" />
              </div>
            </div>
          ),
        }}
        />
        </Card>
        </>
    )
}

export default CronJobs