import DepartmentUsersComponent from "~/components/Department/DepartmentUsers";
import Layout from "~/components/Layout";
import { useState } from "react";

const DepartmentUsers = () => {
  return (
    <Layout title={"Gena | Deparment Users"}>
      <DepartmentUsersComponent />
    </Layout>
  );
};

export default DepartmentUsers;
