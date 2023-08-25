
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
import { Collapse, Divider, Tooltip } from 'antd';
import { PrinterOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { BeatLoader, RingLoader } from "react-spinners";
import { getAllUsers } from "../../../store/Account/thunks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNoteSticky, faCheckCircle, faAdd, faFile, faCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { api } from "../../../axiosService";
import { deliverOrder, getApprovedOrders, getDeliveredOrders, getProcessingOrder, deleteDeliveredOrder } from "../../../store/PrintShop/Thunks";
import Swal from "sweetalert2";

const { Panel } = Collapse;
const DeliveredOrders = ({ deliverMultipleOrders, setDeliverMultipleOrders }) => {
    const order = useSelector((state) => state.PrintShop.deliveredOrders.orders)
    const pdf = useSelector((state) => state.PrintShop.deliveredOrders.arr)
    const user = useSelector((state) => state.Account.users)
    const currentUser = useSelector((state) => state.Account.account)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    const getUser = (id) => {
        const singleUser = user.filter(u => u._id == id).shift()
        return `${singleUser.department}`
    }

    const deleteOldOrder = async (id, token) => {
      await dispatch(deleteDeliveredOrder({id, token}))
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast',
            container: 'top-margin',
        },
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    })
    await Toast.fire({
        icon: 'success',
        title: `Deleted Order ID: ${id}`
    })
    }

    const getUserName = (id) => {
        const singleUser = user.filter(u => u._id == id).shift()
        return `${singleUser.firstName}-${singleUser.lastName}`
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    const today = new Date();
    const day = today.getDate();


    const sanitizePath = (path) => {
        // MIGHT HAVE TO CHANGE IN THE FUTURE
        let realPath = path.slice(33)
        console.log(realPath, 'yuh')
        return `${realPath}`
    }

    const openFileManager = async (id) => {
        await api.post('api/printshop/openFileManger/' + id)
    };

    return (
        <div>
            {order ?
                order.map((o, index) => (
                    <div key={o._id} >
                        <Divider orientation="left" className="flex"> Department: {user.length > 0 ? <span>{getUser(o.creatorId)}</span> : <RingLoader size={6} />} </Divider>
                        <Collapse size="large">
                            <Panel onClick={() => console.log(o._id)} header={`${o.creatorName} - ${o._id} - ${formatDate(o.createdOn)}`} key={o._id} extra={
                                <div>
                                    {day - formatDate(o.updatedOn).split('/')[1] == 14 && <button onClick={() => deleteOldOrder(o._id, currentUser.accessToken)} className="hover:bg-red-500 hover:text-white transition-all ease-in-out rounded-full px-3 py-1"><FontAwesomeIcon icon={faTrash} /></button>}
                                </div>
                            }>
                                <div className="grid grid-cols-3">
                                    {pdf && o.labels ? (
                                        pdf[index].map((p, i) => (
                                            <div key={i} className="mb-5 border-b">
                                                <div className="text-center">DOCNUM: {p.docNum}</div>
                                                <div className="flex justify-center">
                                                    <iframe src={sanitizePath(o.finalOrderPaths[i])} className="w-11/12"></iframe>
                                                </div>
                                                <div className="text-center mb-3 mt-3">QTY to be Printed: {(o.labels[i].qty * p.unitPack)}</div>
                                            </div>
                                        ))
                                    ) : null}
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                ))
                : null
            }
        </div>
    )
}

export default DeliveredOrders;