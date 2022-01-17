//This table is triggered whenever user search any sale
//It automatically hide itself when search bar is empty
import {
  Checkbox,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import { connect, useDispatch } from "react-redux";
import store from "../store";
import InfiniteScroll from "react-infinite-scroll-component";
import { SELECTED_INVOICE } from "../actions/actionTypes";
import NoDataFound from "./noDataFound";
const headCells = [
  { id: "customer_name", align: "left", label: "Customer Name" },
  { id: "cust_number", align: "left", label: "Customer #" },
  { id: "sales_order_id", align: "left", label: "Sales #" },
  { id: "total_open_amount", align: "right", label: "Sales Amount" },
  { id: "due_in_date", align: "right", label: "Due Date" },
  { id: "predicted_date", align: "right", label: "Predicted Payment Date" },
  { id: "predicted_age", align: "left", label: "Predicted Aging Bucket" },
  { id: "notes", align: "left", label: "Notes" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    border: "0rem",
    borderColor: "#283A46",
  },
  selected: {
    "&$selected, &$selected:hover": {
      backgroundColor: "#2A5368",
      color: "white",
    },
  },
  paper: {
    width: "100%",
    backgroundColor: "#2c414f",
  },
  table: {
    minWidth: "50rem",
    borderCollapse: "separate",
    border: 0,
  },
  tableHeader: {
    borderColor: "#283A46",
    color: "#97A1A9",
    borderBlockWidth: "0.2rem",
    padding: "1rem 1rem 0rem 0rem",
  },
  data: {
    color: "white",
    border: 0,
    padding: "0.5rem 1rem 0.5rem 0rem",
  },
  evenRow: {},
  oddRow: {
    backgroundColor: "#283A46",
    color: "white",
  },
  checkbox: {
    fontSize: "1.0rem",
    color: "#97A1A9!important",
  },
  checked: {
    color: "#14aff1 !important",
  },
  danger: {
    color: "#FF5E5E",
    border: 0,
    padding: "0.8rem 1rem 0.8rem 0rem",
  },
  sort: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
  },
  arrow: {
    padding: "0.25rem",
    margin: "-0.4rem 0rem 0rem 0rem",
  },
  grid: {
    display: "flex",
    backgroundColor: "#2c414f",
    margin: "auto",
    color: "white",
    paddingTop: "7rem",
    direction:"column",
    justifyContent:"center",
    alignItems:"center"
  },
}));

function SearchTable() {
  const classes = useStyles();
  let [responseData, setResponseData] = React.useState([]);
  let [isNext, isNextFunc] = React.useState(false);
  let [pageCount, setCount] = React.useState(1);
  const [selected, setSelected] = React.useState([]);
  const [noResult, setNoResult] = React.useState(false);
  const dispatch = useDispatch();
  const handleNoResult = (value) => {
    setNoResult(value);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = responseData.map((n) => n);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, data) => {
    const selectedIndex = selected.indexOf(data);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, data);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (data) => selected.indexOf(data) !== -1;

  let invoiceToSearch = store.getState().searchedInvoice;

  const fetchData = () => {
    if(invoiceToSearch===true) invoiceToSearch="";
    axios
      .get(
        `http://localhost:8080/1805654/fetch?sales_order_id=${invoiceToSearch}&page=${pageCount}`
      )
      .then((response) => {
        setResponseData([...response.data]);
        if (response.data.length < 1) handleNoResult(true);
        else handleNoResult(false);
        isNextFunc(false);
        setCount(pageCount);
      })
      .catch((error) => {
        handleNoResult(true);
        console.log(error);
      });
  };

  React.useEffect(() => {
    fetchData();
    return () => {};
  }, [invoiceToSearch]);
  React.useEffect(() => {
    dispatch({
      type: SELECTED_INVOICE,
      payload: selected,
    });
    return () => {};
  }, [selected]);
  return (
    <Grid className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <InfiniteScroll
          height="30rem"
          dataLength={responseData.length}
          next={fetchData}
          hasMore={isNext}
          loader={
            <div
              className={classes.grid}
            >
              <CircularProgress />
              <Typography variant="caption">Loading</Typography>
            </div>
          }
        >
          {noResult ? <NoDataFound /> : null}
          {noResult ? null : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      padding="checkbox"
                      className={classes.tableHeader}
                    >
                      <Checkbox
                        indeterminate={
                          selected.length > 0 &&
                          selected.length < responseData.length
                        }
                        checked={
                          responseData.length > 0 &&
                          selected.length === responseData.length
                        }
                        onChange={handleSelectAllClick}
                        className={classes.checkbox}
                        classes={{ checked: classes.checked }}
                        style={{
                          color: "#14aff1",
                          margin: 0,
                        }}
                      />
                    </TableCell>
                    {headCells.map((headCell) => (
                      <TableCell
                        className={classes.tableHeader}
                        key={headCell.id}
                        align={headCell.align}
                      >
                        {headCell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {responseData.map((data, index) => {
                    const isItemSelected = isSelected(data);
                    let today = new Date();
                    let due_date = new Date(data.due_in_date);
                    return (
                      <TableRow
                        hover
                        key={data.doc_id}
                        classes={{ selected: classes.selected }}
                        className={
                          index % 2 === 0 ? classes.evenRow : classes.oddRow
                        }
                        role="checkbox"
                        onClick={(event) => handleClick(event, data)}
                        selected={isItemSelected}
                      >
                        <Checkbox
                          checked={isItemSelected}
                          className={classes.checkbox}
                          classes={{ checked: classes.checked }}
                        />
                        <TableCell className={classes.data} align="left">
                          {data.name_customer}
                        </TableCell>
                        <TableCell className={classes.data} align="left">
                          {data.cust_number}
                        </TableCell>
                        <TableCell className={classes.data} align="left">
                          {data.sales_order_id}
                        </TableCell>
                        <TableCell className={classes.data} align="right">
                          {Math.round(data.total_open_amount) / 1000}K
                        </TableCell>
                        <TableCell
                          className={
                            due_date > today ? classes.data : classes.danger
                          }
                          align="right"
                        >
                          {data.due_in_date}
                        </TableCell>
                        <TableCell className={classes.data} align="right">
                          --
                        </TableCell>
                        <TableCell className={classes.data}>--</TableCell>
                        <TableCell className={classes.data} align="left">
                          {data.notes}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </InfiniteScroll>
      </Paper>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    invoiceToSearch: state.searchedInvoice,
  };
};
export default connect(mapStateToProps)(SearchTable);
