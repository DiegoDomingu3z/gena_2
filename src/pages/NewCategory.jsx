import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginProvider } from "~/Contexts/LoginContext";
import Layout from '~/components/Layout'
import NewCategory from "~/components/PrintShopView/NewCategory";
import { getCategories } from "../../store/Category/Thunk";
const NewCategory = () => {
    const dispatch = useDispatch()
    const cats = useSelector((state) => state.Category.categories)
    const [triggerFetch, setTriggerFetch] = useState(false)
    useEffect(() => {
        dispatch(getCategories())
    }, [triggerFetch])

    return (
        <LoginProvider>
            <Layout title={'Gena | New Category'}>
                <NewCategory triggerFetch={triggerFetch} setTriggerFetch={setTriggerFetch} />
            </Layout>
        </LoginProvider>
    )
}

export default NewCategory;