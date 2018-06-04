import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const propTypes = {
  message: PropTypes.object.isRequired,
};

const MessageItem = ({ message: { text, name, date } }) => {
  return (
    <div className="card p-1 mb-1 bg-light">
      <div className="card-body">
        <h5 className="card-title">
          <span className="badge badge-info mr-2">{name}</span>
          <span>
            <Moment className="text-secondary h6" format="DD/MM HH:mm:ss">{date}</Moment>
          </span>
        </h5>
        <p className="card-text text-dark">{text}</p>
      </div>
    </div>
  );
};

MessageItem.propTypes = propTypes;

export default MessageItem;
