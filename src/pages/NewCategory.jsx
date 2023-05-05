import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginProvider } from "~/Contexts/LoginContext";
import Layout from '~/components/Layout'
import NewCategory from "~/components/PrintShopView/NewCategory";
import { getCategories } from "../../store/Category/Thunk";
const newCategory = () => {
    const dispatch = useDispatch()
    const cats = useSelector((state) => state.Category.categories)
    useEffect(() => {
        dispatch(getCategories())
    }, [])

    return (
        <LoginProvider>
            <Layout title={'New Category'}>
                <NewCategory />
            </Layout>
        </LoginProvider>
    )
}

export default newCategory;