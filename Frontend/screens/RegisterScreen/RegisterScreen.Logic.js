import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Redux/Auth/AuthSlice";

export const useRegisterScreenLogic = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [error, setError] = React.useState({});

  // const myError = authState.error;

  React.useEffect(() => {
    handleError("state", authState.error);
  }, [authState.error]);

  const handleError = (key, message) => {
    setError((prevState) => ({ ...prevState, [key]: message }));
  };

  const handleRegister = () => {
    if (!email) {
      handleError("email", "Please fill the email input!");
      return;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      handleError("email", "Please input a valid email!");
      return;
    } else {
      handleError("email", "");
    }

    if (!password) {
      handleError("password", "Please input a password!");
      return;
    } else if (password.length < 7) {
      handleError("password", "The password is to short");
      return;
    } else handleError("password", "");

    dispatch(
      register({
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
    handleRegister,
    error,
  };
};
