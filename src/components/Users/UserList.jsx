import { Avatar, List } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../store/Users/Thunks';
import AddUserModal from './AddUserModal';
const UserList = ({open, setOpen, users}) => {


    const cleanImg = (string) => {
        const pattern = /\([^()]*\)/g;
        const cleanString = string.replace(pattern, "");
        return cleanString.trim();
      };
    return(
        <div className='overflow-auto w-full h-[700px]'>
        <List
    itemLayout="horizontal"
    dataSource={users}
    renderItem={(item, index) => (
        <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`http://192.168.55.26/wp-content/uploads/${cleanImg(
            item.firstName
          )}-${item.lastName}.jpg`} />}
          title={<span>{item.firstName} {item.lastName}</span>}
          description={`Department: ${item.department} | Position: ${item.privileges} | Email: ${item.email ? item.email : "N/A"}`}
          />
      </List.Item>
    )}
    />
    <AddUserModal open={open} setOpen={setOpen} />
    </div>
    )
}

export default UserList