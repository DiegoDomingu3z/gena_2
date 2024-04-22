import { Provider } from "react-redux";
import "~/styles/globals.css";
import { store } from "../../store";
import { CanvasProvider } from "~/Contexts/canvasDrawerContext";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
