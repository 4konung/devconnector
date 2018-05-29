import React from "react";
import Moment from "react-moment";

export default ({ _id, school, degree, from, to, handleOnDelete }) => {
  return (
    <tr>
      <td>{school}</td>
      <td>{degree}</td>
      <td>
        <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
        {to === null ? "Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
      </td>
      <td>
        <button className="btn btn-danger" onClick={handleOnDelete.bind(null, _id)}>Delete</button>
      </td>
    </tr>
  );
};
