import React, { useEffect } from "react";
import "./AddNewReview.css";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import star from "../../assets/Images/loginStar3new.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { companyReview, clearState } from "../../features/review/reviewSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const AddNewReview = () => {
  const navigate = useNavigate();
  const param = useParams();
  const { id } = param;
  let user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const review = useSelector((state) => state.review);
  // console.log("review", review);
  const { review_msg, loading, error } = review;

  useEffect(() => {
    if (review_msg) {
      toast.success(review_msg, { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
        dispatch(clearState());
        navigate(`/companydetail/${id}`);
      }, 1000);
    }
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
  }, [review_msg, error]);

  const initialState = {
    subject: "",
    review: "",
    rating: "",
  };

  const validationSchema = yup.object().shape({
    subject: yup.string().required("Please enter valid subject"),
    review: yup.string().required("Please enter valid review"),
    rating: yup.string().required("Please enter valid rating"),
  });

  function handleSubmit(values) {
    console.log("Values", values);
    let obj = {
      ...values,
      company_id: id,
      user_id: user._id,
    };
    dispatch(companyReview(obj));
  }
  return (
    <>
    <ToastContainer/>
      <div className="add-rev-container">
        <div className="add-review">
          <div className="reviewS-star">
            <h1 className="add-rev-h1">Add Review</h1>
            <img src={star} className="review-star-img"></img>
          </div>
          <br />
          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="add-review-form">
              <Field
                className="add-rev-input1"
                type="text"
                name="subject"
                placeholder="Enter Subject"
              />
              <br />
              <span className="danger-message">
              <ErrorMessage name="subject"></ErrorMessage>
              </span>
              <br />
              <Field
                className="add-rev-input1"
                type="text"
                name="review"
                placeholder="Enter Review"
              />
              <br />
              <span className="danger-message">
              <ErrorMessage name="review"></ErrorMessage>
              </span>

              <br />
              <Field
                type="number"
                name="rating"
                className="add-rev-input1"
                placeholder="Enter Rating"
              />
              <br />
              <span className="danger-message">
              <ErrorMessage name="rating"></ErrorMessage>
              </span>
              <br />
              <button className="review-btn" type="submit">
                Save
              </button>
              <br />
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};
