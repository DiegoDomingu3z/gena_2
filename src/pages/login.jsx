import React from "react";
import Login from "~/components/login-signup/Login";
import Layout from "~/components/layouts/Layout";

const login = () => {
  return (
      <Layout title={"Gena | Login"}>
        <Login />
      </Layout>
  );
};

export default login;
