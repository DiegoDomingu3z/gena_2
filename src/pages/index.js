import Layout from "~/components/layouts/Layout";
import Login from "~/components/login-signup/Login";
import { Provider } from "react-redux";
import { store } from "../../store";
import Image from "next/image";

export default function Home() {
  return (
    <Provider store={store}>
      <main className="min-h-screen flex justify-center items-center   bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#91cee7_100%)]">
        <Login />
        <div className="absolute bottom-5 right-10">
          <Image src="/images/Inventive-Group-Single-Black.png" width={120}
        height={120}/>
        </div>
      </main>
    </Provider>
  );
}
