import DepartmentUsersComponent from "~/components/Department/DepartmentUsers";
import Layout from "~/components/layouts/Layout";
import { useState } from "react";

const DepartmentUsers = () => {
  return (
    <Layout title={"Gena | Department Users"}>
      <DepartmentUsersComponent />
    </Layout>
  );
};

export default DepartmentUsers;
