import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosService";




export const getDepartments = createAsyncThunk(
    'departments/get',
    async () => {
        try {
            const res = await api.get('api/department/all')
                .then((res) => res.data)
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)


export const getLeads = createAsyncThunk(
    'leads/get',
    async () => {
        try {
            const res = await api.get('api/department/team-lead')
                .then((res) => res.data)
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
            throw error
        }
    }

)


export const createDepartment = createAsyncThunk(
    'department/create',
    async ({ data, token }) => {
        try {
            const res = await api.post('api/department/create', data, {
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

export const getUsersInDepartment = createAsyncThunk(
    'department/users',
    async (id) => {
        try {
            const res = await api.get(`api/department/${id}/users`)
                .then((res) => res.data)
            return res
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)

export const updateDepartmentName = createAsyncThunk(
    'update/department',
    async ({ token, id, newName }) => {
        try {
            const data = { name: newName }
            const res = await api.put(`api/department/${id}/update`, data, {
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

export const removeDept = createAsyncThunk(
    'remove/department',
    async ({ token, id }) => {
        try {
            console.log("GETTING CALLED")
            const res = await api.delete(`api/department/${id}/remove`, {
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


