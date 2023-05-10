import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


const DepartmentUsers = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    useEffect(() => {
        const { departmentId } = router.query
        // if (departmentId) {

        // }
    }, [router.query])
    return (
        <div>

            yooo
        </div>
    )
}

export default DepartmentUsers;