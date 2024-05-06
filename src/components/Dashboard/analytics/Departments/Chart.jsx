import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from Next.js
import { Card } from 'antd';
import { api } from '../../../../../axiosService';

// Dynamically import Pie component from ant-design/plots
const Pie = dynamic(() => import('@ant-design/plots').then((mod) => mod.Pie), {
  ssr: false // Disable server-side rendering for this component
});

const Chart = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await api.get('api/analytics/department-orders/all');
                setData(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getData();
    }, []);
    
    const config = {
        data: data,
        angleField: 'value',
        colorField: 'type',
        tooltip: (data) => {
            return `Orders: ${data.value}`
          },
        label: {
          text: 'value',
          style: {
            fontWeight: 'bold',
          },
          
        },
        legend: {
          color: {
            title: false,
            position: 'right',
            rowPadding: 5,
          },
        },
    };

    return (
        <Card title="Total order by department" className='mt-4'>
            <Pie {...config}/>
        </Card>
    )
}

export default Chart;
