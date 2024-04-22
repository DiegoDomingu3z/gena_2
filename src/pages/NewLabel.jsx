import React, { useEffect } from "react";
import Login from "~/components/Login";
import Layout from "~/components/Layout";
import NewLabel from "~/components/PrintShopView/NewLabel";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const NewLabelPage = () => {
  const account = useSelector((state) => state.Account.account);
  const router = useRouter();
  useEffect(() => {
    if (account.privileges != "admin") {
      router.push("/start-new-order");
    }
  }, []);
  return (
      <Layout title={"Gena | New Label"}>
        <NewLabel />
      </Layout>
  );
};

export default NewLabelPage;
