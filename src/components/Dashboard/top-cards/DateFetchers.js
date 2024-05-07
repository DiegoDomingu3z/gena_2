import { api } from "../../../../axiosService"

export const fetchOrderCount = async (status, setOrderCount) => {
    const res = await api.get(`/api/analytics/orders/status=${status}`).then((res) => res.data)
    .catch((err) => console.log(err))
    console.log(res)
    setOrderCount(res.count)
  }

export const orderDateFilter = async (date) => {
    const res = await api.get(`/api/analytics/orders/date=${date}`).then((res) => res.data)
    .catch((err) => console.log(err))
    console.log(res)
    return res
  }

export const printShopActivity = async () => {
    const res = await api.get('/api/analytics/print-shop/status').then((res) => res.data)
    .catch((err) => console.log(err))
    return res
}