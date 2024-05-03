import React from "react";
import PasswordSettings from "~/components/Profile/PasswordSettings";
import UserSettings from "~/components/Profile/UserSettings";
import Layout from "~/components/layouts/Layout";

const Profile = () => {
  return (
    <Layout title={"Gena | Profile"} displayTitle={"Profile"}>
      <div className="px-20 pt-20 pb-4">
        <UserSettings />
        <PasswordSettings />
      </div>
    </Layout>
  );
};

export default Profile;
