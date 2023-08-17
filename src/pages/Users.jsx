import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "~/components/Layout";
import Signup from "~/components/Signup";





const Users = () => {
    const account = useSelector((state) => state.Account.account)
    const router = useRouter()
    useEffect(() => {
        if (account.privileges != 'admin') {
            router.push('/start-new-order')
        }
    })
    return (
        <Layout title={"Gena | Add User"}>
            <Signup />
        </Layout>
    )
}

export default Users;