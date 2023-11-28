import React, { useEffect } from "react";
import star from "../../assets/Images/loginStar3new.png";
import "./Login.css";
import * as yup from "yup";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgetDData = useSelector((state) => state.user)
  const {error,forget_message} = forgetDData;

  useEffect(() => {
    if(forget_message) {
      toast.success(forget_message, { position: toast.POSITION.TOP_CENTER });
      navigate("/")
    }
    if(error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
  },[forget_message, error]);

  const initialState = {
    email: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required().email("Please enter your email"),
  });

  const handleSubmit = async (values) => {
    console.log("values", values);
    dispatch(forgetPassword(values))
  };

  return (
    <>
      <div className="resetPass-container">
        <div className="reset-password">
          <div className="reset-star">
            <h2 className="reset-h2">Reset Password</h2>
            <img src={star} className="reset-img"></img>
          </div>

          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field
                type="text"
                name="email"
                className="reset-input"
                placeholder="&#x2709; Enter Email"
              />

              <span className="danger-message">
                <ErrorMessage name="email"></ErrorMessage>
              </span>
              <br />
              <button className="reset-btn" type="submit">
                Reset
              </button>
            </Form>
          </Formik>
          <br />
          <br />

          <hr />
        </div>
      </div>
    </>
  );
};
