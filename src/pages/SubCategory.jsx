import { LoginProvider } from "~/Contexts/LoginContext"
import Layout from "~/components/Layout"
import NewSubCategory from "~/components/PrintShopView/NewSubCategory"

const SubCategory = () => {
    return (
        <LoginProvider>
            <Layout title={'Gena | SubCategory'}>
                <NewSubCategory />
            </Layout>
        </LoginProvider>
    )
}

export default SubCategory

