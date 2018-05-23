import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../store/actions/profile-actions";
import UserNoProfile from "./UserNoProfile";
import Spinner from "../common/Spinner";
import DashboardLayout from "./DashboardLayout";

class Dashboard extends Component {
  componentDidMount() {
    const { getCurrentProfile } = this.props;
    getCurrentProfile();
  }
  displayProfile = (profile, user) => {
    if(profile !== null && Object.keys(profile).length > 0) {
      return <h1>Profile</h1>
    }
    return (
      profile && <UserNoProfile name={user.name}/>
    )
  }
  render() {
    const {
      auth: { user },
      profile: { profile, loading }
    } = this.props;
    return (
      <DashboardLayout>
        <Fragment>
          {
            loading  ?  <Spinner/> : this.displayProfile(profile, user)
          }
        </Fragment>
      </DashboardLayout>
    );
  }
}

const mapStateToProps = ({ auth, profile }) => {
  return {
    auth,
    profile
  };
};

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
