import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount
} from "../../store/actions/profile-actions";
import UserNoProfile from "./UserNoProfile";
import UserHaveProfile from "./UserHaveProfile";
import Spinner from "../common/Spinner";
import DashboardLayout from "./DashboardLayout";

const propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

class Dashboard extends Component {
  componentDidMount() {
    const { getCurrentProfile } = this.props;
    getCurrentProfile();
  }
  displayProfile = (profile, user) => {
    if (profile !== null && Object.keys(profile).length > 0) {
      return (
        <UserHaveProfile
          handle={profile.handle}
          name={user.name}
          handlerDelete={this.props.deleteAccount}
        />
      );
    }
    return profile && <UserNoProfile name={user.name} />;
  };
  render() {
    const {
      auth: { user },
      profile: { profile, loading }
    } = this.props;
    return (
      <DashboardLayout>
        <Fragment>
          {loading ? <Spinner /> : this.displayProfile(profile, user)}
        </Fragment>
      </DashboardLayout>
    );
  }
}

Dashboard.propTypes = propTypes;

const mapStateToProps = ({ auth, profile }) => {
  return {
    auth,
    profile
  };
};

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
