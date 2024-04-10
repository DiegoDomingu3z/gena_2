import { Button, Card, Form, Input, Popconfirm, Spin, Tag, Tooltip, Collapse, Select } from "antd";
import { useState } from "react";
const { Option } = Select;
import { SettingOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
const CronJobs = () => {
    const [expandIconPosition, setExpandIconPosition] = useState('start');
    const onPositionChange = (newExpandIconPosition) => {
      setExpandIconPosition(newExpandIconPosition);
    };
    const onChange = (key) => {
      console.log(key);
    };
    const genExtra = () => (
      <SettingOutlined
        onClick={(event) => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      />
    );






    const items = [
        {
          key: '1',
          label: 'This is panel header 1',
          children: <div>asdf</div>,
          extra: genExtra(),
        },
        {
          key: '2',
          label: 'This is panel header 2',
          children: <div>asdf</div>,
          extra: genExtra(),
        },
        {
          key: '3',
          label: 'This is panel header 3',
          children: <div>asasdf</div>,
          extra: genExtra(),
        },
      ];
    return(
        <>
        <Card title="Cron Job Schedular">
        <Collapse size="large">
                <Panel
                  onClick={() => console.log('works')}
                  header={`Old Order Removal`}
                  extra={<div>works</div>}
                >
                
                </Panel>
              </Collapse>
        </Card>
        </>
    )
}

export default CronJobs