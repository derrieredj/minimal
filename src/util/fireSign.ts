import { signInWithCustomToken } from "firebase/auth";
import initializeFirebaseClient from "./firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { ThirdwebAuth } from "@thirdweb-dev/auth";

export default async function fireSign(wallet) {
    
    const twAuth = new ThirdwebAuth(
        wallet,
        process.env.NEXT_PUBLIC_AUTH_DOMAIN|| "",
        {
            secretKey: process.env.TW_SECRET_KEY || "",
            clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
        },
    );

    const payload = await twAuth?.login();
    
    if (!payload) {
      console.log('no payload');
      return;
    }

    console.log('payload', payload);
    const verifiedPayload = await twAuth.verify(payload);




    if (!verifiedPayload) {
      console.log('no verifiedPayload');
      return;
    }

    try {
      // Make a request to the API with the payload.
      const res = await fetch("/api/fire/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload }),
      });
   
      // Get the returned JWT token to use it to sign in with
      const { token, address, smartAddress, payload: payy } = await res.json();
      console.log('token', token, address, smartAddress, payy);
      const {db, auth} = initializeFirebaseClient();
      // Sign in with the token.
      const userCredential = await signInWithCustomToken(auth, token);
      // On success, we have access to the user object.
      const user = userCredential.user;
   
      // If this is a new user, we create a new document in the database.
      const usersRef = doc(db, "users", user.uid!);
      const userDoc = await getDoc(usersRef);
   
      if (!userDoc.exists()) {
        // User now has permission to update their own document outlined in the Firestore rules.
        setDoc(
          usersRef,
          { createdAt: serverTimestamp() },
          { merge: true },
        );
      }
    } catch (error) {
      console.error(error);
    }
  }