import { Card, Col, Row, Statistic, Avatar, Button, Dropdown} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, CheckCircleOutlined, MailOutlined, PauseCircleOutlined, SettingFilled, SettingOutlined, SettingTwoTone, StopOutlined, SyncOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import { items, OrdersByDateArr} from './GlobalStatVariables';
import { api } from '../../../../axiosService';
import { fetchCompletedOrderCount, fetchOrderCount, orderDateFilter, printShopActivity } from './DateFetchers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed, faDoorOpen, faPrint } from '@fortawesome/free-solid-svg-icons';
const { Meta } = Card;
const TopCards = () => {
    const [orderStat, setOrderStat] = useState(items[0])
    const [orderDateStat, setOrderDateStat] = useState(OrdersByDateArr[0])
    const [orderCount, setOrderCount] = useState(0)
    const [isPrintShopActive, setIsPrintShopActive] = useState(false)
    const [ordersByDate, setOrdersByDate] = useState(null)
    const [completedOrderCount, setCompletedOrderCount] = useState(0)
    const [icon, setIcon] = useState({jsx: <SyncOutlined spin />, color: '#3f8600'})

    const setFilterOrderStatus = useCallback(async ({key}) => {
        const obj = items[key - 1]
        setOrderStat(obj)
        let status;
        if (obj == undefined) {return}
        switch (obj.key) {
          case 1:
            status = "*"
            setIcon({jsx: <SyncOutlined spin/>, color: '#3f8600'})
            break;
          case 2:
            status = "waiting for approval"
            setIcon({jsx: <PauseCircleOutlined  />, color: '#808080'})
            break;
          case 3:
            status = "processing"
            setIcon({jsx: <SyncOutlined spin/>, color: '#3f8600'})
            break;
          case 4:
            status = "ready for pickup"
            setIcon({jsx: <CheckCircleOutlined />, color: '#3f8600'})
            break;
          case 5:
            status = "declined"
            setIcon({jsx: <StopOutlined />, color: '#FF0000'})
            break;
          case 6:
            status = "delivered"
            setIcon({jsx: <MailOutlined />, color: '#3f8600'})
            break;
          default:
            status = "*"
            break;
        }
        await fetchOrderCount(status, setOrderCount)
    }, [])




    useEffect(() => {
      const fetchData = async () => {
          await fetchOrderCount("waiting for approval", setOrderCount);
          const data = await orderDateFilter("pastWeek");
          const activity = await printShopActivity()
          const count = await fetchCompletedOrderCount()
          setIsPrintShopActive(activity)
          setOrdersByDate(data);
          setCompletedOrderCount(count.orderCount)
      };
  
      fetchData();
  }, []);
  

    const DateFilter = useCallback(async ({key}) => {
      const obj = OrdersByDateArr[key - 1]
      setOrderDateStat(obj)
      let date;
      if (obj == undefined) {return}
      switch (obj.key) {
        case 1:
          date = "pastWeek"
          break;
        case 2:
          date = "pastTwoWeeks"
          break;
        case 3:
          date = "pastMonth"
          break;
        case 4:
          date = "pastSixMonths"
          break;
        default:
          date = "pastWeek"
          break;
      }
        const data = await orderDateFilter(date)
        setOrdersByDate(data)

    },[])

    return (
        <Row gutter={12}>
          <Col span={6}>
      <Card bordered={false}>
        <Statistic
          title={
            <div className='flex items-center justify-between w-full'>
            <span>Orders {orderDateStat.label}</span>
            <span>
                <Dropdown menu={{items: OrdersByDateArr, onClick: DateFilter, selectable: true, defaultSelectedKeys:[orderDateStat.key.toString()]}} trigger={['click']} >

                <Button type='text' className='flex items-center' >
                <SettingOutlined size={15}/>
                </Button>
          </Dropdown>
                </span>
                </div>
          }
          value={ordersByDate?.orderCount.withinPeriod.count}
          precision={0}
          valueStyle={{
            color: ordersByDate?.orderCount.type == "positive" ? '#3f8600' : '#cf1322',
          }}
          prefix={ordersByDate?.orderCount.type == "positive" ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          suffix={<small className='text-gray-500 text-sm'>+{ordersByDate?.orderCount.percentageDifference}% </small>}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card bordered={false}>
        <Statistic
          title={
          <div className='flex items-center justify-between w-full'>
            <span>Total {orderStat.label} Orders</span>
            <span>
                <Dropdown menu={{items, onClick: setFilterOrderStatus, selectable: true, defaultSelectedKeys:[orderStat.key.toString()]}} trigger={['click']}>

                <Button type='text' className='flex items-center' >
                <SettingOutlined size={15}/>
                </Button>
          </Dropdown>
                </span>
                </div>}
          value={orderCount}
          valueStyle={{
            color: icon.color,
          }}
          prefix={icon.jsx}
        />
      </Card>
    </Col>
    
    <Col span={6}>
      <Card bordered={false} className='h-full'>
        <Statistic
          title="Total Orders Completed Today"
          value={completedOrderCount}
          valueStyle={{
            color: '#2ebef9',
          }}
          prefix={<FontAwesomeIcon icon={faPrint} />}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card bordered={false} className='h-full'>
        <Statistic 
          title="Print Shop"
          value={isPrintShopActive.isActive ? "Open" : "Closed"}
          valueStyle={{
            color: isPrintShopActive.isActive ? '#3f8600': '#cf1322',
          }}
          prefix={<FontAwesomeIcon icon={ isPrintShopActive.isActive ? faDoorOpen : faDoorClosed} />}
        />
      </Card>
    </Col>
  </Row>
    )
}
export default TopCards;