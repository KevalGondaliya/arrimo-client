import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { fetcher } from "../utils/fetch";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";
import store from "../store/Index";
import Layout from "@/component/Layout"; 
  import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <Layout>
      <SWRConfig
        value={{
          fetcher 
        }}
      >
        <Provider store={store}>
          <Component {...pageProps} />
          <ToastContainer /> 
        
        </Provider>
      </SWRConfig>
    // </Layout>
  );
}
