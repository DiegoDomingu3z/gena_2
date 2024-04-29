import { Avatar, List, Popconfirm, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../../store/Users/Thunks';
import { faExclamationCircle, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import GenaModal from '../toasts-modals/GenaModal';
import DepartmentUserModal from '../Department/forms/UpdateUserForm';
import { formatImgString } from '../../../func/resuableFunctions';
import useGenaToast from '../toasts-modals/GenaToast';
import NewUserForm from '../login-signup/NewUserForm';
const UserList = ({open, setOpen, users}) => {
    // ! SCOPED VARIABLES */
    const account = useSelector((state) => state.Account.account)
    const [activeUser, setActiveUser] = useState(null)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [openPopIndex, setOpenPopIndex] = useState(-1);
    const { successToast, errorToast, contextHolder } = useGenaToast();
    const dispatch = useDispatch()

    // ! SCOPED FUNCTIONS */
      const removeUser = (user) => {
        try {
          const token = account.accessToken
          const id = user._id
          setConfirmLoading(true);
          dispatch(deleteUser({id, token}))
          setTimeout(() => {
            setConfirmLoading(false);
            setOpenPopIndex(-1);
            successToast(`Removed ${user.firstName} from Gena.`)
          }, 2000);
        } catch (error) {
          errorToast(error, error.message)
          console.log(error)
        }
        
      };
    
    // ! RETURNING JSX */
    return(
        <div className='overflow-auto w-full h-[700px]'>
            {contextHolder}
        <List
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(item, index) => (
            <List.Item className='hover:scale-y-110 transform duration-200 hover:bg-slate-100 transition-all ease-in-out'
              actions={account.privileges === 'admin' ? [
                <Tooltip title={`Edit ${item.firstName}'s Account?`}>
                <button
                  onClick={() => {
                      setActiveUser(item);
                      setOpenEditModal(true)
                    }}
                    className={`text-[#233043] hover:bg-[#ff9800] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full
                    `}
                    >
                  <FontAwesomeIcon icon={faPencil} key="edit" />
                </button>
                    </Tooltip>,
                <span>
                    <Tooltip title={`Delete ${item.firstName}'s Account?`}>
                  <button
                    onClick={() => setOpenPopIndex(index)}
                    className={`text-[#233043] hover:bg-[#fa2222] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full  ${account._id == item._id ? 'invisible' : ''}`}
                    >
                    <FontAwesomeIcon icon={faTrash} edit="delete" />
                  </button>
                      </Tooltip>
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
                        removeUser(item)
                      }}
                      onCancel={() => setOpenPopIndex(-1)} 
                    />
                  )}
                </span>
              ] : null}
              key={index}
            >
              <List.Item.Meta
                avatar={<Avatar src={`${formatImgString(item.firstName,item.lastName, "jpg" )}`} />}
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
        <GenaModal open={open} setOpen={setOpen} title="New User Form"  body={<NewUserForm setOpen={setOpen}/>} />
        {openEditModal && (
          <GenaModal open={openEditModal} setOpen={setOpenEditModal}  body={<DepartmentUserModal modalState={openEditModal} setModalState={setOpenEditModal} activeUser={activeUser} />} />
        )}
        
      </div>
    )
}

export default UserList