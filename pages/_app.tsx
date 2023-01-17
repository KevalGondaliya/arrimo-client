import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";
import store from "./store/Index";

export default function App({ Component, pageProps }: AppProps) {
  const fetcher = makeSelfFetch(url);
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SWRConfig>
  );
}
