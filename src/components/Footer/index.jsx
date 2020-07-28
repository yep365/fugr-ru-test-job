import React, { useEffect } from "react";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { cellActions } from "../../redux/actions";

import "./Footer.scss";

const Footer = () => {
  const dispatch = useDispatch();
  const {
    selectedRow,
    paginatedRows,
    fitlteredRows,
    currentPage,
    isLoading,
  } = useSelector(({ cell }) => cell);

  let selectedClient = paginatedRows[selectedRow];

  const onShowSizeChange = (current, pageSize) => {
    dispatch(cellActions.setPageSize(pageSize));
    dispatch(cellActions.setPaginatedRows());
  };

  const onPageChange = (page) => {
    dispatch(cellActions.setCurrentPage(page));
    dispatch(cellActions.setPaginatedRows());
  };

  return (
    <div className="footer">
      <div className="footer-pagination">
        <Pagination
          defaultCurrent={1}
          current={currentPage ?? 1}
          onChange={onPageChange}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          total={fitlteredRows.length ?? 1}
          defaultPageSize={50}
          pageSizeOptions={[10, 20, 50]}
        />
      </div>
      {!isLoading && selectedClient && (
        <div className="footer-output">
          <div className="footer-output__item">
            Выбран пользователь
            <b>
              {selectedClient
                ? ` ${selectedClient?.firstName} ${selectedClient?.lastName}`
                : " Пусто"}
            </b>
          </div>
          <div className="footer-output__item">
            Описание:
            <textarea value={selectedClient?.description ?? " Пусто"} />
          </div>
          <div className="footer-output__item">
            Адрес проживания:
            <b> {selectedClient?.address.streetAddress ?? " Пусто"}</b>
          </div>
          <div className="footer-output__item">
            Город: <b> {selectedClient?.address.city ?? " Пусто"}</b>
          </div>
          <div className="footer-output__item">
            Провинция/штат: <b> {selectedClient?.address.state ?? " Пусто"}</b>
          </div>
          <div className="footer-output__item">
            Индекс: <b> {selectedClient?.address.zip ?? " Пусто"}</b>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
