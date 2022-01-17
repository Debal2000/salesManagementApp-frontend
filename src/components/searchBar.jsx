//It comtain search Bar to search particular sale based on sales order id
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch } from "react-redux";
import { HIDE_SEARCH_TABLE, SHOW_SEARCH_TABLE } from "../actions/actionTypes";
const useStyles = makeStyles((theme) => ({
  root: {
    float: "right",
    padding: "0.0rem",
    margin: "0.5rem",
    color: "white",
    backgroundColor: "#283A46",
    height: "2rem",
    border: "0.1rem solid #356680",
  },
  input: {
    padding: "0.3rem",
    paddingTop: "0.1rem",
    color: "white",
    fontSize: "1rem",
  },
}));

function SearchBar() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleSalesChange = (e) => {
    if (e.target.value.length > 0) {
      dispatch({
        type: SHOW_SEARCH_TABLE,
        payload: e.target.value,
      });
    } else {
      dispatch({
        type: HIDE_SEARCH_TABLE,
      });
    }
  };
  const debounce = (func, delay) => {
    let inDebounce;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };
  return (
    <Paper className={classes.root} elevation={0}>
      <InputBase
        id="searchBar"
        onChange={debounce(handleSalesChange, 300)}
        type="number"
        className={classes.input}
        placeholder="Search by Sales Number"
        endAdornment={<SearchIcon />}
      />
    </Paper>
  );
}
export default SearchBar;
