import React, { useEffect } from "react";
import "./CompanyDetails.css";
import men from "../../assets/Images/Profile Picture_1.png";
import { Link, useParams } from "react-router-dom";
import { Navbar_new } from "../../navbar/Navbar_new";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyDetails } from "../../features/company/companySlice";
export const CompanyDetails = () => {
  const dispatch = useDispatch();

  const param = useParams();
  const { id } = param;
  // param se Extract kari thi id param is get the url

  const companyData = useSelector((state) => state.company);

  const { company_details, compDetail_msg } = companyData;
  const { companyDetails, comments } = company_details;
  // console.log(CompanyDetails);
  const { companyName, company_logo, city, founded, location } = {
    ...companyDetails,
  };

  useEffect(() => {
    dispatch(getCompanyDetails(id));
  }, []);

  return (
    <>
      <div className="company-detail-container">
        <Navbar_new />
        <div className="companyDetail-list">
          <div className="companyDetail-list1">
            <img
              className="list-imageR"
              src={`http://localhost:9000${company_logo}`}
            ></img>

            <div className="companydetail-content">
              <p className="companyD-p">Founded : {founded}</p>

              <h2 className="companyD-h3">{companyName}</h2>

              <p className="companyD-p">{location}</p>
              <p>{city}</p>
            </div>
            <button className="addreview-btn">
              <Link to={`/addcompanyreview/${id}`}>Add Review</Link>
            </button>
          </div>
          <br />
          <hr className="RRR-h" />
          {comments &&
            comments.map((value) => (
              <div className="companyDetail-list2">
                <div className="review-companydetail1">
                  <img
                    className="review-imageR"
                    src={`http://localhost:9000${value.user_id.profilepic}`}
                  ></img>
                </div>
                <div className="review-companydetail2">
                  <h2> {value.user_id.name}</h2>
                  <p>{value.createdAt.slice(0, 10)} </p>
                  <p className="companyD-p">{value.review}</p>
                  <p className="RRR-star">{value.rating}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
