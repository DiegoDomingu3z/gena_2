import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";




export const createAccount = createAsyncThunk(
    'account/create',
    async (loginData) => {
        try {
            const res = await api.post('api/account/create', loginData)
                .then((res) => res.data)
            return res
        } catch (error) {
            throw error
        }
    }
)


export const getAccount = createAsyncThunk(
    'account/get',
    async (token) => {
        try {
            const res = await api.get('api/account', {
                headers: {
                    Authorization: token
                }
            })
                .then((res) => res.data)
            return res
        } catch (error) {
            throw error
        }
    }
)


export const login = createAsyncThunk(
    'account/login',
    async (loginData) => {
        try {
            const res = await api.post('api/account/login', loginData)
                .then((res) => res.data)
            return res
        } catch (error) {
            throw error
        }
    }
)


export const logout = createAsyncThunk(
    'account/logout',
    async (token) => {
        try {
            const res = await api.put('api/account/logout', {
                headers: {
                    Authorization: token
                }
            })
            return res
        } catch (error) {
            throw error
        }
    })


export const deleteAccount = createAsyncThunk(
    'account/delete',
    async (id, token) => {
        try {
            const res = await api.delete(`api/account/delete-user/${id}`, {
                headers: {
                    Authorization: token
                }
            })
            return res
        } catch (error) {
            throw error
        }
    }
)
