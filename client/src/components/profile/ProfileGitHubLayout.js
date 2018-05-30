import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const ProfileGitHubLayout = ({ repos }) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default ProfileGitHubLayout;
