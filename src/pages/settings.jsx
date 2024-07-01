import React from "react";
import Login from "~/components/login-signup/Login";
import Layout from "~/components/layouts/Layout";
import Main from "~/components/Settings/main";

const Jira = () => {
  return (
      <Layout displayTitle={'Gena Settings'} title={"Gena | Settings"}>
        <Main />
      </Layout>
  );
};

export default Jira;
