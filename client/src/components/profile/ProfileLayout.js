import React from "react";
import { Link } from "react-router-dom";

export default ({ children }) => {
  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Link to="/profiles" className="btn btn-light mb-3 float-left">
              Back to profiles
            </Link>
          </div>
          <div className="col-md-6" />
        </div>
        {children}
      </div>
    </div>
  );
};
