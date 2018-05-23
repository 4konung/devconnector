import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const propTypes = {
  auth: PropTypes.object.isRequired
};

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return <Route
    {...rest}
    render = {props =>
      auth.isAuthenticated === true ?
      (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />;
};

PrivateRoute.propTypes = propTypes;

const mapStateToPRops = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToPRops, null)(PrivateRoute);
