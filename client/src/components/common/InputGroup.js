import React from "react";
import PropTypes from "prop-types";
import createClassName from "./dynamic-class-names";

const classname = createClassName("form-control form-control-lg");

const propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired
};

const defaultProps = {
  type: "text"
};

const InputGroup = ({
  name,
  value,
  placeholder,
  error,
  type,
  onChangeHandler
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={`fab fa-${name || "awesome"} fa-fw`} />
        </span>
      </div>
      <input
        type={type}
        className={classname({ "is-invalid": error })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChangeHandler}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

InputGroup.propTypes = propTypes;
InputGroup.defaultProps = defaultProps;

export default InputGroup;
