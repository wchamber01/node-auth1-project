import React, { useState } from "react";
import { axiosWithAuth } from "./utils/axiosWithAuth.js";
import { Button, FormGroup, Label, Input } from "reactstrap";

function Login() {
  const [userCreds, setUserCreds] = useState({ username: "", password: "" });
  console.log(userCreds, "userCreds");

  let onChange = e => {
    setUserCreds({ ...userCreds, [e.target.name]: e.target.value });
  };

  function handleSubmit() {
    axiosWithAuth()
      .post("/login", userCreds)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        console.log(res.data, "****Login Form response****");
        console.log(localStorage.userId, "****LocalStorage****");
      })
      .catch(err => console.log(err));
  }
  return (
    <>
      <div className="Login">
        <form
          onSubmit={(event, props) => {
            event.preventDefault();
            handleSubmit(props);
          }}
        >
          <FormGroup>
            <Label>Username</Label>
            <Input
              autoFocus
              name="username"
              type="text"
              value={userCreds.username}
              placeholder="Username"
              onChange={onChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              value={userCreds.password}
              placeholder="*******"
              onChange={onChange}
              required
            />
          </FormGroup>
          <Button
            color="primary"
            block
            size="lg"
            // disabled={!validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
