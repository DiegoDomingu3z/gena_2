import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";
import { useRouter } from "next/router";


export const createAccount = createAsyncThunk(
    'account/create',
    async (loginData) => {
        try {
            const res = await api.post('api/account/create', loginData)
                .then((res) => res.data)
            return res
        } catch (error) {
            const { data } = error.response;
            console.log(data)
            return data;
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
            sessionStorage.setItem('accessToken', res.accessToken)
            router.push('/')
            return res
        } catch (error) {
            const { data } = error.response;
            console.log(data)
            return data;
        }
    }
)


export const logout = createAsyncThunk(
    'account/logout',
    async (token) => {
        try {
            const res = await api.put('/api/account/logout', null, {
                headers: {
                    Authorization: token
                }
            })
            sessionStorage.removeItem('accessToken')
            return res
        } catch (error) {
            throw error
        }
    })


export const deleteAccount = createAsyncThunk(
    'account/delete',
    async ({ id, token }) => {
        console.log(token)
        try {
            const res = await api.delete(`api/account/delete-user/${id}`, {
                headers: {
                    Authorization: token
                }
            }).then((res) => res.data)
            console.log(res, "THIS IS THE RES BRO")
            return res
        } catch (error) {
            throw error
        }
    }
)


export const getAllUsers = createAsyncThunk(
    'all/users',
    async () => {
        try {
            const res = await api.get('api/account/all')
                .then((res) => res.data)
            return res
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)


export const updateUser = createAsyncThunk(
    'update/account',
    async ({ token, id, values }) => {
        try {
            const res = await api.put(`api/account/${id}/update`, values, {
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