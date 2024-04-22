import { useRouter } from "next/router";
import Layout from "~/components/Layout";
import Login from "~/components/Login";
import Signup from "~/components/Signup";
import { useEffect, useState } from "react";
import HomeDashboard from "~/components/HomeDashboard";
import { Provider } from "react-redux";
import { store } from "../../store";

export default function Home() {
  return (
    <Provider store={store}>
      <Layout title={"Gena | Login"}>
        <Login />
      </Layout>
    </Provider>
  );
}
