import React from "react";
import styles from "./Register.module.css";

import { useFormik } from "formik";
import * as Yup from "yup";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

/* -------------------------------------------------------------------------- */
/*                           Send Registration Data                           */
/* -------------------------------------------------------------------------- */
function Register() {
  let navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function callResigter(reqBody) {
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", reqBody)
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      });
    console.log(data);
    if (data.message === "success") {
      navigate("/login");
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                              Start validation                              */
  /* -------------------------------------------------------------------------- */
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name is to short")
      .max(30, "Name is to long")
      .required("Name is required"),
    email: Yup.string().email("Email not valid").required("Email is required"),
    password: Yup.string()

      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 6 characters long"
      )
      .required("Password required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password and Repassword should match")
      .required("Password required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}/, "Invalid Phone Number")
      .required("Phone required"),
  });
  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,

    onSubmit: callResigter,
  });
  /* -------------------------------------------------------------------------- */
  /*                               End Validation                               */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                  Return UI                                 */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      <div className=" w-50 mx-auto my-5">
        <h2 className="mb-3">Register</h2>
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}
        <form onSubmit={registerForm.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="name" className="form-label mb-1 greenBorder">
              Enter Your Name
            </label>
            <input
              type="text"
              value={registerForm.values.name}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              id="name"
              className={`${styles.formControl} form-control mb-2  `}
              placeholder="Name"
            />
            {registerForm.errors.name && registerForm.touched.name ? (
              <div className="alert alert-danger">
                {registerForm.errors.name}
              </div>
            ) : null}
          </div>

          <div className="form-group mb-2">
            <label htmlFor="email" className="form-label mb-1 greenBorder">
              Email address
            </label>
            <input
              type="email"
              value={registerForm.values.email}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              id="email"
              className={`${styles.formControl} form-control mb-2 `}
              placeholder="Enter Your email"
            />
            {registerForm.errors.email && registerForm.touched.email ? (
              <div className="alert alert-danger">
                {registerForm.errors.email}
              </div>
            ) : null}
          </div>

          <div className="form-group mb-2">
            <label htmlFor="password" className="form-label mb-1 greenBorder">
              Password
            </label>
            <input
              type="password"
              value={registerForm.values.password}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              id="password"
              className={`${styles.formControl} form-control mb-2 `}
              placeholder="Enter Your Password"
            />
            {registerForm.errors.password && registerForm.touched.password ? (
              <div className="alert alert-danger">
                {registerForm.errors.password}
              </div>
            ) : null}
          </div>

          <div className="form-group mb-2">
            <label htmlFor="rePassword" className="form-label mb-1 greenBorder">
              Re-enter Password
            </label>
            <input
              type="password"
              value={registerForm.values.rePassword}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              id="rePassword"
              className={`${styles.formControl} form-control mb-2 `}
              placeholder="Enter Password"
            />
            {registerForm.errors.rePassword &&
            registerForm.touched.rePassword ? (
              <div className="alert alert-danger">
                {registerForm.errors.rePassword}
              </div>
            ) : null}
          </div>

          <div className="form-group mb-2">
            <label htmlFor="phone" className="form-label mb-1 greenBorder">
              Phone
            </label>
            <input
              type="tel"
              value={registerForm.values.phone}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              id="phone"
              className={`${styles.formControl} form-control mb-2 `}
              placeholder="Your Phone Number"
            />
            {registerForm.errors.phone && registerForm.touched.phone ? (
              <div className="alert alert-danger">
                {registerForm.errors.phone}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="btn bg-main text-white d-block ms-auto  "
            disabled={!registerForm.isValid  || isLoading}
          >
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
