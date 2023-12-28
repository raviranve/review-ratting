import React from "react";
import star from "../assets/Images/loginStar3new.png";
import { Link, useNavigate } from "react-router-dom";

export const Navbar_new = () => {
  const navigate = useNavigate();
  const res = localStorage.getItem("user");
  const user = JSON.parse(res);
  console.log("user data", user);

  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <>
      <div className="company-list-container">
        <div className="company-navbar">
          <div className="company-nav-left">
            <h1>Review&RATE</h1>
            <img className="navstar-image" src={star}></img>
          </div>
          
          <div className="company-navright">
          {user?.name ? (
            <h4 className="welcome5">Welcome : {user?.name}</h4>
          ) : (
            navigate("/")
          )}
            <img
              className="navmen-image"
              src={`http://localhost:9000${user?.profilepic}`}
            ></img>
            <button className="company-logout-btn">
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
