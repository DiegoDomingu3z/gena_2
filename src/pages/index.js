import { useRouter } from "next/router";
import Layout from "~/components/Layout";
import Login from "~/components/Login";
import Signup from "~/components/Signup";
import { useEffect, useState } from "react";
import { LoginProvider } from "~/Contexts/LoginContext";
import HomeDashboard from "~/components/HomeDashboard";
import { Provider } from "react-redux";
import { store } from "../../store";



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
    <Provider store={store}>
      <LoginProvider>
        <Layout title={"home"}>
          <Login />
        </Layout>
      </LoginProvider>
    </Provider>
  )
}
