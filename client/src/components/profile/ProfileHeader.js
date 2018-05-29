import React from "react";
import PropTypes from 'prop-types';
import isEmpty from "../../validation/is-empty";
import ProfileSocialLinks from "./ProfileSocialLinks";

const propTypes = {
  user: PropTypes.object.isRequired,
  location: PropTypes.string,
  status: PropTypes.string,
  company: PropTypes.string,
  social: PropTypes.object,
  website: PropTypes.string,
}

const ProfileHeader = ({ user, location, status, company, social, website }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img
                className="rounded-circle"
                src={user.avatar}
                alt="user avatar"
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{user.name}</h1>
            <p className="lead text-center">
              {status} {isEmpty(company) ? null : <span> at {company}</span>}
            </p>
            <p>{!isEmpty(location) && location}</p>
            <p>
              {website === undefined ? null : (
                <a className="text-white p-2" href={website} target='_blank'>
                  <i className="fas fa-globe fa-2x" />
                </a>
              )}
              {social === undefined ? null : (
                <ProfileSocialLinks social={social} />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = propTypes;

export default ProfileHeader;
