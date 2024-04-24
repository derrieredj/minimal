import { ConnectWallet, metamaskWallet, smartWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import Link from "next/link";


export const Header = () => {
  return (
    <nav className={styles.header}>
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="LOGO"
          width={270}
          height={100}
          className={styles.logo}
          priority
        />
      </Link>
      <ConnectWallet 
        showThirdwebBranding={false}
        displayBalanceToken={{
          [80002]: process.env.NEXT_PUBLIC_AMOY_USDC_ADDRESS,
          }}
        theme="dark" />

    </nav>
  );
};
