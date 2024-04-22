import React from "react";
import HomeDashboard from "~/components/HomeDashboard";
import Layout from "~/components/Layout";

const home = () => {
  return (
      <Layout title={"Gena | Home"}>
        <HomeDashboard />
      </Layout>
    
  );
};

export default home;
