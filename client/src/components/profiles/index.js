import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ProfilesLayout from './ProfilesLayout';
import ProfilesList from './ProfilesList'
import {getProfiles} from '../../store/actions/profile-actions';

const propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object,
}

class Profiles extends Component {
  componentDidMount () {
    this.props.getProfiles()
  }
  render() {
    const {profiles, loading} = this.props.profile
    return (
      <ProfilesLayout>
        {
          loading ? <Spinner /> : <ProfilesList profiles={profiles} />
        }
        </ProfilesLayout>
    );
  }
}

Profiles.propTypes = propTypes;

const mapStateToProps = ({profile}) => {
  return{
    profile
  }
}

export default connect(mapStateToProps, {getProfiles})(Profiles);
