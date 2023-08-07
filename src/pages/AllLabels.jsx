import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Layout from "~/components/Layout"
import { getLabels } from "../../store/Label/Thunks"
import LabelsInCategory from "~/components/SavedLabels/labels"


const AllLabels = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const labels = useSelector((state) => state.Label.activeLabels)
    useEffect(() => {
        const activeCategory = router.query.categoryId
        const activeSubCategoryId = router.query.subCategoryId
        dispatch(getLabels({ activeCategory, activeSubCategoryId }))
        console.log(labels)
    }, [])
    return (
        <Layout title={"Gena | Departments"}>
            <div>
                <LabelsInCategory />
            </div>
        </Layout>
    )
}

export default AllLabels