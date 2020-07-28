import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

import { cellActions } from "../../redux/actions";
import { CellRow } from "../../components";

import "./CellField.scss";

const CellField = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cellActions.fetchClients());
  }, []);

  const { paginatedRows, isLoading, errLoading } = useSelector(
    ({ cell }) => cell
  );

  return (
    <div className="cell-field">
      {!isLoading &&
        paginatedRows?.map((obj, index) => (
          <CellRow key={obj.email} obj={obj} rowIndex={index} />
        ))}
      {isLoading && (
        <div className="cell-field cell-field--loading">
          <Spin size="large" tip="Загрузка..." />
        </div>
      )}
      {errLoading && (
        <div className="cell-field cell-field--err">
          <h1>Извините, сервер не работает!</h1>
        </div>
      )}
    </div>
  );
};

export default CellField;
