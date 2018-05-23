import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../store/actions/auth-actions";

const propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

class Navbar extends Component {
  handleLogOut = event => {
    const { logoutUser, history } = this.props;
    event.preventDefault();
    setTimeout(() => history.push("/"), 0);
    logoutUser();
  };
  authLinks = ({ avatar, name }) => {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="/" onClick={this.handleLogOut}>
            <img
              className="rounded-circle avatar "
              src={avatar}
              alt={name}
              title="You must have a Gravatar connected to your email to display an image"
            />{" "}
            Logout
          </a>
        </li>
      </ul>
    );
  };

  guestLinks = () => {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { authLinks, guestLinks } = this;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks(user) : guestLinks()}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = propTypes;

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

const NavbarWithRouter = withRouter(Navbar);

export default connect(mapStateToProps, { logoutUser })(NavbarWithRouter);
