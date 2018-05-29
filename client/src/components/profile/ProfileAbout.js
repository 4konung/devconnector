import React from "react";
import PropTypes from 'prop-types';
import ProfileSkillsList from "./ProfileSkillsList";

const propTypes = {
  user: PropTypes.object.isRequired,
  skills: PropTypes.array.isRequired,
  bio: PropTypes.string,
}

const ProfileAbout = ({ user: { name }, skills, bio }) => {
  const [firstName] = name.trim().split(" ");
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">{`${firstName}'s Bio`}</h3>
          <p className="lead">{
            bio ? bio: <span>{firstName} does not have a bio</span>
            }</p>
          <hr />
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <ProfileSkillsList skills={skills} />
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = propTypes;

export default ProfileAbout;
