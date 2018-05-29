import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ExperienceCredentials from './ExperienceCredentials';
import EducationCredentials from './EducationCredentials'

const propTypes = {
  name: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired
};

const style ={marginBottom: '60px'};

const UserHaveProfile = ({ name, handle, handlerDelete }) => {
  return (
    <div>
      <p className="lead text-muted">
        Welcome <Link to={`/profile/${handle}`}>{name}</Link>
      </p>
      <div className="btn-group mb-4" role="group">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
        </Link>
        <Link to="/add-experience" className="btn btn-light">
          <i className="fab fa-black-tie text-info mr-1" />
          Add Experience
        </Link>
        <Link to="/add-education" className="btn btn-light">
          <i className="fas fa-graduation-cap text-info mr-1" />
          Add Education
        </Link>
      </div>
      <div style={style} />

      <ExperienceCredentials />
      <EducationCredentials />
      <button
       className="btn btn-danger"
       onClick={handlerDelete}
      >Delete my Account</button>
    </div>
  );
};

UserHaveProfile.propTypes = propTypes;

export default UserHaveProfile;
