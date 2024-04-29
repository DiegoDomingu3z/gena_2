import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetterOfString } from "../../../func/resuableFunctions";
import { removeDept } from "../../../store/Departments/Thunks";
import GenaModal from "../toasts-modals/GenaModal";
import useGenaToast from "../toasts-modals/GenaToast";
import UpdateDepartmentForm from "./forms/UpdateDepartmentForm";
import UpdateDepartment from "./forms/UpdateDepartmentForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { faPencil, faExclamationCircle, faTrash, faCheckCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Tooltip, List, Popconfirm, Tag, Button } from "antd"
import AddDepartmentForm from "./forms/AddDepartmentForm";


const DepartmentList = ({triggerUseEffect, setTriggerUseEffect,}) => {
    // ! SCOPED VARIABLES */
    const dept = useSelector((state) => state.Department.departments);
    const user = useSelector((state) => state.Account);
    const account = useSelector((state) => state.Account.account)
    const router = useRouter();
    const dispatch = useDispatch();
    const [openPopIndex, setOpenPopIndex] = useState(-1);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [activeDepartment, setActiveDepartment] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [open, setOpen] = useState(false)
    const {successToast, errorToast, contextHolder} = useGenaToast()
    const [token, setToken] = useState(null)

    // ! SCOPED FUNCTIONS */
    useEffect(() => {
        if (window.sessionStorage.getItem('accessToken')) {
            setToken(token)
        }
    }, [])

    const showUsers = (id, name) => {
        const queryParams = {
          departmentId: id,
          name: name,
        };
        router.push({
          pathname: "/Department-Users",
          query: queryParams,
        });
      };

      const removeDepartment = (id) => {
        dispatch(removeDept({token, id})).then(() => {
            successToast("Deleted Department Successfully!")
        }).catch((err) => {
            errorToast("Oops something went wrong", err)
        })
      }

    // ! RETURNING JSX */
    return (
        <div  className="flex flex-col pl-20 pr-20 pt-20 pb-4">
        <div>
        <div className="flex items-end">
          <div className="mr-auto">
            <h1 className="text-3xl font-medium font-genaPrimary">
              Departments
            </h1>
          </div>
          <div className="flex items-center">
            <Button type="primary" className="bg-accent transform transition-transform duration-300 hover:scale-105"
            onClick={() => {
                setOpen(true)
            }}>
           <FontAwesomeIcon icon={faPlus} /> {" "} <span className="ms-2">Add New</span>
            </Button>
          </div>
        </div>
        <div className="mb-10 mt-5 border-t border-gray-300 rounded-full" />
      </div>
        <div className='overflow-auto w-full h-[700px]'>
            {contextHolder}
        <List
          itemLayout="horizontal"
          dataSource={dept}
          renderItem={(item, index) => (
              <List.Item onClick={() => showUsers(item._id, item.name)} className='mt-3 hover:scale-y-110 transform duration-200 hover:bg-slate-100 transition-all ease-in-out cursor-pointer'
              actions={account.privileges === 'admin' ? [
                  <Tooltip title={`Edit ${item.name}?`}>
                <button
                  onClick={(event) => {
                      event.stopPropagation()
                      setActiveDepartment(item)
                      setOpenEditModal(true)
                }}
                className={`text-[#233043] hover:bg-[#ff9800] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full
                    `}
                    >
                  <FontAwesomeIcon icon={faPencil} key="edit" />
                </button>
                    </Tooltip>,
                <span>
                    <Tooltip title={`Delete ${item.name} Department?`}>
                  <button
                    onClick={(event) => {
                        event.stopPropagation();
                        setOpenPopIndex(index)
                    }}
                    className={`text-[#233043] hover:bg-[#fa2222] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full  ${account._id == item._id ? 'invisible' : ''}`}
                    >
                    <FontAwesomeIcon icon={faTrash} edit="delete" />
                  </button>
                      </Tooltip>
                  {openPopIndex === index && (
                    <Popconfirm
                    icon={<FontAwesomeIcon icon={faExclamationCircle} className='text-red-500' />}
                    placement="left"
                    title={` Delete ${item.name}`}
                    description="All user accounts within this department will be deleted!"
                    visible={openPopIndex === index}
                    okButtonProps={{className: 'bg-accent',
                    loading: confirmLoading}}
                    okText="Confirm"
                    onConfirm={(event) => {
                        event.stopPropagation(); 
                        removeDepartment(item._id)
                    }}
                    onCancel={(event) => {
                        event.stopPropagation();
                        setOpenPopIndex(-1)
                    }} 
                    />
                )}
                </span>
              ] : null}
              key={index}
              >
              <List.Item.Meta
                title={<div><span>{capitalizeFirstLetterOfString(item.name)}</span>
                {account.departmentId == item._id ?
                 <Tag className='ms-1' icon={<FontAwesomeIcon icon={faCheckCircle} className='me-1'/>} color="success">My Department</Tag>
                : null}
                 </div>}
              />
            </List.Item>
          )}
          />
        {openEditModal && (
          <GenaModal 
          open={openEditModal} setOpen={setOpenEditModal}
            title={`Updating ${capitalizeFirstLetterOfString(activeDepartment.name)} Department`}
           body={<UpdateDepartmentForm 
            modalState={openEditModal} 
            setModalState={setOpenEditModal} 
            department={activeDepartment} />} />
        )}
        {open && (
            <GenaModal open={open} setOpen={setOpen} title={`Add new department`}
             body={<AddDepartmentForm setOpen={setOpen} />} />
        )}
        
      </div>
        </div>
    )
}

export default DepartmentList