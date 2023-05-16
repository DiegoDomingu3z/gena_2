import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "~/components/Layout";
import PrintOrders from "~/components/PrintShopView/PrintOrders";
import { getApprovedOrders, getDeliveredOrders, getProcessingOrder } from "../../store/PrintShop/Thunks";




const PrintShop = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const getOrders = async () => {
            const token = sessionStorage.getItem('accessToken')
            await dispatch(getApprovedOrders(token))
            await dispatch(getProcessingOrder(token))
            await dispatch(getDeliveredOrders(token))
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