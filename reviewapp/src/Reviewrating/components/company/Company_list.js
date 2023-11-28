import React, { useEffect } from "react";
import "./Company_list.css";
import { Link } from "react-router-dom";
import { getCompanies } from "../../features/company/companySlice";
import { useDispatch, useSelector } from "react-redux";
import { Navbar_new } from "../../navbar/Navbar_new";
export const Company_list = () => {

  const companies = useSelector((state) => state.company);
  const { cmplist_msg, company_data, error, loading, count } = companies;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanies());
  }, []);

  return (
    <>
      <div className="company-list-container">
        <Navbar_new />
        <div className="Add-company">
          <button className="add-companybutton">
            <Link to="/createCompany">+Add Company</Link>
          </button>
        </div>
        <div className="company-list">
        
          {company_data &&
            company_data.map(
              ({ _id, company_logo, companyName, location, city, founded }) => (
                <div className="company-list1">
                  <Link to={`/companydetail/${_id}`}>
                    <img
                      className="list-image"
                      src={`http://localhost:9000${company_logo}`}
                    ></img>
                  </Link>
                  <div>
                    <p>{companyName}</p>

                    <p>{location}</p>

                    <p> {city}</p>

                    <p>{founded}</p>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </>
  );
};
