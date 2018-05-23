import React from "react";
import { Link } from "react-router-dom";

export default ({ name }) => {
  return (
    <div>
      <p className="lead text-muted">Welcome {name}</p>
      <p>You have not setup a profile, please add some info</p>
      <Link to="/create-profile" className="btn btn-large btn-info">
        Create profile
      </Link>
    </div>
  );
};
