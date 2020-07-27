import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { cellActions } from "../../redux/actions";
import { Cell } from "../../components";

import "./CellRow.scss";

const CellRow = ({ obj, rowIndex }) => {
  const dispatch = useDispatch();
  const { selectedRow } = useSelector(({ cell }) => cell);

  const onRowClick = useCallback((index) => {
    dispatch(cellActions.selectRow(index));
  }, []);

  let iterableObj = Object.entries(obj);
  return (
    <div className="cell-row" onClick={() => onRowClick(rowIndex)}>
      {iterableObj?.map((entry) =>
        typeof entry[1] === "object" ? (
          Object.entries(entry[1]).map((nestedObjEntry) => (
            <Cell
              key={nestedObjEntry[0]}
              cellText={nestedObjEntry[1] ?? "Пусто"}
              width={nestedObjEntry[0] ?? "firstName"}
              selected={selectedRow === rowIndex}
            />
          ))
        ) : (
          <Cell
            key={entry[0]}
            cellText={entry[1] ?? "Пусто"}
            width={entry[0] ?? "firstName"}
            selected={selectedRow === rowIndex}
          />
        )
      )}
    </div>
  );
};

export default CellRow;
