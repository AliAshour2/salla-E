import React, { useContext } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TokenContext } from "../../Context/TokenContext";
function Login() {
  /* -------------------------------------------------------------------------- */
  /*                              Start Validation                              */
  /* -------------------------------------------------------------------------- */
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let {setToken} = useContext(TokenContext);
  let navigate = useNavigate();
  async function callSignIn(reqBody) {
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", reqBody)
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      });
    if (data.message === "success") {
      localStorage.setItem("userToken" ,  data.token);
      setToken(data.token)
      navigate("/home");
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Email not valid").required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 6 characters long"
      )
      .required("Password required"),
  });

  const signInForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: callSignIn,
  });

  /* -------------------------------------------------------------------------- */
  /*                                 End SingIn                                 */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">Sign in</h2>
        {/* {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null} */}
        <form onSubmit={signInForm.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="email" className="form-label mb-1 greenBorder">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={signInForm.values.email}
              onChange={signInForm.handleChange}
              onBlur={signInForm.handleBlur}
              className={`${styles.formControl} form-control mb-2`}
              placeholder="Email"
            />
            {signInForm.errors.email && signInForm.touched.email ? (
              <div className="alert alert-danger">
                {signInForm.errors.email}
              </div>
            ) : null}
          </div>

          <div className="form-group mb-2">
            <label htmlFor="password" className="form-label mb-1 greenBorder">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={signInForm.values.password}
              onChange={signInForm.handleChange}
              onBlur={signInForm.handleBlur}
              placeholder="Password"
              className={`${styles.formControl} form-control mb-2`}
            />
            {signInForm.errors.password && signInForm.touched.password ? (
              <div className="alert alert-danger">
                {signInForm.errors.password}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="btn bg-main text-white d-block ms-auto  "
            disabled={!signInForm.isValid || isLoading}
          >
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "SignIn"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;








