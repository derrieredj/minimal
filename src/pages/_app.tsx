import { ThirdwebProvider,  metamaskWallet, smartWallet } from "@thirdweb-dev/react";
import Head from "next/head";
import "../styles/globals.css";
import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";

// This is the chain your dApp will work on.

function MyApp({ Component, pageProps }) {

  return (
    <ThirdwebProvider
      supportedChains={[PolygonAmoyTestnet]}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      authConfig={{
        domain: process.env.NEXT_PUBLIC_DOMAIN_NAME,
        authUrl: "/api/auth",
      }}
      supportedWallets={
        [ 
          smartWallet(metamaskWallet(),{
            gasless: true,
            factoryAddress: process.env.NEXT_PUBLIC_FACTORY_ADDRESS,
          })
        ]
      }
    >
      <Head>
        <title>Minimal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="dsd."
        />
      </Head>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
