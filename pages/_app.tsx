import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../store/Index";
import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
}
