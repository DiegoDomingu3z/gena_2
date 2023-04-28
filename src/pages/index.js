import { useRouter } from "next/router";
import Layout from "~/components/Layout";
import Login from "~/components/Login";
import Signup from "~/components/Signup";
import { useEffect, useState } from "react";
import { LoginProvider } from "~/Contexts/LoginContext";
import HomeDashboard from "~/components/HomeDashboard";



export default function Home() {
  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');

  }, [])

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
