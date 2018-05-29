import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  skills: PropTypes.array.isRequired
};

const ProfileSkillsList = ({ skills }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center">
      {skills.map((skill, idx) => (
        <div className="p-3" key={idx}>
          <i className="fa fa-check" /> {skill}
        </div>
      ))}
    </div>
  );
};

ProfileSkillsList.propTypes = propTypes;

export default ProfileSkillsList;
