//This contain View Correspondance Button and its modal.
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import store from "../../store";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { connect } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    color: "white !important",
    borderColor: "#14AFF1",
    backgroundColor: "#2A3E4C",
    margin: "0",
  },
  select: {
    border: "0.2rem solid #356680",
    borderRadius: "0.5rem",
    backgroundColor: "#283A46",
    color: "white",
    padding: "0.3rem 0.5rem 0.3rem 0.5rem",
  },
  menu: {
    color: "orange !important",
    backgroundColor: "orange",
  },
  option: {
    backgroundColor: "#283A46",
    color: "white",
    "&:hover": {
      color: "black",
    },
    "&:focus": {
      backgroundColor: "#2A5368",
      color: "grey",
    },
  },
  disabledButton: {
    color: "#97A1A9 !important",
    borderColor: "#97A1A9 !important",
  },
  icon: {
    height: "2rem",
  },
  downBut: {
    backgroundColor: "#14AFF1",
    color: "white",
    margin: "0.5rem",
    textTransform: "none",
  },
  cancelBut: {
    color: "white",
    borderColor: "#14AFF1",
    margin: "0.5rem",
    textTransform: "none",
  },
  highlight: {
    color: "white",
  },
  content: {
    margin: 0,
    padding: "1rem",
    backgroundColor: "#2A3E4C",
    fontSize: "0.9rem",
  },
  contentText: {
    color: "#C0C6CA",
  },
  closeButton: {
    color: theme.palette.grey[500],
  },
  danger: {
    color: "#FF5E5E",
    border: 0,
    padding: "0.5rem 2rem 0.5rem 2rem",
  },
  data: {
    color: "white",
    border: 0,
    padding: "0.5rem 2rem 0.5rem 2rem",
  },
  evenRow: {},
  oddRow: {
    backgroundColor: "#283A46",
    color: "white",
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
    padding: "1rem 2rem 0rem 2rem",
  },
}));
const headCells = [
  { id: "sales_order_id", align: "left", label: "Sales Number" },
  { id: "cust_number", align: "left", label: "PO Number" },
  { id: "due_in_date", align: "right", label: "Due Date" },
  { id: "currency", align: "left", label: "Currency" },
  { id: "total_open_amount", align: "right", label: "Open Amount($)" },
];
function ViewCorrespondance() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [template, setTemplate] = React.useState("template1");
  let selected = store.getState().selected;
  let total_amount = 0;
  const handleTemplateChange = (e) => {
    if (e.target.value === "template1") {
      setTemplate("template1");
    } else {
      setTemplate("template2");
    }
  };
  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDownload = (event) => {
    event.preventDefault();
    const doc = new jsPDF();

    const { rows, cols } = getSelectedRows();
    autoTable(doc, {
      columns: cols,
      body: rows,
    });
    window.open(doc.output("bloburl"), "_blank");
  };

  const getSelectedRows = () => {
    const cols = [
      "Sales #",
      "Customer #",
      "Due Date",
      "Currency",
      "Sales Amount",
    ];
    const rows = selected
      .map((data) => {
        return data;
      })
      .map((col) => {
        return [
          col.sales_order_id,
          col.cust_number,
          col.due_in_date,
          "USD",
          col.total_open_amount,
        ];
      });
    return {
      cols,
      rows,
    };
  };
  return (
    <>
      <Button
        variant="outlined"
        id="toolBarButtons"
        classes={{ disabled: classes.disabledButton }}
        className={classes.root}
        disabled={selected.length < 1}
        onClick={handleClickOpen}
      >
        View Correspondence
      </Button>
      <Dialog
        scroll="paper"
        maxWidth="xl"
        open={open}
        className={classes.dialog}
      >
        <DialogTitle disableTypography className={classes.root}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>View Correspondance ({selected.length})</span>
            <span>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  className={classes.select}
                  open={menuOpen}
                  onClose={handleMenuClose}
                  onOpen={handleMenuOpen}
                  value={template}
                  onChange={handleTemplateChange}
                >
                  <MenuItem className={classes.option} value="template1">
                    Template 1
                  </MenuItem>
                  <MenuItem className={classes.option} value="template2">
                    Template 2
                  </MenuItem>
                </Select>
              </FormControl>
              <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </span>
          </div>
        </DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText className={classes.contentText}>
            Subject:{" "}
            <span className={classes.highlight}>
              Invoice Details -{" "}
              {selected.length > 0 ? selected[0].name_customer : "Account name"}
            </span>{" "}
            <br />
            <br />
            Dear Sir/Madam,
            <br />
            <br />
            {template === "template1" ? (
              <div>
                Gentle reminder that you have one or more open invoices on your
                account.
                <br />
                Please get back to us with an expected date of payment. If you
                have any specific issue with the invoice(s), please let us know
                so that we can address it at the earliest.
                <br />
                <br />
              </div>
            ) : (
              <div>
                Greetings!
                <br />
                This is to remind you that there are one or more open invoices
                on your account. Please provide at your earliest convenience an
                update on the payment details or clarify the reason for the
                delay. If you have any specific issue with the invoice(s),
                please let us know so that we can address it to the correct
                Department.
                <br />
                <br />
              </div>
            )}
            Please find the details of the invoices below:
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {headCells.map((headCell) => (
                      <TableCell
                        className={classes.tableHeader}
                        padding={headCell.disablePadding ? "none" : "default"}
                        key={headCell.id}
                        align={headCell.align}
                      >
                        {headCell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selected.map((data, index) => {
                    let today = new Date();
                    let due_date = new Date(data.due_in_date);
                    total_amount += Math.round(data.total_open_amount).toFixed(2) / 1000;
                    return (
                      <TableRow
                        hover
                        key={data.doc_id}
                        classes={{ selected: classes.selected }}
                        className={
                          index % 2 === 0 ? classes.evenRow : classes.oddRow
                        }
                      >
                        <TableCell className={classes.data} align="left">
                          {data.sales_order_id}
                        </TableCell>

                        <TableCell className={classes.data} align="left">
                          {data.doc_id}
                        </TableCell>

                        <TableCell
                          className={
                            due_date > today ? classes.data : classes.danger
                          }
                          align="right"
                        >
                          {data.due_in_date}
                        </TableCell>
                        <TableCell align="left" className={classes.data}>
                          USD
                        </TableCell>
                        <TableCell className={classes.data} align="right">
                          {(Math.round(data.total_open_amount) / 1000)}K
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {template === "template2" ? (
              <div>
                <br />
                Total Amount to be paid:{" "}
                <span className={classes.highlight}>${total_amount}K</span>
              </div>
            ) : null}
            <br />
            In case you have already made a payment for the above items, please
            send us the details to ensure the payment is posted.
            <br />
            Let us know if we can be of any further assistance. Looking forward
            to hearing from you.
            <br />
            <br />
            Kind Regards, [Sender’s First Name][Sender’s Last Name]
            <br />
            <>
              Phone : [Sender’s contact number]
              <br />
              Fax : [If any]
              <br />
              Email : [Sender’s Email Address]
              <br />
              Company Name[Sender’s Company Name]
              <br />
            </>
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.root} position="sticky">
          <Button
            variant="outlined"
            className={classes.cancelBut}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            className={classes.downBut}
            onClick={handleDownload}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
const mapStoreToProps = (state) => {
  return {
    selected: state.selected,
  };
};
export default connect(mapStoreToProps)(ViewCorrespondance);
