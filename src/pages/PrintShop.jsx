import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "~/components/layouts/Layout";
import PrintOrders from "~/components/PrintShopView/PrintOrders";
import { getApprovedOrders, getDeliveredOrders, getProcessingOrder, getReadyForPickUpOrders } from "../../store/PrintShop/Thunks";
import { io } from "socket.io-client";

const PrintShop = () => {
    const dispatch = useDispatch()
    const order = useSelector((state) => state.PrintShop.processingOrders.orders)
    const socket = io("http://192.168.55.26:4005/");
    useEffect(() => {
        const token = sessionStorage.getItem('accessToken')
        const getOrders = async () => {
            await dispatch(getApprovedOrders(token))
            await dispatch(getProcessingOrder(token))
            await dispatch(getDeliveredOrders(token))
            await dispatch(getReadyForPickUpOrders(token));
        }
        getOrders()

        socket.on("approvedOrder", async (data) => {
            if (data.status == 200) {
                await dispatch(getApprovedOrders(token));
            }
        });

        return () => {
            socket.off("approvedOrder");
        };
    }, [])
    return (
        <Layout displayTitle={"Print Shop"} title={"Gena | Print Shop"}>
            <PrintOrders />
        </Layout>
    )
}

export default PrintShop;
