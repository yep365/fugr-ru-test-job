import { clientInfoApi } from "../../utils/api";
import { pagination, filterClientData, sortBy } from "../../utils/helpers";

const Actions = {
  setLoading: (status) => ({
    type: "CELL:SET_LOADING",
    payload: status,
  }),
  setNewUserUpload: (object) => (dispatch, getState) => {
    const { cell } = getState();
    const { rows } = cell;
    let dbType;

    Array(rows).length < 999 ? (dbType = "big") : (dbType = "small");

    dispatch({ type: "CELL:SET_NEW_USER", payload: object });
    clientInfoApi
      .uploadNewClient(object, dbType)
      .then(({ status }) => {
        if (status >= 200 && status < 300) {
          dispatch(Actions.setMainRows(Array(object).concat(rows)));
        }
      })
      .catch(() => {
        dispatch(Actions.setUpLoadingErr(true));
      });
  },
  setLoadingErr: () => ({
    type: "CELL:LOADING_ERR",
    payload: true,
  }),
  setUpLoadingErr: (status) => ({
    type: "CELL:UPLOADING_ERR",
    payload: status,
  }),
  setCurrentPage: (page) => ({
    type: "CELL:SET_CURRENT_PAGE",
    payload: page,
  }),
  setPageSize: (size) => ({
    type: "CELL:SET_PAGE_SIZE",
    payload: size,
  }),
  dropSelectedRow: () => ({
    type: "CELL:SET_ROW",
    payload: null,
  }),
  sortByField: (sortField, biggestOnTop) => (dispatch, getState) => {
    const { cell } = getState();
    const { fitlteredRows } = cell;
    let sortPropperty;
    switch (sortField) {
      case "id":
        sortPropperty = (object) => object.id;
        break;
      case "firstName":
        sortPropperty = (object) => object.firstName;
        break;
      case "lastName":
        sortPropperty = (object) => object.lastName;
        break;
      case "email":
        sortPropperty = (object) => object.email;
        break;
      case "phone":
        sortPropperty = (object) => object.phone;
        break;
      case "description":
        sortPropperty = (object) => object.id;
        break;
      case "streetAddress":
        sortPropperty = (object) => object.address.streetAddress;
        break;
      case "city":
        sortPropperty = (object) => object.address.city;
        break;
      case "state":
        sortPropperty = (object) => object.address.state;
        break;
      case "zip":
        sortPropperty = (object) => object.address.zip;
        break;
      default:
        sortPropperty = (object) => object.id;
    }
    const filterItems = () => {
      dispatch(
        Actions.setFilteredRows(
          fitlteredRows.sort(sortBy(sortPropperty, biggestOnTop))
        )
      );
    };
    filterItems();
  },
  selectRow: (index) => (dispatch, getState) => {
    const { cell } = getState();
    const { selectedRow } = cell;
    if (selectedRow !== index) {
      dispatch({
        type: "CELL:SET_ROW",
        payload: index,
      });
    } else {
      dispatch(Actions.dropSelectedRow());
    }
  },

  setRows: (rows) => ({
    type: "CELL:SET_ITEMS",
    payload: rows,
  }),
  setFilteredRows: (rows) => (dispatch) => {
    dispatch({ type: "CELL:SET_FILTERED_ITEMS", payload: rows });
    dispatch(Actions.setPaginatedRows());
  },
  cancelFilter: () => (dispatch, getState) => {
    const { cell } = getState();
    const { rows } = cell;
    dispatch(Actions.setFilteredRows(rows));
  },
  setInnitialFilter: () => (dispatch, getState) => {
    const { cell } = getState();
    const { rows } = cell;
    dispatch({
      type: "CELL:SET_FILTERED_ITEMS",
      payload: rows,
    });
  },
  findClient: (query, exactSearch) => (dispatch, getState) => {
    const { cell } = getState();
    const { rows } = cell;
    let searchRows = filterClientData(rows, query, exactSearch);
    dispatch(Actions.setFilteredRows(searchRows));
  },
  setPaginatedRows: () => (dispatch, getState) => {
    const { cell } = getState();
    const { pageSize, currentPage, fitlteredRows } = cell;
    let paginatedList = pagination(fitlteredRows, currentPage, pageSize);
    dispatch({ type: "CELL:SET_PAGINATED_ITEMS", payload: paginatedList });
  },
  setMainRows: (data) => (dispatch) => {
    dispatch(Actions.setRows(data));
    dispatch(Actions.setInnitialFilter());
    dispatch(Actions.setPaginatedRows());
  },
  fetchClients: () => (dispatch) => {
    clientInfoApi
      .getAll()
      .then(({ data }) => {
        dispatch(Actions.setMainRows(data));
      })
      .catch(() => {
        dispatch(Actions.setLoadingErr());
      });
  },
  fetchClientsBig: () => (dispatch) => {
    dispatch(Actions.setCurrentPage(1));
    dispatch(Actions.setLoading(true));
    clientInfoApi
      .getAll()
      .then(({ data }) => {
        dispatch(Actions.setMainRows(data));
      })
      .catch(() => {
        dispatch(Actions.setLoadingErr());
      });
  },
  fetchClientsSmall: () => (dispatch) => {
    dispatch(Actions.setCurrentPage(1));
    dispatch(Actions.setLoading(true));
    clientInfoApi
      .getAllsmall()
      .then(({ data }) => {
        dispatch(Actions.setMainRows(data));
      })
      .catch(() => {
        dispatch(Actions.setLoadingErr());
      });
  },
};
export default Actions;
