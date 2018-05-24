import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

const propTypes = {
  children: PropTypes.element,
  textData: PropTypes.object,
  onSubmitHandler: PropTypes.func.isRequired,
}

const AddCredentialsLayout = ({children, textData, onSubmitHandler}) => {
  return (
    <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">{textData.title}</h1>
              <p className="lead text-center">
                {textData.text}
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={onSubmitHandler}>
                {
                  children
                }
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}

AddCredentialsLayout.propTypes = propTypes;

export default AddCredentialsLayout;
