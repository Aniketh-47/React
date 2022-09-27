import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDflGYIwNZYxsb9wgdK-ZBiHjUDdlM_OiY",
  authDomain: "shop-db-4749.firebaseapp.com",
  projectId: "shop-db-4749",
  storageBucket: "shop-db-4749.appspot.com",
  messagingSenderId: "431553983783",
  appId: "1:431553983783:web:0bc54d07628ce8269e6502",
};

// Initialize Firebase
const firebaseAapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists()); // does reference or data exsists.

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("Error creating a user", error.message);
    }

    return userDocRef;
  }
};
