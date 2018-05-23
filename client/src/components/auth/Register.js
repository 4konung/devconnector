import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/auth-actions";
import TextFieldGroup from "../common/TextFieldGroup";

const propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

class Register extends Component {
  static getDerivedStateFromProps({ errors, history, auth }) {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
      return null;
    }
    return Object.keys(errors).length > 0 ? { errors } : null;
  }
  initialState = {
    name: "",
    email: "",
    password: "",
    password2: "",
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
    const { history } = this.props;
    const { name, email, password, password2 } = this.state;
    const newUser = { name, email, password, password2 };
    this.props.registerUser(newUser, history);
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, email, password, password2, errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form
                action="create-profile.html"
                onSubmit={handleSubmit}
                noValidate
              >
                <TextFieldGroup
                  name="name"
                  value={name}
                  placeholder="Name"
                  error={errors.name}
                  onChangeHandler={handleChange}
                />
                <TextFieldGroup
                  name="email"
                  value={email}
                  placeholder="Email Adress"
                  error={errors.email}
                  type="email"
                  onChangeHandler={handleChange}
                  info="This site uses Gravatar so if you want a profile image, use
                a Gravatar email"
                />
                <TextFieldGroup
                  name="password"
                  value={password}
                  placeholder="Password"
                  error={errors.password}
                  type="password"
                  onChangeHandler={handleChange}
                />
                <TextFieldGroup
                  name="password2"
                  value={password2}
                  placeholder="Confirm Password"
                  error={errors.password2}
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

Register.propTypes = propTypes;

const mapStateToProps = ({ auth, errors }) => {
  return {
    auth,
    errors
  };
};

const RegisterWithRouter = withRouter(Register);
export default connect(mapStateToProps, { registerUser })(RegisterWithRouter);
