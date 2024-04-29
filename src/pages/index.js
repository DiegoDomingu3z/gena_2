import Layout from "~/components/layouts/Layout";
import Login from "~/components/login-signup/Login";
import { Provider } from "react-redux";
import { store } from "../../store";

export default function Home() {
  return (
    <Provider store={store}>
      <Layout title={"Gena | Login"}>
        <Login />
      </Layout>
    </Provider>
  );
}
