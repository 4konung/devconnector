import React, { Component } from "react";
import PropTypes from "prop-types";
import ProfileGitHubLayout from "./ProfileGitHubLayout";

const propTypes = {
  username: PropTypes.string.isRequired
};

class ProfileGitHub extends Component {
  state = {
    clientId: "65ff28bcdefe9578a88e",
    clientSecret: "73aa16b472c6fc518d7130e42a99bc49eaedb095",
    count: 5,
    sort: "created: asc",
    repos: [],
    error: ""
  };
  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    const link = `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`;
    fetch(link)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        const error =
          res.status === 404
            ? "User not found, please check your github username."
            : "Something went wrong...";
        throw error;
      })
      .then(data => this.setState({ repos: data, error: "" }))
      .catch(error => this.setState({ error }));
  }
  render() {
    const { repos, error } = this.state;
    return (
      <div>
        <hr />{" "}
        <h3 className="mb-4">Latest Github Repos</h3>
        {error ? (
          <h4 className="lead text-center">{error}</h4>
        ) : (
          <ProfileGitHubLayout repos={repos} />
        )}
      </div>
    );
  }
}

ProfileGitHub.propTypes = propTypes;

export default ProfileGitHub;
