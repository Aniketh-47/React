import { Fragment } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.util";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <Fragment>
      <h1>hi this is sign component.</h1>
      <button onClick={logGoogleUser}>Sign in with Google.</button>
    </Fragment>
  );
};

export default SignIn;
