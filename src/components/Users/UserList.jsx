import { Avatar, List, Popconfirm, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../store/Users/Thunks';
import AddUserModal from './AddUserModal';
import { faExclamation, faExclamationCircle, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
const UserList = ({open, setOpen, users}) => {
    const account = useSelector((state) => state.Account.account)
    const [activeUser, setActiveUser] = useState(null)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [openPopIndex, setOpenPopIndex] = useState(-1);
    const cleanImg = (string) => {
        const pattern = /\([^()]*\)/g;
        const cleanString = string.replace(pattern, "");
        return cleanString.trim();
      };

      const deleteUser = () => {
        setConfirmLoading(true);
        setTimeout(() => {
          setConfirmLoading(false);
          setOpenPopIndex(-1);
        }, 2000);
      };
    return(
        <div className='overflow-auto w-full h-[700px]'>
        <List
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(item, index) => (
            <List.Item
              actions={account.privileges === 'admin' ? [
                <button
                  onClick={() => {
                    setActiveUser(item);
                  }}
                  className={`text-[#233043] hover:bg-[#ff9800] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full
                 `}
                >
                  <FontAwesomeIcon icon={faPencil} key="edit" />
                </button>,
                <span>
                  <button
                    onClick={() => setOpenPopIndex(index)}
                    className={`text-[#233043] hover:bg-[#fa2222] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full  ${account._id == item._id ? 'invisible' : ''}`}
                  >
                    <FontAwesomeIcon icon={faTrash} edit="delete" />
                  </button>
                  {openPopIndex === index && (
                    <Popconfirm
                    icon={<FontAwesomeIcon icon={faExclamationCircle} className='text-red-500' />}
                      placement="left"
                      title={` Delete ${item.firstName}'s account?`}
                      description="All user data will be deleted."
                      visible={openPopIndex === index}
                      okButtonProps={{className: 'bg-accent',
                        loading: confirmLoading}}
                      okText="Confirm"
                      onConfirm={() => {
                        deleteUser()
                      }}
                      onCancel={() => setOpenPopIndex(-1)} 
                    />
                  )}
                </span>
              ] : null}
              key={index}
            >
              <List.Item.Meta
                avatar={<Avatar src={`http://192.168.55.26/wp-content/uploads/${cleanImg(
                  item.firstName
                )}-${item.lastName}.jpg`} />}
                title={<div><span>{item.firstName} {item.lastName}</span>
                {account._id == item._id ?
                 <Tag className='ms-1' icon={<FontAwesomeIcon icon={faCheckCircle} className='me-1'/>} color="success"> Logged in as</Tag>
                : null}
                 </div>}
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