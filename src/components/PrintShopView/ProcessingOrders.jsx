
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
import { Collapse, Divider, Tooltip } from 'antd';
import { PrinterOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { BeatLoader, RingLoader } from "react-spinners";
import { getAllUsers } from "../../../store/Account/thunks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNoteSticky, faCheckCircle, faAdd, faFile, faCircle } from '@fortawesome/free-solid-svg-icons'
import { api } from "../../../axiosService";
import { deliverOrder, getApprovedOrders, getDeliveredOrders, getProcessingOrder } from "../../../store/PrintShop/Thunks";
import Swal from "sweetalert2";

const { Panel } = Collapse;
const ProcessingOrders = ({ deliverMultipleOrders, setDeliverMultipleOrders }) => {
    const order = useSelector((state) => state.PrintShop.processingOrders.orders)
    const pdf = useSelector((state) => state.PrintShop.processingOrders.arr)
    const user = useSelector((state) => state.Account.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    const getUser = (id) => {
        const singleUser = user.filter(u => u._id == id).shift()
        return `${singleUser.department}`
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

    const sanitizePath = (path) => {
        // MIGHT HAVE TO CHANGE IN THE FUTURE
        let realPath = path.slice(46)
        console.log(realPath, 'yuh')
        return `${realPath}`
    }

    const openFileManager = async (id) => {
        await api.post('api/printshop/openFileManger/' + id)
    };


    const markOrderAsDelivered = async (id) => {
        const token = sessionStorage.getItem('accessToken')
        await dispatch(deliverOrder({ token, id }))
        await dispatch(getApprovedOrders(token))
        await dispatch(getProcessingOrder(token))
        await dispatch(getDeliveredOrders(token))
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
            title: `Delivered Order ID: ${id}`
        })
    }


    return (
        <div>
            {order ?
                order.map((o, index) => (
                    <div key={o._id} >
                        <Divider orientation="left" className="flex"> Department: {user.length > 0 ? <span>{getUser(o.creatorId)}</span> : <RingLoader size={6} />} </Divider>
                        <Collapse size="large">
                            <Panel onClick={() => console.log(o._id)} header={`${o.creatorName} - ${o._id} - ${formatDate(o.createdOn)}`} key={o._id} extra={
                                <div>
                                    <Tooltip placement="top" title={`Open in File Manager?`} >
                                        <button onClick={(event) => {
                                            openFileManager(o._id)
                                            event.stopPropagation();
                                        }} className='text-[#233043] hover:bg-[#ff9800] hover:text-white transition-all ease-in-out w-8 rounded-full py-1'>
                                            <FontAwesomeIcon icon={faFile} />
                                        </button>
                                    </Tooltip>
                                    {o.notes || o.notes != '' ?
                                        <Tooltip placement="top" title={o.notes}>
                                            <button className='text-[#233043] hover:bg-[#ff9800] hover:text-white transition-all ease-in-out w-8 rounded-full py-1'>
                                                <FontAwesomeIcon icon={faNoteSticky} />
                                            </button>
                                        </Tooltip> : null
                                    }
                                    {!deliverMultipleOrders.includes(o._id) ?

                                        <Tooltip placement="top" title={`Deliver ${o.creatorName}'s Order?`} >
                                            <button onClick={(event) => {
                                                markOrderAsDelivered(o._id)
                                                event.stopPropagation();
                                            }} className='text-[#233043] hover:bg-[#ff9800] hover:text-white transition-all ease-in-out w-8 rounded-full py-1'>
                                                <FontAwesomeIcon icon={faCheckCircle} />
                                            </button>
                                        </Tooltip>


                                        : null}

                                        
                                    {/* {!deliverMultipleOrders.includes(o._id)
                                        ?
                                        <Tooltip placement="top" title={`Add to Deliver multiple?`} >
                                            <button className='text-[#233043] hover:bg-[#22eb5e] hover:text-white transition-all ease-in-out w-8 rounded-full py-1 '>
                                                <FontAwesomeIcon icon={faAdd} />
                                            </button>
                                        </Tooltip>
                                        :
                                        <Tooltip title={`Remove from Deliver multiple`}>
                                            <button>
                                                <BeatLoader size={8} color="red"
                                                    onClick={(event) => {
                                                        let newList = deliverMultipleOrders.filter(i => i != o._id)
                                                        setDeliverMultipleOrders(newList)
                                                        event.stopPropagation();
                                                    }}
                                                />
                                            </button>
                                        </Tooltip>
                                    } */}

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
                                                <div className="text-center mb-3 mt-1">{p.material}</div>
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

export default ProcessingOrders;