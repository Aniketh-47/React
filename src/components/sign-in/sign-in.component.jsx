import { useState, useContext } from "react";

import FormInput from "../form-input/form-input..component";
import Button from "../button/button.component";

import {
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.util";

import "./sign-in.style.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [FormFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = FormFields;

  const SignInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Wrong Password.");
          break;
        case "auth/user-not-found":
          alert("Email not found.");
          break;
        default:
          console.log("The error was" + error.code);
          break;
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...FormFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an Account ?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button buttonType="inverted" type="submit">
            Sign In
          </Button>
          <Button type="button" buttonType="google" onClick={SignInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
