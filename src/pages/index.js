import { useRouter } from "next/router";
import Layout from "~/components/Layout";


export default function Home() {
  const router = useRouter;
  
  return (
    <>
      <Layout />
    </>
  )
}
