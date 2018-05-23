import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CreateProfileLayout from "./CreateProfileLayout";
import TextFieldGroup from "../common/TextFieldGroup";
import TextareaFieldGroup from "../common/TextareaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import optionlist from "./option-list";

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
    skills: "",
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
  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    //const { history } = this.props;
    //const { name, email, password, password2 } = this.state;
    //const newUser = { name, email, password, password2 };
    //this.props.registerUser(newUser, history);
    console.log("Submitted");
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
    const { handleChange, handleSubmit } = this;

    return (
      <CreateProfileLayout onSubmitHandler={handleSubmit}>
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
            options={optionlist}
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
            placeholder="Skills"
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
