import { useUser, useWallet } from "@thirdweb-dev/react";
import { Header } from "../components/Header";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import initializeFirebaseClient from "@/util/firebase";
import useFirebaseUser from "@/util/useFirebaseUser";
import { signOut } from "firebase/auth";
import fireSign from "@/util/fireSign";

export default function Home() {
  const { user, isLoggedIn, isLoading } = useUser();
  const { auth } = initializeFirebaseClient();
  const { user: fireUser, isLoading: loadingAuth } = useFirebaseUser();
  const wallet = useWallet();

  useEffect(() => {
    console.log('user', user);
    if (user?.address && !fireUser && !loadingAuth) {
      fireSign(wallet);
    } else {
      console.log('no user');
    }
  }, [ wallet, user, fireUser, loadingAuth]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
        signOut(auth);
    } 
}, [ isLoading, isLoggedIn, auth]);



  return (
    <div className={styles.container}>
      <Header />
      {(isLoading) && <div className={styles.card}>
        <h3>Loading...</h3>
      </div>}
      {!user && <div>
        <div className={styles.card}>
          <p>Connect your Wallet to access. </p>
        </div>
      </div>}
      <p>{user && user.address}</p>
      
    </div>
  );
}
