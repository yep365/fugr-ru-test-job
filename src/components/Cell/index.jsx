import React from "react";
import classnames from "classnames";

import "./Cell.scss";

const Cell = ({ cellText, selected, width }) => {
  return (
    <div
      className={classnames("cell", {
        "cell--selected": selected,
        "cell--id": width === "id",
        "cell--firstName": width === "firstName",
        "cell--lastName": width === "lastName",
        "cell--email": width === "email",
        "cell--phone": width === "phone",
        "cell--streetAddress": width === "streetAddress",
        "cell--city": width === "city",
        "cell--state": width === "state",
        "cell--zip": width === "zip",
        "cell--description": width === "description",
      })}
    >
      <p>{cellText}</p>
    </div>
  );
};

export default Cell;
