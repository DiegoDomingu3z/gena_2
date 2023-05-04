import { LoginProvider } from "~/Contexts/LoginContext"
import Layout from "~/components/Layout"
import NewSubCategory from "~/components/PrintShopView/NewSubCategory"

const SubCategory = () => {
    return (
        <LoginProvider>
            <Layout title={'SubCategory'}>
                <NewSubCategory />
            </Layout>
        </LoginProvider>
    )
}

export default SubCategory

