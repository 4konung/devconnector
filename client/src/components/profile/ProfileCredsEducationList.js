import React from "react";
import PropTypes from 'prop-types'
import Moment from "react-moment";
import isEmpty from "../../validation/is-empty";

const Item = ({ school, degree, fieldofstudy, from, to, description }) => {
  return (
    <li className="list-group-item">
      <h4>{school}</h4>
      <p>
        <Moment format="MMM YYYY">{from}</Moment> -{" "}
        {to === null ? "Now" : <Moment format="MMM YYYY">{to}</Moment>}
      </p>
      <p>
        <strong>Degree:</strong> {degree}
      </p>
      <p>
        <strong>Field of Study: </strong> {fieldofstudy}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
    </li>
  );
};

const ProfileCredsEducationList = ({ education}) => {
  return (
    <div className="col-md-6">
      <h3 className="text-center text-info">Education</h3>
      {isEmpty(education) ? (
        <h4 className="text-center">No education listed</h4>
      ) : (
        <ul className="list-group">
          {education.map((edu, idx) => <Item key={idx} {...edu} />)}
        </ul>
      )}
    </div>
  );
};

ProfileCredsEducationList.propTypes = {
  education: PropTypes.array.isRequired
};

export default ProfileCredsEducationList;
