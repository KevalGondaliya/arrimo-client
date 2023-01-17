import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { fetcher as myFetcher } from "../utils/fetch";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";
import store from "./store/Index";
import Layout from "@/component/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <SWRConfig
        value={{
          fetcher: myFetcher,
        }}
      >
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SWRConfig>
    </Layout>
  );
}
