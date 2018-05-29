import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AddCredentialsLayout from "./AddCredentialsLayout";
import TextFieldGroup from "../common/TextFieldGroup";
import TextareaFieldGroup from "../common/TextareaFieldGroup";
import { addEducation } from "../../store/actions/profile-actions";
import { structeredEducation } from "../helpers";
import textData from "./text-data";

const propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

export class AddEducation extends Component {
  static getDerivedStateFromProps({ errors }) {
    return { errors };
  }

  state = {
    ...structeredEducation({}),
    errors: {}
  };

  handleCheck = e => {
    this.setState(({ disabled, current }) => ({
      current: !current
    }));
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { history, addEducation } = this.props;
    const educationData = structeredEducation(this.state);
    addEducation(educationData, history);
  };

  render() {
    const {
      errors,
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = this.state;
    const { handleChange, handleCheck, handleSubmit } = this;
    return (
      <AddCredentialsLayout
        textData={textData.education}
        onSubmitHandler={handleSubmit}
      >
        <Fragment>
          <TextFieldGroup
            placeholder="* School"
            name="school"
            value={school}
            onChangeHandler={handleChange}
            error={errors.school}
          />
          <TextFieldGroup
            placeholder="* Degree or certification"
            name="degree"
            value={degree}
            onChangeHandler={handleChange}
            error={errors.degree}
          />
          <TextFieldGroup
            placeholder="* Field of study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChangeHandler={handleChange}
            error={errors.fieldofstudy}
          />
          <h6>From Date</h6>
          <TextFieldGroup
            name="from"
            type="date"
            value={from}
            onChangeHandler={handleChange}
            error={errors.from}
          />
          <h6>To Date</h6>
          <TextFieldGroup
            name="to"
            type="date"
            value={to}
            onChangeHandler={handleChange}
            error={errors.to}
            disabled={current}
          />
          <div className="form-check mb-4">
            <input
              type="checkbox"
              className="form-check-input"
              name="current"
              value={current}
              checked={current}
              onChange={handleCheck}
              id="current"
            />
            <label htmlFor="current" className="form-check-label">
              Current education
            </label>
          </div>
          <TextareaFieldGroup
            placeholder="Program description"
            name="description"
            value={description}
            onChangeHandler={handleChange}
            error={errors.description}
            info="Tell us about program that you were in"
          />
        </Fragment>
      </AddCredentialsLayout>
    );
  }
}

AddEducation.propTypes = propTypes;

const mapStateToProps = ({ profile, errors }) => ({
  profile,
  errors
});

const AddEducationWithRouter = withRouter(AddEducation);

export default connect(mapStateToProps, { addEducation })(
  AddEducationWithRouter
);
