import React from "react";
import classnames from "classnames";

import "./Cell.scss";

const Cell = ({ cellText }) => {
  return (
    <div className="cell">
      <p>{cellText}</p>
    </div>
  );
};

export default Cell;
