import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import withRedux from "next-redux-wrapper";
import { wrapper } from "../store";

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Component {...props.pageProps} />
  );
}

export default wrapper.withRedux(App);
