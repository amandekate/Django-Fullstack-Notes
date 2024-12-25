import React from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  return (
    <Form
      route="/api/user/register/"
      method="register"
      secondaryButtonText="Login"
      onSecondaryButtonClick={() => navigate("/login")}
    />
  );
}

export default Register;
