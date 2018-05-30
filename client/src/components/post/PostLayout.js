import React from "react";
import {Link} from 'react-router-dom'

export default ({ children }) => {
  return (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
          <Link to="/posts" className="btn btn-light mb-3">Back to feed</Link>
          {children}</div>
        </div>
      </div>
    </div>
  );
};
