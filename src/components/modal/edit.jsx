//This contain Edit Button and its modal
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import {
  Button,
  Grid,
  IconButton,
  InputLabel,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { connect} from "react-redux";
import store from "../../store";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import { getAPI } from "../../services/services";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: "#2A3E4C",
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
  Dialog: {
    color: "white",
    border: "0px solid #2A3E4C",
  },
  saveBut: {
    backgroundColor: "#14AFF1",
    color: "white",
    margin: "0.5rem",
    textTransform: "none",
    height: "2rem",
    fontSize: "1rem",
    padding: "1rem",
    border: "0.1rem solid #14AFF1",
    borderRadius: "0.5rem"
  },
  resetBut: {
    color: "white",
    borderColor: "#14AFF1",
    margin: "0.5rem",
    textTransform: "none",
  },
  label: {
    color: "#97A1A9",
    fontSize: "1rem",
    float: "left",
  },
  amountInput: {
    border: "0.2rem solid #356680",
    borderRadius: "0.5rem",
    float: "right",
    padding: "0.5rem",
    margin: "1rem",
    color: "white",
  },
  notesInput: {
    color: "white",
    border: "0.2rem solid #356680",
    borderRadius: "0.5rem",
    float: "right",
    padding: "0.5rem",
    marginRight: "1rem",
    height: "10rem",
  },
  cancel: {
    color: "#14AFF1",
    display: "flex",
    position: "absolute",
    left: theme.spacing(1),
    bottom: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  disabledButton: {
    color: "#97A1A9 !important",
    borderColor: "#97A1A9 !important",
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
}));
function EditModal() {
  const classes = useStyles();
  let selected = store.getState().selected;
  const [total_open_amount, setTotal_open_amount] = React.useState();
  const [notes, setNotes] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [badSnackOpen, setBadSnackOpen] = React.useState(false);

  const handleBadSnackOpen = () => {
    setBadSnackOpen(true);
  };

  const handleBadSnackClose = () => {
    setBadSnackOpen(false);
  };
  const handleSnackOpen = () => {
    setSnackOpen(true);
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAmountChange = (e) => {
    setTotal_open_amount(e.target.value);
  };
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };
  let formData;
  const handleSubmit = (e) => {
    if (total_open_amount === "") {
      handleBadSnackOpen();
      return;
    }
    e.preventDefault();
    formData = {
      doc_id: selected[0].doc_id,
      total_open_amount: total_open_amount,
      notes: notes,
    };
    commitSubmit();
    handleClose();
  };
  const handleReset = (e) => {
    document.getElementById("editForm").reset();
    setTotal_open_amount();
  };
  const commitSubmit = () => {
    //Using getAPI function from services to edit data in databse.
    //Syntax: getAPI(path_name,parameter_data)
    getAPI("edit", formData).then(() => {
      handleSnackOpen();
      //Reloading page after 600ms once the update data is commited succefully
      setTimeout(()=>{ window.location.reload(true);},600);
    });
  };

  React.useEffect(() => {
    setTotal_open_amount(selected.length>0?selected[0].total_open_amount:null);
    setNotes(selected.length > 0 ? selected[0].notes : null);
  }, [selected]);
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
              Sales Order Edited
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
        disabled={selected.length === 1 ? false : true}
        color="primary"
        className={classes.toolBarButton}
        classes={{ disabled: classes.disabledButton }}
        startIcon={<EditIcon id="buttonIcon" />}
      >
        Edit
      </Button>
      <Dialog
        className={classes.Dialog}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <MuiDialogTitle disableTypography className={classes.root}>
          <Typography variant="h6">Edit Invoice</Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent className={classes.root} id="editBox">
          <form
            noValidate
            autoComplete="off"
            id="editForm"
            method="get"
            onSubmit={handleSubmit}
          >
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <InputLabel
                htmlFor="total_open_amount"
                classes={{
                  asterisk: classes.labelAsterisk,
                }}
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
                defaultValue={selected.length>0?selected[0].total_open_amount:null}
              />
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
              <InputLabel htmlFor="notes" className={classes.label}>
                Notes
              </InputLabel>
              <TextField
                InputProps={{
                  className: classes.notesInput,
                }}
                name="notes"
                id="notes"
                onChange={handleNotesChange}
                multiline
                rows={6}
                variant="outlined"
                defaultValue={selected.length>0?selected[0].notes:null}
              />
            </Grid>
          </form>
        </DialogContent>
        <DialogActions className={classes.root}>
          <Button onClick={handleClose} className={classes.cancel}>
            Cancel
          </Button>
          <Button
            className={classes.resetBut}
            variant="outlined"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            onClick={handleSubmit}
            className={classes.saveBut}
            variant="outlined"
          >
            Save
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
export default connect(mapStoreToProps)(EditModal);
