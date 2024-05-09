import { SettingOutlined } from '@ant-design/icons';
import { Card, List, Tag, Tooltip, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { api } from '../../../../../axiosService';
import CountUp from 'react-countup';
const TopMaterials = () => {
    const [materials, setMaterials] = useState()
    const formatter = (value) => <CountUp end={value} separator="," />;
    useEffect(() => {
        const fetchData = async() => {
            const data = await api.get('api/analytics/materials').then((res) => res.data)
            .catch((err) => console.log(err))
            setMaterials(data)
        }

        fetchData()
    })
    return (
        <Card className='' title={<div className='flex items-center justify-between'><div>Top Materials</div></div>}>
            <List size='large' dataSource={materials} renderItem={(material, index) => (
                <List.Item key={material.name} actions={[
                    <Tooltip key={1} title="Used in Orders" className='cursor-pointer transition-all ease-in-out hover:scale-125'>
                    <Tag color='blue'>{formatter(material.totalUsedForOrder)}</Tag>
                    </Tooltip>
                ]}>
                    <b>{index + 1}</b>. {material.name}
                </List.Item>
            )} />
        </Card>
    )
}

export default TopMaterials