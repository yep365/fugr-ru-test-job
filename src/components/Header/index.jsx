import React from "react";
import { Button, Modal, Input, Checkbox } from "antd";

import { InsertClientForm } from "../../containers";

import "./Header.scss";

const Header = ({
  searchStatus,
  onOpenSearchModal,
  modalSearch,
  handleSearhModalOk,
  handleCancelModal,
  clientFilter,
  setClientFilter,
  exactSearh,
  setExactSearch,
  dropSearchResults,
  onFetchBig,
  onFetchSmall,
}) => {
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
          <Button size="small" type="danger " onClick={dropSearchResults}>
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
