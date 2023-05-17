import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "~/components/Layout";
import PrintOrders from "~/components/PrintShopView/PrintOrders";
import { getApprovedOrders, getDeliveredOrders, getProcessingOrder } from "../../store/PrintShop/Thunks";




const PrintShop = () => {
    const dispatch = useDispatch()
    const order = useSelector((state) => state.PrintShop.processingOrders.orders)
    useEffect(() => {
        const getOrders = async () => {
            const token = sessionStorage.getItem('accessToken')
            await dispatch(getApprovedOrders(token))
            await dispatch(getProcessingOrder(token))
            await dispatch(getDeliveredOrders(token))
            console.log('getting called')
        }
        getOrders()
    }, [])
    return (
        <Layout>
            <PrintOrders />
        </Layout>
    )
}


export default PrintShop;