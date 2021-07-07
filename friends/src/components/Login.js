import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  const [login, setLogin] = useState({ username: "", password: "" });

  const changeHandler = e => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  console.log(login);

  const submitHandler = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/login`, login)
      .then(res => localStorage.setItem("token", res.data.payload));
    props.history.push("/friends");
    setLogin({ username: "", password: "" });
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        name="username"
        value={login.username}
        placeholder="username"
        onChange={changeHandler}
      />
      <input
        type="password"
        name="password"
        value={login.password}
        placeholder="password"
        onChange={changeHandler}
      />
      <button>Login</button>
    </form>
  );
};

export default Login;