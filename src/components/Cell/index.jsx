import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import "./Cell.scss";

const Cell = ({ cellText, selected, width, clickHandler }) => {
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
      onClick={clickHandler}
    >
      <p>{cellText}</p>
    </div>
  );
};
Cell.propTypes = {
  cellText: PropTypes.string,
  width: PropTypes.string,
  selected: PropTypes.bool,
};

export default Cell;
