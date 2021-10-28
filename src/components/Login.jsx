import React from "react";
import InputField from "../common/InputField";
import { propetyValidator } from "../reusable/propertyValidator";
import Joi from "joi";
import useForm from "../hooks/useForm";
import { formValidator } from "../reusable/formValidator";
import authService from "../Starter Code/services/authService";

function Login(props) {
  const mainSchema = {
    email: Joi.string().min(3).max(30).required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  const { handleChange, handleSubmit, values, errors, setErrors } = useForm(
    null,
    mainSchema,
    propetyValidator,
    formValidator,
    login
  );

  async function login() {
    try {
      console.log("no validation errors");
      await authService.login(values);
      const { state } = props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors({ email: error.response.data });
      }
    }
  }

  return (
    <div className="login-container">
      <form className="login-form">
        <h4 style={{ textAlign: "center" }} className="mb-4">
          Login Form
        </h4>
        <InputField
          name="email"
          label="Email"
          type="text"
          handleChange={handleChange}
          value={values.email || ""}
          error={errors.email}
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          handleChange={handleChange}
          value={values.password || ""}
          error={errors.password}
        />

        <button
          disabled={Object.keys(errors).length}
          style={{ float: "right" }}
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
