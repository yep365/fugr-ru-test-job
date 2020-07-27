import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";

import { cellActions } from "../../redux/actions";

import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();

  const onFetchSmall = () => {
    dispatch(cellActions.fetchClientsSmall());
  };
  const onFetchBig = () => {
    dispatch(cellActions.fetchClientsBig());
  };
  return (
    <div className="header">
      <div className="header-create-client">
        <Button size="middle">Внести клиента в базу</Button>
      </div>
      <div className="header-filter">
        <Button size="middle">Поиск клиентов</Button>
      </div>
      <div className="header-fetch">
        <div className="header-fetch__button">
          <Button size="large" onClick={onFetchBig}>
            Загрузить большой файл
          </Button>
        </div>
        <div className="header-fetch__button">
          <Button size="small" onClick={onFetchSmall}>
            Загрузить маленький файл
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
