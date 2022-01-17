//It is the main table(show on home page)
//It is called by gridTable
import {
  Checkbox,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { changeTableData, selectedInvoices } from "../actions/actions";
import { SELECTED_INVOICE } from "../actions/actionTypes";
import store from "../store";
const useStyles = makeStyles((theme) => ({
  selected: {
    "&$selected, &$selected:hover": {
      backgroundColor: "#2A5368",
      color: "white",
    },
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
    wordWrap: "break-word",
    whiteSpace: "break-spaces",
  },
  evenRow: {},
  oddRow: {
    backgroundColor: "#283A46",
    color: "white",
  },
  checkbox: {
    fontSize: "1.0rem",
    color: "#97A1A9 !important",
  },
  checked: {
    color: "#14aff1 !important",
  },
  danger: {
    color: "#FF5E5E",
    border: 0,
    padding: "0.8rem 1rem 0.8rem 0rem",
  },
}));
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

function DataTable() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);
  let responseData = store.getState().tableData;
  const dispatch = useDispatch();
  const isSelected = (data) => selected.indexOf(data) !== -1;
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

  React.useEffect(() => {
    return () => {};
  }, [responseData]);
  React.useEffect(() => {
    dispatch({
      type: SELECTED_INVOICE,
      payload: selected,
    });
    return () => {};
  }, [selected]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" className={classes.tableHeader}>
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < responseData.length
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
                className={index % 2 === 0 ? classes.evenRow : classes.oddRow}
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
                  id={index.toString() + "dueDate"}
                  className={due_date > today ? classes.data : classes.danger}
                  align="right"
                >
                  {data.due_in_date}
                </TableCell>
                <TableCell className={classes.data} align="right">
                  <span id={index.toString() + "predDate"}>--</span>
                </TableCell>
                <TableCell className={classes.data}>
                  <span id={index.toString() + "bucket"}>--</span>
                </TableCell>
                <TableCell className={classes.data} align="left">
                  {data.notes}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStoreToProps = (state) => {
  return {
    tableData: state.tableData,
  };
};
const mapDispatchToProps = (dispatch) => ({
  selectedInvoices: (value) => dispatch(selectedInvoices(value)),
  tableData: (value) => dispatch(changeTableData(value)),
});
export default connect(mapStoreToProps, mapDispatchToProps)(DataTable);
