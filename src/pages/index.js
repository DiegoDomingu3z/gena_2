import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Layout from "~/components/Layout";
import Login from "~/components/Login";
import { currentUser } from "../../store/userLogin";


export default function Home() {
  const currentUser = useSelector((state) => state.currentUser)
  console.log(currentUser)
  const router = useRouter;
  
  return (
    <Layout title={"home"}>
      {!currentUser.userName && <Login />}
      {currentUser.userName && <h1>Hello</h1>}
    </Layout>
  )
}
