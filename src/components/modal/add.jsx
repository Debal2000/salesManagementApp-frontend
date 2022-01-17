//This contain Add Button and its modal

import React from "react";
import {
  Button,
  Grid,
  IconButton,
  InputLabel,
  Snackbar,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import { getAPI } from "../../services/services";
const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: "#2A3E4C",
    textTransform: "none",
  },
  addBut: {
    backgroundColor: "#14AFF1",
    height: "2rem",
    margin: "0.5rem",
    fontSize: "1rem",
    textTransform: "none",
    padding: "1rem",
    border: "0.1rem solid #14AFF1",
    borderRadius: "0.5rem",
  },
  label: {
    alignSelf: "center",
    color: "#97A1A9",
    fontSize: "0.9rem",
    float: "left",
  },
  notesLabel: {
    color: "#97A1A9",
    paddingTop: "1rem",
    fontSize: "1rem",
    float: "left",
  },
  amountInput: {
    border: "0.2rem solid #356680",
    borderRadius: "0.5rem",
    backgroundColor: "#283A46",
    color: "white",
    padding: "0.3rem",
    marginLeft: "0.5rem",
  },
  cancel: {
    color: "#14AFF1",
    display: "flex",
    position: "absolute",
    left: theme.spacing(1),
    bottom: theme.spacing(2),
  },
  row: {
    padding: 0,
    margin: 0,
    width: "50rem",
  },
  cell: {
    padding: 0,
    margin: 0,
    border: 0,
  },
  col: {
    display: "inline-flex",
    alignItems: "center",
    flexFlow: "column",
  },
  input: {
    display: "inline-flex",
    justifyContent: "space-between",
    margin: "0.5rem",
    paddingTop: "0.5rem",
    alignSelf: "normal",
  },
  date: {
    border: "0.2rem solid #356680",
    borderRadius: "0.5rem",
    backgroundColor: "#283A46",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  labelAsterisk: {
    color: "#FF5B5B",
  },
  snackbar: {
    background: "#21303B",
    color: "white",
    borderLeft: "0.3rem solid #00bf83",
  },
  badSnackbar: {
    background: "#21303B",
    color: "white",
    borderLeft: "0.3rem solid #FF5B5B",
  },
  toolBarButton: {
    color: "white",
    backgroundColor: "#2A3E4C",
    height: "2rem",
    margin: "0.5rem",
    fontSize: "1rem",
    textTransform: "none",
    padding: "1rem",
    border: "0.1rem solid #14AFF1",
    borderRadius: "0.5rem",
  },
}));
export default function AddModal() {
  const classes = useStyles();
  const [name_customer, setName_customer] = React.useState();
  const [cust_number, setCust_number] = React.useState();
  const [sales_order_id, setSales_order_id] = React.useState();
  const [total_open_amount, setTotal_open_amount] = React.useState();
  const [due_in_date, setDue_in_date] = React.useState();
  const [notes, setNotes] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [badSnackOpen, setBadSnackOpen] = React.useState(false);
  

  const handleSnackOpen = () => {
    setSnackOpen(true);
  };
  const handleSnackClose = () => {
    setSnackOpen(false);
  };
  const handleBadSnackOpen = () => {
    setBadSnackOpen(true);
  };
  const handleBadSnackClose = () => {
    setBadSnackOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleNameChange = (e) => {
    setName_customer(e.target.value);
  };
  const handleNumberChange = (e) => {
    setCust_number(e.target.value);
  };
  const handleSalesChange = (e) => {
    setSales_order_id(e.target.value);
  };
  const handleAmountChange = (e) => {
    setTotal_open_amount(e.target.value);
  };
  const handleDateChange = (e) => {
    setDue_in_date(e.target.value);
  };
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  let formData;
  const handleSubmit = (e) => {
    if (
      name_customer === undefined ||
      cust_number === undefined ||
      sales_order_id === undefined ||
      total_open_amount === undefined ||
      due_in_date === undefined
    ) {
      handleBadSnackOpen();
      return;
    }
    e.preventDefault();
    formData = {
      name_customer: name_customer,
      cust_number: cust_number,
      sales_order_id: sales_order_id,
      total_open_amount: total_open_amount,
      due_in_date: due_in_date,
      notes: notes,
    };
    commitSubmit();
    handleClose();
  };
  const handleReset = (e) => {
    document.getElementById("addForm").reset();
    setTotal_open_amount();
    setNotes();
    setCust_number();
    setName_customer();
    setDue_in_date();
    setSales_order_id();
  };

  const commitSubmit = () => {
    //Using getAPI function from services to add data into databse.
    //Syntax: getAPI(path_name,parameter_data)
    getAPI("add", formData).then(() => {
      handleSnackOpen();
      setTimeout(()=>{ window.location.reload(true)},600);
    });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={badSnackOpen}
        autoHideDuration={3000}
        onClose={handleBadSnackClose}
        message={
          <>
            <WarningIcon fontSize="inherit" />
            <Typography display="inline" align="center">
              {" "}
              Mandatory fields can't be empty
            </Typography>
          </>
        }
        ContentProps={{
          classes: {
            root: classes.badSnackbar,
          },
        }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        message={
          <>
            <CheckCircleIcon fontSize="inherit" />
            <Typography display="inline" align="center">
              {" "}
              Sales Order Added
            </Typography>
          </>
        }
        ContentProps={{
          classes: {
            root: classes.snackbar,
          },
        }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      <Button
        onClick={handleClickOpen}
        color="primary"
        variant="outlined"
        className={classes.toolBarButton}
        startIcon={<AddIcon id="buttonIcon" />}
      >
        Add
      </Button>
      <Dialog maxWidth="xl" open={open} onClose={handleClose}>
        <form id="addForm" method="get">
          <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">Add Invoice</Typography>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent className={classes.root}>
            <Grid>
              <Grid className={classes.col}>
                <Grid className={classes.input}>
                  <InputLabel
                    classes={{
                      asterisk: classes.labelAsterisk,
                    }}
                    htmlFor="name_customer"
                    required
                    className={classes.label}
                  >
                    Customer Name
                  </InputLabel>
                  <TextField
                    InputProps={{
                      className: classes.amountInput,
                    }}
                    required
                    name="name_customer"
                    id="name_customer"
                    onChange={handleNameChange}
                    type="text"
                  />
                </Grid>
                <Grid className={classes.input}>
                  <InputLabel
                    classes={{
                      asterisk: classes.labelAsterisk,
                    }}
                    htmlFor="cust_number"
                    required
                    className={classes.label}
                  >
                    Customer No.
                  </InputLabel>
                  <TextField
                    InputProps={{
                      className: classes.amountInput,
                    }}
                    required
                    name="cust_number"
                    id="cust_number"
                    onChange={handleNumberChange}
                    type="text"
                  />
                </Grid>
                <Grid className={classes.input}>
                  <InputLabel
                    classes={{
                      asterisk: classes.labelAsterisk,
                    }}
                    htmlFor="sales_order_id"
                    required
                    className={classes.label}
                  >
                    Sales No.
                  </InputLabel>
                  <TextField
                    InputProps={{
                      className: classes.amountInput,
                    }}
                    required
                    name="sales_order_id"
                    id="sales_order_id"
                    onChange={handleSalesChange}
                    type="number"
                  />
                </Grid>
                <Grid className={classes.input}>
                  <InputLabel
                    classes={{
                      asterisk: classes.labelAsterisk,
                    }}
                    htmlFor="total_open_amount"
                    required
                    className={classes.label}
                  >
                    Sales Amount
                  </InputLabel>
                  <TextField
                    InputProps={{
                      className: classes.amountInput,
                    }}
                    required
                    name="total_open_amount"
                    id="total_open_amount"
                    onChange={handleAmountChange}
                    type="number"
                  />
                </Grid>
              </Grid>
              <Grid className={classes.col}>
                <Grid className={classes.input}>
                  <InputLabel
                    classes={{
                      asterisk: classes.labelAsterisk,
                    }}
                    htmlFor="due_in_date"
                    required
                    className={classes.label}
                  >
                    Due Date
                  </InputLabel>

                  <input
                    type="date"
                    name="due_in_date"
                    id="due_in_date"
                    className={classes.date}
                    required
                    onChange={handleDateChange}
                  ></input>
                </Grid>
                <Grid className={classes.input}>
                  <InputLabel htmlFor="notes" className={classes.notesLabel}>
                    Notes
                  </InputLabel>
                  <TextField
                    InputProps={{
                      className: classes.amountInput,
                    }}
                    multiline
                    rows={10}
                    name="notes"
                    id="notes"
                    onChange={handleNotesChange}
                    type="text"
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className={classes.root}>
            <Button
              onClick={handleClose}
              color="primary"
              className={classes.cancel}
            >
              Cancel
            </Button>
            <Button
              onClick={handleReset}
              color="primary"
              className={classes.root}
              variant="outlined"
            >
              Clear
            </Button>

            <Button
              type="submit"
              color="primary"
              onClick={handleSubmit}
              className={classes.addBut}
              variant="contained"
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
