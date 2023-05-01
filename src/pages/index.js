import { useRouter } from "next/router";
import Layout from "~/components/Layout";
import Login from "~/components/Login";
import { useEffect, useState } from "react";
import { LoginProvider } from "~/Contexts/LoginContext";
import HomeDashboard from "~/components/HomeDashboard";
import { Provider } from "react-redux";
import { store } from "../../store";



export default function Home() {
  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');

  }, [])

  const router = useRouter;

  return (
    <Provider store={store}>
      <LoginProvider>
        <Layout title={"home"}>
          <Login />
          <HomeDashboard />
        </Layout>
      </LoginProvider>
    </Provider>
  )
}
