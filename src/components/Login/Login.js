import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") }; // This is the new state.
  }
  if (action.type === "USER_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") }; // This is the new state.
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 }; // This is the new state.
  }
  if (action.type === "USER_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 }; // This is the new state.
  }
  return { value: '', isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState(""); // We omit this because we utilize useReducer below.
  // const [emailIsValid, setEmailIsValid] = useState(); // We omit this because we utilize useReducer below.
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  })

  useEffect(() => {
    console.log("EFFECT RUNNING"); // This is just to show that useEffect runs after every render cycle. It is not necessary to have this here.
  }, []); // This is a dependency array. If you leave it empty, then it will run only once. If you put a variable in it, then it will run when that variable changes. If you put nothing, then it will run after every render cycle.

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log("Checking form validity!");
  //     setFormIsValid(
  //       enteredEmail.includes("@") && enteredPassword.trim().length > 6
  //     );
  //   }, 500); // This is just to show that useEffect runs after every render cycle. It is not necessary to have this here.

  //   return () => {
  //     console.log("CLEANUP");
  //     clearTimeout(identifier); // This is just to show that useEffect runs after every render cycle.
  //   }; // This is a clean up function. It runs before the useEffect runs again. It is not necessary to have this here.
  // }, [enteredEmail, enteredPassword]); // enteredEmail and enteredPassword are dependencies. If either of these change, then the useEffect will run.

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      event.target.value.includes("@") && passwordState.isValid
    );
    // setFormIsValid( // This has been removed from here and put in useEffect above.
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    // setEnteredPassword(event.target.value); // We omit this because we utilize useReducer above.

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );

    // setFormIsValid( // This has been removed from here and put in useEffect above.
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "USER_BLUR" });
    // setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "USER_BLUR" });
    // dispatchEmail({ type: "USER_BLUR" });
    // setPasswordIsValid(enteredPassword.trim().length > 6); // We omit this and replace it with dispatchEmail above.
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
