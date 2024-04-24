import React from "react";
import { useAppDispatch } from "../../Hooks/hooks";
import { login } from "../../Redux/Auth/AuthSlice";

export const useLoginScreenLogic = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useAppDispatch();

  const handleLogin = () => {
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
  };
};
