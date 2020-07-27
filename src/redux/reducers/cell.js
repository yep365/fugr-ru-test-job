const initialState = {
  selectedSortColumn: undefined,
  selectedRow: undefined,
  selectedColumn: undefined,
  isLoading: false,
  fitlteredRows: [],
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
    default:
      return state;
  }
};
