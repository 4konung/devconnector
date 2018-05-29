import React, { Fragment } from "react";
import PropTypes from "prop-types";
import ProfileItem from "./ProfileItem";

const propTypes = {
  profiles: PropTypes.array
};

const ProfilesList = ({ profiles }) => {
  return (
    <Fragment>
      {profiles === null ? (
        <h4>No profiles found...</h4>
      ) : (
        profiles.map(profile => <ProfileItem key={profile._id} {...profile} />)
      )}
    </Fragment>
  );
};

ProfilesList.propTypes = propTypes;

export default ProfilesList;
