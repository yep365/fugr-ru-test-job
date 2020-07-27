import { clientInfoApi } from "../../utils/api";
import { pagination } from "../../utils/helpers";

const Actions = {
  setLoading: (status) => ({
    type: "CELL:SET_LOADING",
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
  selectRow: (index) => ({
    type: "CELL:SET_ROW",
    payload: index,
  }),
  setRows: (rows) => ({
    type: "CELL:SET_ITEMS",
    payload: rows,
  }),
  setFilteredRows: () => (dispatch, getState) => {
    const { cell } = getState();
    const { rows } = cell;
    dispatch({
      type: "CELL:SET_FILTERED_ITEMS",
      payload: rows,
    });
  },
  setPaginatedRows: () => (dispatch, getState) => {
    const { cell } = getState();
    const { pageSize, currentPage, fitlteredRows } = cell;
    let paginatedList = pagination(fitlteredRows, currentPage, pageSize);

    dispatch(Actions.selectRow(undefined));
    dispatch({ type: "CELL:SET_PAGINATED_ITEMS", payload: paginatedList });
  },

  fetchClients: () => (dispatch) => {
    clientInfoApi
      .getAll()
      .then(({ data }) => {
        dispatch(Actions.setRows(data));
        dispatch(Actions.setFilteredRows());
        dispatch(Actions.setPaginatedRows());
      })
      .catch(() => {
        dispatch(Actions.setLoadingErr());
      });
  },
  fetchClientsBig: () => (dispatch) => {
    dispatch(Actions.setLoading(true));
    clientInfoApi
      .getAll()
      .then(({ data }) => {
        dispatch(Actions.setRows(data));
        dispatch(Actions.setFilteredRows());
        dispatch(Actions.setPaginatedRows());
      })
      .catch(() => {
        dispatch(Actions.setLoadingErr());
      });
  },
  fetchClientsSmall: () => (dispatch) => {
    dispatch(Actions.setLoading(true));
    clientInfoApi
      .getAllsmall()
      .then(({ data }) => {
        dispatch(Actions.setRows(data));
        dispatch(Actions.setFilteredRows());
        dispatch(Actions.setPaginatedRows());
      })
      .catch(() => {
        dispatch(Actions.setLoadingErr());
      });
  },
};
export default Actions;
