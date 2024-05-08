import { SettingOutlined } from "@ant-design/icons"
import { Button, Card, Col, Row, Avatar, List, Space, Tooltip, Dropdown, Tag, Statistic, Breadcrumb  } from "antd"
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from "react"
import React from 'react';
import { DROPDOWNS, getTopLabels } from "./DataFetchers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import CountUp from 'react-countup';

const TopLabels = () => {
    const [topLabels, setTopLabels] = useState([])
    const formatter = (value) => <CountUp end={value} separator="," />;
    const [filterLabel, setFilterLabel] = useState(DROPDOWNS[0].label)
    useEffect(() => {
      const fetchData = async () => {
          const data = await getTopLabels(15);
          setTopLabels(data);
          console.log(data);
      };
  
      fetchData();
  
  }, []);

  const filterDropdown = useCallback(async({key}) => {
      setFilterLabel(DROPDOWNS[key - 1].label)
  }, [])


    return(
        <Card
        className=""
        title={
        <div className="flex items-center justify-between">
            <div className="flex items-center justify-between w-full"><div>Top Labels</div> <Tag color="blue">{filterLabel}</Tag></div>
            <div>
            <Dropdown menu={{items: DROPDOWNS, onClick: filterDropdown, selectable: true, defaultSelectedKeys:[DROPDOWNS[0]]}} trigger={['click']}>

<Button type='text' className='flex items-center' >
<SettingOutlined size={15}/>
</Button>
</Dropdown>
            </div>
            </div>}>
            <List dataSource={topLabels} itemLayout="vertical" pagination={{
                onChange: (page) => {
                  console.log(page)
                },
                pageSize: 3
            }}
            renderItem={(item, index) => (
                <List.Item
                  key={index}
                  actions={[
                    <div>
                      <Space className="flex items-center">
                      <Tooltip title={"Total Printed"}>
                    
                 <Tag color="blue" className="flex items-center gap-3 cursor-pointer transition-all ease-in-out hover:scale-125">
                 <svg
              className="w-4"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                  stroke="#1e1e1f"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  ></path>{" "}
              </g>
            </svg>
                  {formatter(item.orderedNum)}</Tag>
                  </Tooltip>
                  <Tooltip title="Document Number" >
                  <Tag color="warning" className="cursor-pointer transition-all ease-in-out hover:scale-125">
                  {item.docNum}
                  </Tag>
                  </Tooltip>
                  { item.isSerial ?
                    <Tooltip title={"Label Type"} className="cursor-pointer transition-all ease-in-out hover:scale-125">
                    <Tag color="success">Serial</Tag>
                  </Tooltip> : null
                  }
                  </Space>
                    </div>
                  ]}
                  extra={
                   <iframe
                   className="rounded pointer-events-none"
            src={ `/api/getPdfs?categoryName=${item.categoryName}&subCategoryName=${item.subCategoryName}&fileName=${item.fileName}`}
            width="100px"
            height="100px"
            frameBorder="0"></iframe>
                  }
                >
                  <List.Item.Meta
                    title={
                      <div>
                    <div>{item.name}</div>
                     <div className="text-sm mt-1 text-gray-500">
                      <Tooltip title="Category" className="cursor-pointer">{item.categoryName}</Tooltip> &gt; <Tooltip className="cursor-pointer" title="Sub Category">{item.subCategoryName}</Tooltip></div>
                      </div>
                  }
                    description={<></>}
                  />
                  
                </List.Item>
              )}/>

            
        </Card>
    )
}

export default TopLabels