import React from "react";

export default ({ children }) => {
  return (
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">{children}</div>
        </div>
      </div>
    </div>
  );
};
