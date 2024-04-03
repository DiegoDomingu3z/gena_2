import React from "react";
import Login from "~/components/Login";
import { LoginProvider } from "~/Contexts/LoginContext";
import Layout from "~/components/Layout";
import Main from "~/components/Jira/main";

const Jira = () => {
  return (
    <LoginProvider>
      <Layout title={"Gena | Jira"}>
        <Main />
      </Layout>
    </LoginProvider>
  );
};

export default Jira;
