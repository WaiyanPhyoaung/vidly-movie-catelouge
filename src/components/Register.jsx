import React from "react";
import InputField from "../common/InputField";
import { propetyValidator } from "../reusable/propertyValidator";
import Joi from "joi";
import useForm from "../hooks/useForm";
import { formValidator } from "../reusable/formValidator";
import * as userService from "../Starter Code/services/userService";
import { toast } from "react-toastify";
import authService from "../Starter Code/services/authService";

function Register() {
  const mainSchema = {
    username: Joi.string().min(3).max(30).required().label("Username"),
    password: Joi.string().required().label("Password"),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .label("Email"),
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
      const response = await userService.reigster(values);
      authService.loginWhenRegister(response.headers["x-auth-token"]);
      window.location = "/movies";
      toast.success("User has been created successful.");
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
          Register
        </h4>
        <InputField
          name="email"
          label="Email"
          type="email"
          handleChange={handleChange}
          value={values.email || ""}
          error={errors.email}
        />
        <InputField
          name="username"
          label="Username"
          type="text"
          handleChange={handleChange}
          value={values.username || ""}
          error={errors.username}
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
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
