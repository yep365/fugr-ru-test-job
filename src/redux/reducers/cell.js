const initialState = {
  selectedSortColumn: null,
  selectedRow: null,
  selectedColumn: null,
  isLoading: true,
  errLoading: false,
  errUpLoading: false,
  rows: [],
  fitlteredRows: [],
  paginatedRows: [],
  currentPage: 1,
  pageSize: 50,
  newUser: undefined,
  validation: false,
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "CELL:SET_LOADING":
      return {
        ...state,
        isLoading: payload,
      };
    case "CELL:SET_NEW_USER":
      return {
        ...state,
        newUser: payload,
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
    case "CELL:SET_VALIDATION":
      return {
        ...state,
        validation: payload,
      };
    case "CELL:SET_ITEMS":
      return {
        ...state,
        isLoading: false,
        rows: payload,
      };
    case "CELL:SET_FILTERED_ITEMS":
      return {
        ...state,
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
    case "CELL:UPLOADING_ERR":
      return {
        ...state,
        isLoading: false,
        errUpLoading: payload,
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
