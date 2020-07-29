import React, { useState } from "react";
import { Button, Modal, Input, Checkbox } from "antd";
import { useDispatch } from "react-redux";

import { cellActions } from "../../redux/actions";
import { InsertClientForm } from "../../components";

import "./Header.scss";

const Header = () => {
  const [modalSearch, setSearchModal] = useState(false);
  const [exactSearh, setExactSearch] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const [clientFilter, setClientFilter] = useState("");

  const dispatch = useDispatch();

  const onFetchSmall = () => {
    dispatch(cellActions.fetchClientsSmall());
    onCancelSearch();
    handleCancelSearch();
  };
  const onFetchBig = () => {
    dispatch(cellActions.fetchClientsBig());
    onCancelSearch();
    handleCancelSearch();
  };
  const onClientSearch = (query) => {
    dispatch(cellActions.findClient(query, exactSearh));
  };
  const onCancelSearch = () => {
    dispatch(cellActions.dropSelectedRow());
    dispatch(cellActions.cancelFilter());
  };
  const handleCancelModal = () => {
    setSearchModal(false);

    setExactSearch(false);
  };
  const handleSearhModalOk = () => {
    onCancelSearch();
    onClientSearch(clientFilter);
    setSearchModal(false);
    setSearchStatus(true);
    setClientFilter("");
    setExactSearch(false);
  };
  const handleCancelSearch = () => {
    setSearchStatus(false);
    setClientFilter("");
    setExactSearch(false);
    onCancelSearch();
  };
  const onOpenSearchModal = () => {
    setSearchStatus(false);
    setClientFilter("");
    setExactSearch(false);
    setSearchModal(true);
  };

  return (
    <div className="header">
      <div className="header-create-client">
        <InsertClientForm />
      </div>
      <div className="header-filter">
        {!searchStatus && (
          <Button size="middle" onClick={onOpenSearchModal}>
            Поиск клиентов
          </Button>
        )}
        <Modal
          title="Найти клиента"
          visible={modalSearch}
          onOk={handleSearhModalOk}
          onCancel={handleCancelModal}
        >
          <div className="header-filter__search">
            <Input
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              type="text"
            />
            <div className="header-filter__exact">
              <h2>Точный поиск</h2>
              <Checkbox
                checked={exactSearh}
                onChange={(e) => setExactSearch(e.target.checked)}
                type="checkbox"
              />
            </div>
          </div>
        </Modal>
        {searchStatus && (
          <Button size="small" type="danger " onClick={handleCancelSearch}>
            Отменить поиск
          </Button>
        )}
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
