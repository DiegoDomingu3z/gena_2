import { Card, Col, Row, Statistic, Avatar, Button, Dropdown} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, SettingFilled, SettingOutlined, SettingTwoTone, SyncOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { items } from './GlobalStatVariables';
const { Meta } = Card;
const TopCards = () => {
    const [orderStat, setOrderStat] = useState(items[0])
    const onClick = ({key}) => {
        console.log(key)
        setOrderStat(items[key - 1])
    }

    return (
        <Row gutter={12}>
    <Col span={6}>
      <Card bordered={false}>
        <Statistic
          title={
          <div className='flex items-center justify-between w-full'>
            <span>Total {orderStat.label} Orders</span>
            <span>
                <Dropdown menu={{items, onClick, selectable: true, defaultSelectedKeys:[orderStat.key.toString()]}} trigger={['click']}>

                <Button type='text' className='flex items-center' onClick={(e) => e.preventDefault()}>
                <SettingOutlined size={15}/>
                </Button>
          </Dropdown>
                </span>
                </div>}
          value={20}
          valueStyle={{
            color: '#3f8600',
          }}
          prefix={<SyncOutlined spin />}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card bordered={false}>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{
            color: '#cf1322',
          }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card bordered={false}>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{
            color: '#cf1322',
          }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card bordered={false}>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{
            color: '#cf1322',
          }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
  </Row>
    )
}
export default TopCards;