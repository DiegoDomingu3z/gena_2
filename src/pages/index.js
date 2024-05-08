import Layout from "~/components/layouts/Layout";
import Login from "~/components/login-signup/Login";
import { Provider } from "react-redux";
import { store } from "../../store";

export default function Home() {
  return (
    <Provider store={store}>
      <main className="min-h-screen flex justify-center items-center">
        <Login />
      </main>
    </Provider>
  );
}
