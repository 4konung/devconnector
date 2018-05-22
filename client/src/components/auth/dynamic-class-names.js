import classNames from "classnames";

export default st => {
  return dyn => classNames(st, dyn);
};
