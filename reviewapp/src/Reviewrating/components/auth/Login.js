import React, { useEffect } from "react";
import "./Login.css";
import star from "../../assets/Images/loginStar3new.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { SignInUser, clearState } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  let { error, message, loading } = data;

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
        dispatch(clearState());
        navigate("/");
      }, 1000);
    }
    if (message) {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
        dispatch(clearState());
        navigate("/company_list");
      }, 1000);
    }
  }, [error, message]);

  const initialState = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required().email("Please enter your email"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(8, "password must have at least 8 characters"),
  });

  const handleSubmit = async (values) => {
    console.log("values", values);
    const result = await dispatch(SignInUser(values));
    // if (result.payload.message == "Login success") {
    //   navigate('/company_list');
    // }
  };
  return (
    <>
      <ToastContainer />
      <div className="login-container">
        <div className="left-login-wel">
          <h1>Welcome</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <br />
          <br />
          <div className="left-login-logo"></div>
        </div>
        <div className="right-login">
          <div className="login-star">
            <h2 className="login-h2">Login</h2>
            <img src={star} className="login-img"></img>
          </div>
          <p className="login-p">Hello! please enter your details for login</p>

          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="login-form">
              <Field
                className="login-input"
                type="text"
                name="email"
                placeholder="&#x2709; Email"
              />
              <br />
              <span className="danger-message">
                <ErrorMessage name="email"></ErrorMessage>
              </span>
              <br />
              <Field
                className="login-input"
                type="password"
                name="password"
                placeholder="&#128274; Password"
              />
              <br />
              <span className="danger-message">
                <ErrorMessage name="password"></ErrorMessage>
              </span>
              <br />

              <p className="login-p1">
                <Link to="forgetpassword">Forget Password? </Link>
              </p>
              <button className="login-btn" type="submit">
                Login
              </button>
            </Form>
          </Formik>
          <hr />
          <p className="login-p2">I don't have an account on Review & Rate</p>
          <Link className="login-register" to="signup">
            Register Now
          </Link>
        </div>
      </div>
    </>
  );
};
