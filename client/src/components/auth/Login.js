import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/auth-actions";
import TextFieldGroup from '../common/TextFieldGroup';


const propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

class Login extends Component {
  static getDerivedStateFromProps({ errors, history, auth }) {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
      return null;
    }
    return Object.keys(errors).length > 0 ? { errors } : null;
  }

  initialState = {
    email: "",
    password: "",
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
    const { email, password } = this.state;
    const { loginUser } = this.props;
    loginUser({ email, password });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { email, password, errors } = this.state;
    
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form action="dashboard.html" onSubmit={handleSubmit}>
              <TextFieldGroup
                name="email"
                value={email}
                placeholder="Email Adress"
                error={errors.email}
                type="email"
                onChangeHandler={handleChange}
              />
              <TextFieldGroup
                name="password"
                value={password}
                placeholder="Password"
                error={errors.password}
                type="password"
                onChangeHandler={handleChange}
              />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = propTypes;

const mapStateToProps = ({ auth, errors }) => {
  return {
    auth,
    errors
  };
};

export default connect(mapStateToProps, { loginUser })(Login);
