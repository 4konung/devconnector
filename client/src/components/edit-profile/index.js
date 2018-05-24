import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  createProfile,
  getCurrentProfile
} from "../../store/actions/profile-actions";
import EditProfileLayout from "./EditProfileLayout";
import TextFieldGroup from "../common/TextFieldGroup";
import TextareaFieldGroup from "../common/TextareaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import {structeredProfile, optionslist} from '../helpers';

const propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired
};

export class EditProfile extends Component {
  static getDerivedStateFromProps({ errors, profile:{profile} }) {
    if (Object.keys(errors).length > 0) {
      return { errors };
    }
    if(profile && Object.keys(profile).length > 0) {
      return {...structeredProfile(profile)}
    }
    return null;
  }
  initialState = {
    ...structeredProfile({}),
    displaySocialInputs: false,
    errors: {}
  };
  state = this.initialState;
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    const profileData = structeredProfile(this.state);
    this.props.createProfile(profileData, history);
  };
  toggleSocialInputs = () => {
    this.setState(({ displaySocialInputs }) => ({
      displaySocialInputs: !displaySocialInputs
    }));
  };

  render() {
    const {
      displaySocialInputs,
      handle,
      company,
      website,
      location,
      skills,
      status,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
      errors
    } = this.state;
    const { handleChange, handleSubmit, toggleSocialInputs } = this;
    const {profile:{loading}} = this.props
    return (
      <EditProfileLayout onSubmitHandler={handleSubmit} isLoading={loading}>
        <Fragment>
          <TextFieldGroup
            placeholder="* Profile Handle"
            name="handle"
            value={handle}
            onChangeHandler={handleChange}
            error={errors.handle}
            info="A unique handle for your profile URL. Your full name, company name, nickname"
          />
          <SelectListGroup
            placeholder="Status"
            name="status"
            value={status}
            onChangeHandler={handleChange}
            error={errors.status}
            options={optionslist}
            info="Give us an idea of where you are in your carrera"
          />
          <TextFieldGroup
            placeholder="Company"
            name="company"
            value={company}
            onChangeHandler={handleChange}
            error={errors.company}
            info="Could be your company or one you work for"
          />
          <TextFieldGroup
            placeholder="Website"
            name="website"
            value={website}
            onChangeHandler={handleChange}
            error={errors.website}
            info="Could be your website or company one"
          />
          <TextFieldGroup
            placeholder="Location"
            name="location"
            value={location}
            onChangeHandler={handleChange}
            error={errors.location}
            info="City or Country"
          />
          <TextFieldGroup
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChangeHandler={handleChange}
            error={errors.skills}
            info="Please use coma separeted values (eg. HTML,CSS,JavaScript ...)"
          />
          <TextFieldGroup
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChangeHandler={handleChange}
            error={errors.githubusername}
            info="If you want your latest repos and a GitHub link, include your username"
          />
          <TextareaFieldGroup
            placeholder="Short Bio"
            name="bio"
            value={bio}
            onChangeHandler={handleChange}
            error={errors.bio}
            info="Tell us little about youself"
          />
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-light"
              onClick={toggleSocialInputs}
            >
              Add Social Network Links
            </button>
            <span className="text-muted"> Optional</span>
          </div>
          {!displaySocialInputs ? null : (
            <Fragment>
              <InputGroup
                placeholder="Youtube Profile URL"
                name="youtube"
                value={youtube}
                onChangeHandler={handleChange}
                error={errors.youtube}
              />
              <InputGroup
                placeholder="Twitter Profile URL"
                name="twitter"
                value={twitter}
                onChangeHandler={handleChange}
                error={errors.twitter}
              />
              <InputGroup
                placeholder="Facebook Profile URL"
                name="facebook"
                value={facebook}
                onChangeHandler={handleChange}
                error={errors.facebook}
              />
              <InputGroup
                placeholder="Linkedin Profile URL"
                name="linkedin"
                value={linkedin}
                onChangeHandler={handleChange}
                error={errors.linkedin}
              />
              <InputGroup
                placeholder="Instagram Profile URL"
                name="instagram"
                value={instagram}
                onChangeHandler={handleChange}
                error={errors.instagram}
              />
            </Fragment>
          )}
        </Fragment>
      </EditProfileLayout>
    );
  }
}

EditProfile.propTypes = propTypes;

const mapStateToProps = ({ profile, errors }) => ({
  profile,
  errors
});

const EditProfileWithRouter = withRouter(EditProfile);

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  EditProfileWithRouter
);
