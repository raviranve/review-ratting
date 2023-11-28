import React, { useEffect } from "react";
import star from "../../assets/Images/loginStar3new.png";
import "./Login.css";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ResetPassword = () => {
  // const navigate = useNavigate();
  const param = useParams();
  const { token, id } = param;
  const dispatch = useDispatch();

  const resetstate = useSelector((state) => state.user);
  // console.log(resetstate);

  const { error, message } = resetstate;
  // console.log(error, message);

  useEffect(() => {
    if (message) {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
      // navigate("/")
    }
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
  }, [message, error]);

  const initialState = {
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object().shape({
    newPassword: yup.string().required("Please enter your new password"),
    confirmPassword: yup
      .string()
      .required("Please enter your confirm password"),
  });

  const handleSubmit = async (values) => {
    console.log("values", values);
    let obj = {
      ...values,
      id: id,
      token: token,
    };
    dispatch(resetPassword(obj));
  };

  return (
    <>
      <ToastContainer />
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
                type="password"
                name="newPassword"
                className="reset-input"
                placeholder="&#x2709; Enter your new password"
              />
              <br />
              <ErrorMessage name="newPassword"></ErrorMessage>
              <Field
                type="password"
                name="confirmPassword"
                className="reset-input"
                placeholder="&#x2709; Enter confirm password"
              />
              <br />
              <ErrorMessage name="confirmPassword"></ErrorMessage>

              <button className="reset-btn">Reset</button>
            </Form>
          </Formik>
          <br />

          <hr />
        </div>
      </div>
    </>
  );
};
