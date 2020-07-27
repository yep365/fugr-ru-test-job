import React from "react";
import { Pagination } from "antd";
import { useDispatch } from "react-redux";

import { cellActions } from "../../redux/actions";

import "./Footer.scss";

const Footer = () => {
  const dispatch = useDispatch();

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
          onChange={onPageChange}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          total={1000}
          defaultPageSize={50}
          pageSizeOptions={[10, 20, 50]}
        />
      </div>
    </div>
  );
};

export default Footer;
