import axios from "axios"

export const api = axios.create({
    baseURL: "http://192.168.55.26:4005/",
    timeout: 15000
})
