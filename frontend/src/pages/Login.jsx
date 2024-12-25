import React from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <Form
      route="/api/token/"
      method="login"
      secondaryButtonText="Register"
      onSecondaryButtonClick={() => navigate("/register")}
    />
  );
}

export default Login;
