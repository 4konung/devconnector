import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CreateProfileLayout from './CreateProfileLayout'
import TextFieldGroup from "../common/TextFieldGroup";
import TextareaFieldGroup from "../common/TextareaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectFieldGroup from "../common/SelectFieldGroup";

const propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export class CreateProfile extends Component {
  initialState = {
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {}
  };

  state = this.initialState;
  render() {
    return (
      <CreateProfileLayout>
        <Fragment>
          <h1>Profile!!!</h1>
        </Fragment>
      </CreateProfileLayout>
    );
  }
}

CreateProfile.propTypes = propTypes;

const mapStateToProps = ({ profile, errors }) => ({
  profile,
  errors
});

export default connect(mapStateToProps, null)(CreateProfile);
