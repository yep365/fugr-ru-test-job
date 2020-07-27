const initialState = {
  selectedSortColumn: null,
  selectedRow: null,
  selectedColumn: null,
  isLoading: true,
  errLoading: false,
  fitlteredRows: [],
  paginatedRows: [],
  currentPage: 1,
  pageSize: 50,
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "CELL:SET_LOADING":
      return {
        ...state,
        isLoading: payload,
      };
    case "CELL:SET_ROW":
      return {
        ...state,
        selectedRow: payload,
      };
    case "CELL:SET_COLUMN":
      return {
        ...state,
        selectedColumn: payload,
      };
    case "CELL:SET_ITEMS":
      return {
        ...state,
        isLoading: false,
        fitlteredRows: payload,
      };
    case "CELL:SET_PAGINATED_ITEMS":
      return {
        ...state,
        paginatedRows: payload,
      };
    case "CELL:LOADING_ERR":
      return {
        ...state,
        isLoading: false,
        errLoading: payload,
      };
    case "CELL:SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: payload,
      };
    case "CELL:SET_PAGE_SIZE":
      return {
        ...state,
        pageSize: payload,
      };
    default:
      return state;
  }
};
