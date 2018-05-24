import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AddCredentialsLayout from "./AddCredentialsLayout";
import TextFieldGroup from "../common/TextFieldGroup";
import TextareaFieldGroup from "../common/TextareaFieldGroup";
import textData from "./text-data";

const propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export class AddEducation extends Component {

  static getDerivedStateFromProps({errors}) {

    return {errors}
  }

  state = {
    errors: {}
  };


  handleCheck = e => {
    this.setState(({disabled, current})=>({
      current: !current
    }))
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { history} = this.props;
    //const experianceData = structeredExperience(this.state)
    //addExpereriance(experianceData, history);
  };

  render() {
    const {
      errors,
      company,
      title,
      location,
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
            placeholder="* Company"
            name="company"
            value={company}
            onChangeHandler={handleChange}
            error={errors.company}
          />
          <TextFieldGroup
            placeholder="* Job Title"
            name="title"
            value={title}
            onChangeHandler={handleChange}
            error={errors.title}
          />
          <TextFieldGroup
            placeholder="Location"
            name="location"
            value={location}
            onChangeHandler={handleChange}
            error={errors.location}
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
              Current Job
            </label>
          </div>
          <TextareaFieldGroup
            placeholder="Job Description"
            name="description"
            value={description}
            onChangeHandler={handleChange}
            error={errors.description}
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

const AddExperienceWithRouter = withRouter(AddEducation);

export default connect(mapStateToProps, null)(AddExperienceWithRouter);
