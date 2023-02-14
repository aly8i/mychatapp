import "../styles/auth.css";
import "../styles/chats.css";
import "../styles/index.css";
import Head from "next/head";
import { ContextProvider } from "../context";

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Head>
        <title>ChAt wItH AlI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </ContextProvider>
  );
}
