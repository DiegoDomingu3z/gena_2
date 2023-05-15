import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
import { Collapse, Divider, Tooltip } from 'antd';
import { PrinterOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { BeatLoader } from "react-spinners";
const { Panel } = Collapse;
const PrintShopApproved = () => {
    const order = useSelector((state) => state.PrintShop.approvedOrders)
    const [multipleOrders, setMultipleOrders] = useState([])
    const [orders, setOrders] = useState([])
    const dispatch = useDispatch()
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }




    const genExtra = (name, id) => (
        <div>

            <Tooltip placement="top" title={`Print ${name}'s order?`} >
                <button className='text-[#233043] hover:bg-[#ff9800] hover:text-white transition-all ease-in-out w-8 rounded-full pb-2'>
                    <PrinterOutlined
                        onClick={(event) => {
                            // If you don't want click extra trigger collapse, you can prevent this:
                            console.log("YESSIR")
                            event.stopPropagation();
                        }}
                    />
                </button>
            </Tooltip>
            <Tooltip placement="top" title={`Print ${name}'s order?`} >
                {!multipleOrders.includes(orders.map((o) => o._id))
                    ?
                    <button className='text-[#233043] hover:bg-[#22eb5e] hover:text-white transition-all ease-in-out w-8 rounded-full pb-2'>
                        <UploadOutlined
                            onClick={(event) => {
                                // If you don't want click extra trigger collapse, you can prevent this:
                                setMultipleOrders(prevIds => [...prevIds, id])
                                console.log(multipleOrders)
                                event.stopPropagation();
                            }}
                        />
                    </button> : null
                }

            </Tooltip>
        </div>
    );


    return (
        <div>
            {order.length > 0 ?
                order.map((o) => (
                    <div key={o._id} >
                        <Divider orientation="left"> Marketing </Divider>
                        <Collapse size="large">
                            <Panel onClick={() => console.log(o._id)} header={`${o.creatorName} - ${o._id} - ${formatDate(o.createdOn)}`} key={o._id} extra={
                                <div>
                                    {!multipleOrders.includes(o._id) ?
                                        <Tooltip placement="top" title={`Print ${o.creatorName}'s order?`} >
                                            <button className='text-[#233043] hover:bg-[#ff9800] hover:text-white transition-all ease-in-out w-8 rounded-full pb-2'>
                                                <PrinterOutlined
                                                    onClick={(event) => {
                                                        // If you don't want click extra trigger collapse, you can prevent this:
                                                        console.log("YESSIR")
                                                        event.stopPropagation();
                                                    }}
                                                />
                                            </button>
                                        </Tooltip>
                                        : null}
                                    {!multipleOrders.includes(o._id)
                                        ?
                                        <Tooltip placement="top" title={`Add to process multiple?`} >
                                            <button className='text-[#233043] hover:bg-[#22eb5e] hover:text-white transition-all ease-in-out w-8 rounded-full pb-2'>
                                                <UploadOutlined
                                                    onClick={(event) => {
                                                        setMultipleOrders(prevIds => [...prevIds, o._id])
                                                        event.stopPropagation();
                                                    }}
                                                />
                                            </button>
                                        </Tooltip>
                                        :
                                        <Tooltip title={`Remove from process multiple`}>
                                            <button>
                                                <BeatLoader size={8} color="red"
                                                    onClick={(event) => {
                                                        let newList = multipleOrders.filter(i => i != o._id)
                                                        setMultipleOrders(newList)
                                                        event.stopPropagation();
                                                    }}
                                                />
                                            </button>
                                        </Tooltip>
                                    }

                                </div>
                            }>
                                <div>
                                    <div className="grid grid-col-4">
                                        <iframe src="" frameborder="0"></iframe>
                                    </div>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                ))
                : null
            }
        </div>
    );

}

export default PrintShopApproved



