import { api } from "../../../../../axiosService"

export const getTopLabels = async(count) => {
    const res = await api.get(`/api/analytics//top-labels/count=${count}`).then((res) => res.data)
    .catch((err) => console.log(err))
    return res
}


export const DROPDOWNS = [
    {
        key: 1,
        label: "Kanban"
    },
    {
        key: 2,
        label: "Singular" 
    },
]