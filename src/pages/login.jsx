import React from "react";
import Login from "~/components/Login";
import { LoginProvider } from "~/Contexts/LoginContext";
import Layout from "~/components/Layout";

const login = () => {
  return (
    <LoginProvider>
      <Layout title={"Gena | Login"}>
        <Login />
      </Layout>
    </LoginProvider>
  );
};

export default login;
