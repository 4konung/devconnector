import React from "react";
import Moment from "react-moment";

export default ({ _id, company, title, from, to, current, handleOnDelete }) => {
  return (
    <tr>
      <td>{company}</td>
      <td>{title}</td>
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
