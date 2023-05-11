import { useEffect } from "react"
import { useDispatch } from "react-redux"
import DepartmentView from "~/components/Department/DepartmentView"
import Layout from "~/components/Layout"
import { getDepartments } from "../../store/Departments/Thunks"



const Departments = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDepartments())
    }, [])
    return (
        <Layout>
            <div>
                <DepartmentView />
            </div>
        </Layout>
    )
}

export default Departments