import React from "react";
import PropTypes from "prop-types";
import createClassName from "./dynamic-class-names";

const classname = createClassName("form-control form-control-lg");

const propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
};

const TextareaFieldGroup = ({
  name,
  value,
  placeholder,
  error,
  info,
  onChangeHandler,
}) => {
  return (
    <div className="form-group">
      <textarea
        className={classname({ "is-invalid": error })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChangeHandler}
      />
      {
        info && <small className='form-text text-muted'>{info}</small>
      }
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

TextareaFieldGroup.propTypes = propTypes;

export default TextareaFieldGroup;
