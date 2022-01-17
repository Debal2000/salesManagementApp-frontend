import {
  HIDE_SEARCH_TABLE,
  REFRESH,
  SELECTED_INVOICE,
  SHOW_SEARCH_TABLE,
  TABLE_DATA,
  TO_SEARCH,
} from "./actionTypes";

export function showSearchTable(payload) {
  return {
    type: SHOW_SEARCH_TABLE,
    payload,
  };
}
export function hideSearchTable(payload) {
  return {
    type: HIDE_SEARCH_TABLE,
  };
}
export function selectedInvoices(payload) {
  return {
    type: SELECTED_INVOICE,
    payload,
  };
}
export function changeTableData(payload) {
  return {
    type: TABLE_DATA,
    payload,
  };
}
export function refreshPage(payload) {
  return {
    type: REFRESH,
  };
}
export function toSearch(payload) {
  return {
    type: TO_SEARCH,
    payload,
  };
}
