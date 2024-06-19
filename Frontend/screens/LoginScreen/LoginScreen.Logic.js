import React from "react";
import { useAppDispatch } from "../../Hooks/hooks";
import { login } from "../../Redux/Auth/AuthSlice";
import { useSelector } from "react-redux";

export const useLoginScreenLogic = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState({});

  const authState = useSelector((state) => state.authReducer);
  const myError = authState.error;

  const dispatch = useAppDispatch();

  const handleError = (key, message) => {
    setError((prevState) => ({ ...prevState, [key]: message }));
  };

  const handleLogin = () => {
    if (myError) {
      handleError("email", myError);
      return;
    }
    if (email === "" || password === "") {
      return;
    }

    dispatch(
      login({
        email,
        password,
      })
    );
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    error,
  };
};
