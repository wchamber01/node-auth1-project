import React, { useState } from "react";
import { axiosWithAuth } from "./utils/axiosWithAuth.js";
import { Button, FormGroup, Label, Input, FormText } from "reactstrap";

const Register = () => {
  const [userCreds, setUserCreds] = useState({
    username: "",
    password: ""
  });
  console.log(userCreds, "userCreds");

  let onChange = e => {
    setUserCreds({ ...userCreds, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    axiosWithAuth()
      .post("/register", userCreds)
      .then(response => {
        localStorage.setItem("token", response.data.token);
        console.log(response.data, "response.data");
        // props.login(response.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="Register">
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
            placeholder="SpongeBob"
            onChange={onChange}
            required
          />
          <FormText>You'll use this to Login everytime.</FormText>
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
          {/* <FormText>Must be atleast 7 characters long.</FormText> */}
        </FormGroup>
        <Button
          color="primary"
          block
          size="lg"
          type="submit"
          // disabled={!validateForm()}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
