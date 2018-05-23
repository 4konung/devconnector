import React, {Fragment} from 'react'
import spinner from './spinner/spinner.gif';

export default () => {
  return (
    <Fragment>
      <img
        src={spinner}
        className="dashboard_spinner"
        alt="Loading..."
      />
    </Fragment>
  )
};
