import React from 'react';
import { DatePicker, Space, Button } from 'antd';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
const DashDatePicker = ({showCalendar, setShowCalendar}) => {
    const customInput = () => {
        return (
            <div>
                this works
            </div>
        )
    }
    const onChange = (date) => {
        if (date) {
          console.log('Date: ', date);
        } else {
          console.log('Clear');
        }
      };
      const onRangeChange = (dates, dateStrings) => {
        if (dates) {
          console.log('From: ', dates[0], ', to: ', dates[1]);
          console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else {
          console.log('Clear');
        }
      };


    const rangePresets = [
        {
          label: 'Last 7 Days',
          value: [dayjs().add(-7, 'd'), dayjs()],
        },
        {
          label: 'Last 14 Days',
          value: [dayjs().add(-14, 'd'), dayjs()],
        },
        {
          label: 'Last 30 Days',
          value: [dayjs().add(-30, 'd'), dayjs()],
        },
        {
          label: 'Last 90 Days',
          value: [dayjs().add(-90, 'd'), dayjs()],
        },
      ];


      const filter = () => {
        setShowCalendar(false)
      }
    return ( 
        <RangePicker presets={rangePresets} onChange={onRangeChange} onOk={filter} open={showCalendar} onOpenChange={() => setShowCalendar(false)} needConfirm={true} style={{ visibility: "hidden", width: 0 }}/>
    )
}

export default DashDatePicker;