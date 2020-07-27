import { clientInfoApi } from "../../utils/api";
import { pagination } from "../../utils/helpers";

const Actions = {
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
  setRows: (clients) => ({
    type: "CELL:SET_ITEMS",
    payload: clients,
  }),
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
        dispatch(Actions.setPaginatedRows());
      })
      .catch(() => {
        dispatch(Actions.setLoadingErr());
      });
  },
  fetchClientsSmall: () => (dispatch) => {
    clientInfoApi
      .getAllsmall()
      .then(({ data }) => {
        dispatch(Actions.setRows(data));
        dispatch(Actions.setPaginatedRows());
      })
      .catch(() => {
        dispatch(Actions.setLoadingErr());
      });
  },
};
export default Actions;
