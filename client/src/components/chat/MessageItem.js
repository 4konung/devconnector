import React from "react";
import PropTypes from "prop-types";

const MessageItem = ({message}) => {
  return (
    <div className="card p-1 mb-1">
      <p className="card-text">
        <span className="badge badge-info mr-2">User-1</span>Hello!!!
      </p>
    </div>
  );
};

//MessageItem.propTypes = {};

export default MessageItem;
