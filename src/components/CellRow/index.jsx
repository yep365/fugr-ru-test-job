import React from "react";

import { Cell } from "../../components";

import "./CellRow.scss";

const CellRow = ({ obj }) => {
  let iterableObj = Object.entries(obj);
  return (
    <div className="cell-row">
      {iterableObj.map((entry) =>
        typeof entry[1] === "object" ? (
          Object.entries(entry[1]).map((nestedObjEntry) => (
            <Cell
              key={nestedObjEntry[0]}
              cellText={nestedObjEntry[1] ?? "Пусто"}
              width={nestedObjEntry[0] ?? "firstName"}
            />
          ))
        ) : (
          <Cell
            key={entry[0]}
            cellText={entry[1] ?? "Пусто"}
            width={entry[0] ?? "firstName"}
          />
        )
      )}
    </div>
  );
};

export default CellRow;
