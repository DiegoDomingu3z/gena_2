import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:4005/",
    timeout: 15000
})