import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cellActions } from "../redux/actions";
import { Header as BaseHeader } from "../components";

const Header = () => {
  const { newUser } = useSelector(({ cell }) => cell);
  const [modalSearch, setSearchModal] = useState(false);
  const [exactSearh, setExactSearch] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const [clientFilter, setClientFilter] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof newUser === "object" && Object.keys(newUser).length !== 0) {
      dropSearchResults();
    }
  }, [newUser]);

  const onFetchSmall = () => {
    dispatch(cellActions.fetchClientsSmall());
    onCancelSearch();
    dropSearchResults();
  };
  const onFetchBig = () => {
    dispatch(cellActions.fetchClientsBig());
    onCancelSearch();
    dropSearchResults();
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
  const dropSearchResults = () => {
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
    <BaseHeader
      onFetchSmall={onFetchSmall}
      onFetchBig={onFetchBig}
      dropSearchResults={dropSearchResults}
      setExactSearch={setExactSearch}
      exactSearh={exactSearh}
      setClientFilter={setClientFilter}
      clientFilter={clientFilter}
      handleCancelModal={handleCancelModal}
      handleSearhModalOk={handleSearhModalOk}
      modalSearch={modalSearch}
      onOpenSearchModal={onOpenSearchModal}
      searchStatus={searchStatus}
    />
  );
};

export default Header;
