import { SettingOutlined } from "@ant-design/icons"
import { Button, Card, Col, Row, Avatar, List, Space  } from "antd"
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react"
import React from 'react';
import { getTopLabels } from "./DataFetchers"

const TopLabels = () => {
    const [topLabels, setTopLabels] = useState([])
    // useEffect(async() => {
    //     const fetchData = async () => {
    //         const data = await getTopLabels() 
    //         setTopLabels(data)
    //     }
    //     await fetchData()
    // }, [])

    const data = Array.from({
        length: 23,
      }).map((_, i) => ({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      }));


      const IconText = ({ icon, text }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
      );
    return(
        <Card
        className=""
        title={
        <div className="flex items-center justify-between">
            <div>Top Labels Ordered</div>
            <div><SettingOutlined />
            </div>
            </div>}>
            <List dataSource={data} itemLayout="vertical" pagination={{onChange: (page) => {
                console.log(page)
            },
            pageSize: 5}}
            renderItem={(item) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                  ]}
                  extra={
                    <img
                      width={50}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  }
                >
                  <List.Item.Meta
                    title={<span>Extra Stock Card</span>}
                    description={<></>}
                  />
                  {item.content}
                </List.Item>
              )}/>

            
        </Card>
    )
}

export default TopLabels