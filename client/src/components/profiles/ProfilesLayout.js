import React from "react";

export default ({ children }) => {
  return (
    <div className="profiles">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Developer Profiles</h1>
            <p className="lead text-center">
              Browse and connect with developers
            </p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
