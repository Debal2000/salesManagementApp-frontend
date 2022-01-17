//It contain Infinite Scrolling component
//It call table from table.jsx inside infinite scrolling
import {
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect, useDispatch } from "react-redux";
import { TABLE_DATA } from "../actions/actionTypes";
import { changeTableData, selectedInvoices } from "../actions/actions";
import DataTable from "./table";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    border: "0rem",
    borderColor: "#283A46",
  },
  paper: {
    width: "100%",
    backgroundColor: "#2c414f",
  },
  grid: {
    display: "flex",
    backgroundColor: "#2c414f",
    margin: "auto",
    color: "white",
    paddingTop: "7rem",
    direction: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function GridTable() {
  const classes = useStyles();
  let [responseData, setResponseData] = React.useState([]);
  let [isNext, isNextFunc] = React.useState(false);
  let [pageCount, setCount] = React.useState(1);
  const dispatch = useDispatch();

  const fetchData = () => {
    axios
      .get(
        `http://localhost:8080/1805654/fetch?page=${pageCount}`
      )
      .then((response) => {
        setResponseData([...responseData, ...response.data]);
        isNextFunc(true);
        setCount(pageCount + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  React.useEffect(() => {
    dispatch({
      type: TABLE_DATA,
      payload: responseData,
    });
  }, [responseData]);

  return (
    <Grid className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <InfiniteScroll
          height="30rem"
          dataLength={responseData.length}
          next={fetchData}
          hasMore={isNext}
          loader={
            <div className={classes.grid}>
              <CircularProgress />
              <Typography variant="caption">Loading</Typography>
            </div>
          }
        >
          <DataTable />
        </InfiniteScroll>
      </Paper>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    value: state.value,
  };
};

const mapDispatchToProps = (dispatch) => ({
  selectedInvoices: (value) => dispatch(selectedInvoices(value)),
  tableData: (value) => dispatch(changeTableData(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridTable);
