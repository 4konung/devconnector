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
  type: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

const defaultProps = {
  type: 'text',
}

const TextFieldGroup = ({
  name,
  value,
  placeholder,
  error,
  info,
  type,
  onChangeHandler,
  disabled
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classname({ "is-invalid": error })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChangeHandler}
        disabled={disabled}
      />
      {
        info && <small className='form-text text-muted'>{info}</small>
      }
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

TextFieldGroup.propTypes = propTypes;
TextFieldGroup.defaultProps = defaultProps;

export default TextFieldGroup;
