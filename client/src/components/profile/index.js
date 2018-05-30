import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfileLayout from "./ProfileLayout";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCredsExperienceList from "./ProfileCredsExperienceList";
import ProfileCredsEducationList from "./ProfileCredsEducationList";
import ProfileGitHub from "./ProfileGitHub";
import Spinner from "../common/Spinner";
import { getProfileByHandle } from "../../store/actions/profile-actions";

const propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

class Profile extends Component {
  componentDidMount() {
    const { handle } = this.props.match.params;
    if (handle) this.props.getProfileByHandle(handle);
  }
  render() {
    const { profile, loading } = this.props.profile;
    return (
      <ProfileLayout>
        {profile === null || loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <ProfileHeader {...profile} />
            <ProfileAbout {...profile} />
            <div className="row">
              <ProfileCredsExperienceList experience={profile.experience} />
              <ProfileCredsEducationList education={profile.education} />
            </div>
            {profile.githubusername ? (
              <ProfileGitHub username={profile.githubusername} />
            ) : null}
          </Fragment>
        )}
      </ProfileLayout>
    );
  }
}

Profile.propTypes = propTypes;

const mapStateToProps = ({ profile }) => {
  return {
    profile
  };
};

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
