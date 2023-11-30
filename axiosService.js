import axios from "axios"

export const api = axios.create({
    baseURL: env.NEXT_PUBLIC_AXIOS_URL,
    timeout: 15000
})