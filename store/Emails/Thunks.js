import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";






export const sendCredentials = createAsyncThunk(
    'new-user/email-blast',
    async ({ data, token }) => {
        try {
            const res = await api.post('/api/email/new-user', data, {
                headers: {
                    Authorization: token
                }
            })
                .then((res) => res.data)
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)



export const reportTicket = createAsyncThunk(
    'ticket',
    async ({ data, token }) => {
        try {
            await api.post('api/email/ticket', data, {
                headers: {
                    Authorization: token
                }
            }).then((res) => res.data)
            return res
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)