import { PrinterOutlined } from "@ant-design/icons";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin } from "antd";
import Image from "next/image";
import Main from "~/components/Dashboard/Main";
import Layout from "~/components/layouts/Layout";

const DashBoard = () => {
    return (
        <Layout displayTitle={"Gena Dashboard"} title={"Gena | Dashboard"}>
            <Spin tip={<div>
                <h1>Gathering Data...</h1>
                <h2>This may take a couple of weeks</h2>
            </div>} size="large" spinning={true}>
            <Main />
            </Spin>
        </Layout>
    )
}

export default DashBoard