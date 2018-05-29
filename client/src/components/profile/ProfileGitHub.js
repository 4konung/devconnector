import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

const propTypes = {
  username: PropTypes.string.isRequired,
}

class ProfileGitHub extends Component {
  state = {
    clientId: "65ff28bcdefe9578a88e",
    clientSecret: "73aa16b472c6fc518d7130e42a99bc49eaedb095",
    count: 5,
    sort: "created: asc",
    repos: []
  };
  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    const link = `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`;
    fetch(link)
      .then(res => res.json())
      .then(data => this.setState({ repos: data }))
      .catch(error => console.log(error));
  }
  render() {
    const { repos } = this.state;
    return (
      <div>
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repos.map(
          ({
            id,
            html_url,
            name,
            description,
            stargazers_count,
            watchers_count,
            forks_count
          }) => (
            <div key={id} className="card card-body mb-2">
              <div className="row">
                <div className="col-md-6">
                  <h4>
                    <Link to={html_url} className="text-info" target="_blank">
                      {" "}
                      {name}
                    </Link>
                  </h4>
                  <p>{description}</p>
                </div>
                <div className="col-md-6">
                  <span className="badge badge-info mr-1">
                    Stars: {stargazers_count}
                  </span>
                  <span className="badge badge-secondary mr-1">
                    Watchers: {watchers_count}
                  </span>
                  <span className="badge badge-success">
                    Forks: {forks_count}
                  </span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}

ProfileGitHub.propTypes = propTypes;

export default ProfileGitHub;
