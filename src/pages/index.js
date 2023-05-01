import { useRouter } from "next/router";
import Layout from "~/components/Layout";
import Login from "~/components/Login";
import Signup from "~/components/Signup";
import { useEffect, useState } from "react";
import { LoginProvider } from "~/Contexts/LoginContext";
import HomeDashboard from "~/components/HomeDashboard";
import { useLoginInput } from "~/Contexts/LoginContext";
import { api } from "../../axiosService";



export default function Home() {

  // useEffect(() => {
  //   (async () => {
  //     const accessToken = sessionStorage.getItem('accessToken');
      
  //     if (accessToken) {
  //       const auth = await api.get("", {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });
  //       console.log(auth)
  //     }
  //   })
  // }, []);

  const router = useRouter;
  
  return (
    <LoginProvider>
      <Layout title={"Gena | Home"}>
        <Login />
        <HomeDashboard />
        <Signup />
      </Layout>
    </LoginProvider>
  )
}
