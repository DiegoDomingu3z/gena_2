import Export from "~/components/DataExporter/export";
import Layout from "~/components/layouts/Layout";

const Exporter = () => {
    return (
        <Layout displayTitle={'Export Data'} title={"GENA | Export Data"} >
            <Export />
        </Layout>
    )
}


export default Exporter;