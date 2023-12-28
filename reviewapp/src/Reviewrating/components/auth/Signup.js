import React, { useEffect, useState } from "react";
import star from "../../assets/Images/loginStar3new.png";
import "./Signup.css";
import { Link } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../../features/auth/authSlice";
import { SignUpUser } from "../../features/auth/authSlice";
export const Signup = () => {
  const [pic, setPic] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  let { error, message, loading } = data;

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
    if (message) {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
        dispatch(clearState());
      }, 500);
    }
  }, [error, message]);

  const initialState = {
    name: "",
    email: "",
    password: "",
    mobile: "",
    city: "",
    state: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Please enter your name"),
    email: yup.string().required().email("Please enter your email"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(8, "password must have at least 8 characters"),
    mobile: yup.string().required("Please enter your phone number"),
    city: yup.string().required("Please enter your city"),
    state: yup.string().required("Please enter your state"),
  });

  function handleSubmit(values) {
    let obj = {
      profilepic: pic,
      ...values,
    };
    console.log("this is image", obj);
    dispatch(SignUpUser(obj));
  }

  function picselect(e) {
    setPic(e.target.files[0]);
  }
  return (
    <>
      <ToastContainer />
      <div className="signup-container">
        <div className="left-signup-wel">
          <h1>Welcome</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <br />
          <br />
          <div className="left-signup-logo"></div>
        </div>
        <div className="right-signup">
          <div className="signup-star">
            <h2 className="signup-h2">Sign up</h2>
            <img src={star} className="signup-img"></img>
          </div>

          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="signup-form">
              <Field
                className="signup-input"
                type="text"
                name="name"
                placeholder="&#x2709; Full Name"
              />
              <br />
              <span className="danger-message">
                <ErrorMessage name="name"></ErrorMessage>
              </span>
              <br />
              <Field
                className="signup-input"
                type="text"
                name="email"
                placeholder="&#128272; Email ID"
                required
              />
              <br />
              <span className="danger-message">
                <ErrorMessage name="email"></ErrorMessage>
              </span>
              <br />
              <Field
                className="signup-input"
                type="password"
                name="password"
                placeholder="&#128272; Password"
                required
              />
              <br />
              <span className="danger-message">
                <ErrorMessage name="password"></ErrorMessage>
              </span>
              <br />
              <Field
                className="signup-input"
                type="Number"
                name="mobile"
                placeholder="&#x2706; Phone Number"
                required
              />
              <br />
              <span className="danger-message">
                <ErrorMessage name="mobile"></ErrorMessage>
              </span>
              <br />
              <Field
                className="signup-input"
                type="text"
                name="city"
                placeholder="&#10148; City"
                required
              />
              <br />
              <span className="danger-message">
                <ErrorMessage name="city"></ErrorMessage>
              </span>
              <br />
              <Field
                className="signup-input"
                type="text"
                name="state"
                placeholder=" &#8982; State"
                required
              />
              <br />
              <span className="danger-message">
                <ErrorMessage name="state"></ErrorMessage>
              </span>
              <br />

              <input type="file" onChange={picselect}></input>
              <br />
              <button className="signup-btn" type="submit">
                Sign Up
              </button>
            </Form>
          </Formik>
          <hr />
          <p className="signup-p1">
            I already have an account <Link to="/"> Login </Link>
          </p>
        </div>
      </div>
    </>
  );
};
