const initialState = {
  shouldShow: false,
  searchedInvoice:"",
  selected:[],
  tableData:[],
};

function addReducer(state = initialState, action) {
  switch (action.type) {
    case "SHOW_SEARCH_TABLE":
      return { ...state, shouldShow: true,searchedInvoice:action.payload };
    case "HIDE_SEARCH_TABLE":
      return { ...state, shouldShow: false,searchedInvoice:"" };
    case "SELECTED_INVOICE":
      return {...state,selected:[...action.payload]};
    case "TABLE_DATA":
      return {...state,tableData:[...action.payload]}
    default:
      return state;
  }
}

export default addReducer;
