import React, { useState, useContext } from "react";
import { RiErrorWarningLine } from "react-icons/ri";

import useFormInput from "../../hooks/form-input";
import AuthContext from "../../store/auth-context";
import styles from "./Form.module.css";

const SigningForm = (props) => {
  const authCtx = useContext(AuthContext);

  const [isLogging, setIsLogging] = useState(true);
  const [isUser, setIsUser] = useState(true);
  const [showFPPage, setShowFPPage] = useState(false);

  const {
    enteredValue: enteredName,
    isValid: isNameValid,
    isTouched: isNameTouched,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
  } = useFormInput(
    (value) =>
      Boolean(value.match(/^[A-Za-z][A-Za-z0-9]*$/)) && value.trim() !== ""
  );

  const {
    enteredValue: enteredEmail,
    isValid: isEmailValid,
    isTouched: isEmailTouched,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useFormInput((email) =>
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  );

  const {
    enteredValue: enteredAddress,
    isValid: isAddressValid,
    isTouched: isAddressTouched,
    changeHandler: addressChangeHandler,
    blurHandler: addressBlurHandler,
  } = useFormInput(
    (value) =>
      Boolean(!value.match(/[!@#$ %^&*()+\=\[\]{};':"\\|.<>\/?] +/)) &&
      value.trim() !== ""
  );

  const {
    enteredValue: enteredPassword,
    isValid: isPasswordValid,
    isTouched: isPasswordTouched,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useFormInput((value) => value.trim() !== "");

  const resetValues = () => {
    nameChangeHandler("");
    addressChangeHandler("");
    emailChangeHandler("");
    passwordChangeHandler("");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let signingMethod = "login";
    let signingEntity = "user";
    let nameValidity = true;
    let addressValidity = true;
    const body = {
      email: enteredEmail,
      password: enteredPassword,
    };

    if (!isLogging) {
      body.name = enteredName;
      signingMethod = "signup";
      nameValidity = isNameValid;
      if (!isUser) {
        body.address = enteredAddress;
        signingEntity = "theatre";
        addressValidity = isAddressValid;
      }
    } else {
      if (!isUser) signingEntity = "theatre";
    }
    if (isEmailValid && isPasswordValid && nameValidity && addressValidity) {
      if (showFPPage) signingMethod = "changepassword";
      const url =
        "http://localhost:8080/" +
        `${signingMethod}` +
        "-" +
        `${signingEntity}`;

      fetch(url, {
        method: isLogging ? "PUT" : "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status >= 200 && res.status <= 299) {
            resetValues();
            "showModal" in props && props.showModal(false);
            showFPPage && setShowFPPage(false);
            if (signingMethod === "changepassword")
              alert("Password Changed Successfully. Please Sign In.");
            return res.json();
          } else {
            return res.json().then((result) => {
              if ("errors" in result) {
                const { errors } = result;
                throw new Error(errors[0].msg);
              }
            });
          }
        })
        .then((result) => {
          authCtx.loginHandler(result.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <div className={styles["form-container"]}>
      {!showFPPage ? (
        <div className={styles["form-control"]}>
          <div
            className={`${styles["link-button"]} ${
              !isLogging && styles.active
            }`}
            onClick={() => setIsLogging(false)}
          >
            SignUp
          </div>
          <div
            className={`${styles["link-button"]} ${isLogging && styles.active}`}
            onClick={() => setIsLogging(true)}
          >
            SignIn
          </div>
        </div>
      ) : (
        <div
          className={`${styles["form-control"]} ${styles["link-button"]} ${styles.active}`}
        >
          Forgot Password
        </div>
      )}
      <form onSubmit={submitHandler}>
        {!isLogging && (
          <div className={styles["input-container"]}>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={enteredName}
              onChange={(event) => nameChangeHandler(event.target.value)}
              onBlur={(event) => nameBlurHandler(event.target.value)}
              className={styles.input}
            />
            {!isNameValid && isNameTouched && (
              <p className={styles.error}>
                <RiErrorWarningLine />
                Only alphanumeric characters are allowed
              </p>
            )}
          </div>
        )}
        <div className={styles["input-container"]}>
          <input
            type="email"
            name="email"
            placeholder="Email Id"
            value={enteredEmail}
            onChange={(event) => emailChangeHandler(event.target.value)}
            onBlur={(event) => emailBlurHandler(event.target.value)}
            className={styles.input}
          />
          {!isEmailValid && isEmailTouched && (
            <p className={styles.error}>
              <RiErrorWarningLine />
              Enter a valid email address
            </p>
          )}
        </div>

        {!isLogging && !isUser && (
          <div className={styles["input-container"]}>
            <input
              type="string"
              name="address"
              autoComplete="off"
              placeholder="Street Address"
              value={enteredAddress}
              onChange={(event) => addressChangeHandler(event.target.value)}
              onBlur={(event) => addressBlurHandler(event.target.value)}
              className={styles.input}
            />
            {!isAddressValid && isAddressTouched && (
              <p className={styles.error}>
                <RiErrorWarningLine />
                Enter a valid address
              </p>
            )}
          </div>
        )}

        <div className={styles["input-container"]}>
          <input
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
            value={enteredPassword}
            onChange={(event) => passwordChangeHandler(event.target.value)}
            onBlur={(event) => passwordBlurHandler(event.target.value)}
            className={styles.input}
          />
          {!isPasswordValid && isPasswordTouched && (
            <p className={styles.error}>
              <RiErrorWarningLine />
              Password must be atleast 6 characters long
            </p>
          )}
        </div>
        <button type="submit" className={`${styles.button}`}>
          {!showFPPage
            ? isLogging
              ? "Sign In"
              : "Sign Up"
            : "Change Password"}
        </button>
      </form>
      {!showFPPage && (
        <div className={styles.lc} onClick={() => setIsUser((prev) => !prev)}>
          SignUp/SignIn as a {isUser ? "theatre" : "user"}?
        </div>
      )}
      {!showFPPage && isLogging && (
        <div className={styles.lc} onClick={() => setShowFPPage(true)}>
          Forgot Password?
        </div>
      )}
    </div>
  );
};

export default SigningForm;
