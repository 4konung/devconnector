import React from "react";
import PropTypes from 'prop-types'
import Moment from "react-moment";
import isEmpty from "../../validation/is-empty";

const Item = ({ company, location, title, from, to, description }) => {
  return (
    <li className="list-group-item">
      <h4>{company}</h4>
      <p>
        <Moment format="MMM YYYY">{from}</Moment> -{" "}
        {to === null ? "Now" : <Moment format="MMM YYYY">{to}</Moment>}
      </p>
      <p>
        <strong>Position:</strong> {title}
      </p>
      {isEmpty(location) ? null : (
        <p>
          <strong>Location: </strong> {location}
        </p>
      )}
      {isEmpty(description) ? null : (
        <p>
          <strong>Description:</strong> {description}
        </p>
      )}
    </li>
  );
};

const ProfileCredsExperienceList = ({ experience }) => {
  return (
    <div className="col-md-6">
      <h3 className="text-center text-info">Experience</h3>
      {isEmpty(experience) ? (
        <h4 className="text-center">No experience listed</h4>
      ) : (
        <ul className="list-group">
          {experience.map((exp, idx) => <Item key={idx} {...exp} />)}
        </ul>
      )}
    </div>
  );
};

ProfileCredsExperienceList.propTypes = {
  experience: PropTypes.array.isRequired
};

export default ProfileCredsExperienceList;
