import React from "react";
import PropTypes from "prop-types";
import createClassName from "./dynamic-class-names";

const classname = createClassName("form-control form-control-lg");

const propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

const defaultProps = {
  options: []
}

const SelectListGroup = ({
  name,
  value,
  error,
  info,
  onChangeHandler,
  options
}) => {
  const selectOptions = options.map(({ lable, value }) => {
    return (
      <option key={lable} value={value}>
        {lable}
      </option>
    );
  });
  return (
    <div className="form-group">
      <select
        className={classname({ "is-invalid": error })}
        name={name}
        value={value}
        onChange={onChangeHandler}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

SelectListGroup.propTypes = propTypes;
SelectListGroup.defaultProps = defaultProps;

export default SelectListGroup;
