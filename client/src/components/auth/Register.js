import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/auth-actions";
import PropTypes from "prop-types";
import createClassName from "./dynamic-class-names";
const classname = createClassName("form-control form-control-lg");

class Register extends Component {
  static getDerivedStateFromProps({ errors }) {
    return (Object.keys(errors).length > 0) ? {errors} : null ;
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
    const style = {
      name: classname({ "is-invalid": errors.name }),
      email: classname({ "is-invalid": errors.email }),
      password: classname({ "is-invalid": errors.password }),
      password2: classname({ "is-invalid": errors.password2 })
    };
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
                <div className="form-group">
                  <input
                    type="text"
                    className={style.name}
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">{errors.name}</div>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={style.email}
                    placeholder="Email Address"
                    value={email}
                    onChange={handleChange}
                    name="email"
                  />
                  <div className="invalid-feedback">{errors.email}</div>
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={style.password}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={style.password2}
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.password2}</div>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth, errors }) => {
  return {
    auth,
    errors
  };
};


const RegisterWithRouter = withRouter(Register);
export default connect(mapStateToProps, {registerUser})(RegisterWithRouter);
