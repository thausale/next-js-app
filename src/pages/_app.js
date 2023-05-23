import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Dit is de standaard title</title>
        <meta name="description" content="Dit is de standaard beschrijving" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
