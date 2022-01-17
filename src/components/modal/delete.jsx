//This contain Delete Button and its modal
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  IconButton,
  Snackbar,
  Typography,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import store from "../../store";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { getAPI } from "../../services/services";
const useStyles = makeStyles((theme) => ({
  root: {
    color: "white !important",
    borderColor: "#14AFF1",
    backgroundColor: "#2A3E4C",
    margin: 0,
  },
  delBut: {
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
  danger: {
    color: "#FF5E5E",
  },
  content: {
    margin: 0,
    padding: "1rem 2rem 1rem 2rem",
    backgroundColor: "#2A3E4C",
    color: "#C0C6CA",
    fontSize: "0.9rem",
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
  snackbar: {
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

function DeleteModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let selected = store.getState().selected;
  const [snackOpen, setSnackOpen] = React.useState(false);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    let toDelete="";
    selected.forEach((val)=>{
      toDelete+=val.doc_id+",";
    })
    toDelete+="-1";
    commitSubmit(toDelete);
    handleClose();
  };
  const commitSubmit = (toDelete) => {
    //Using getAPI function from services to delete data from databse, based on a doc_id.
    //Syntax: getAPI(path_name,parameter_data)
    getAPI("delete",{"doc_id":toDelete}).then(() => {
      handleSnackOpen();
      //Reloading page after 600ms once the updated data is commited succefully
      setTimeout(()=>{ window.location.reload(true);},600);
    });
  };

  React.useEffect(() => {}, [selected]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        message={
          <>
            <DeleteForeverIcon fontSize="inherit" />
            <Typography display="inline" align="center">
              {" "}
              Sales Order Deleted
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
        classes={{ disabled: classes.disabledButton }}
        onClick={handleClickOpen}
        disabled={selected.length >= 1 ? false : true}
        className={classes.toolBarButton}
        variant="outlined"
        startIcon={<RemoveIcon id="buttonIcon" />}
      >
        Delete
      </Button>
      <Dialog maxWidth="lg" open={open} className={classes.dialog}>
        <MuiDialogTitle disableTypography className={classes.root}>
          <Typography variant="h6">Delete Record(s)?</Typography>

          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>

        <DialogContentText className={classes.content}>
          You'll lose record(s) after this action. We can't recover them once
          you delete. <br />
          Are you sure you want to
          <span className={classes.danger}> permanently delete</span> them ?
          <br />
        </DialogContentText>
        <DialogActions className={classes.root}>
          <Button
            variant="outlined"
            className={classes.cancelBut}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            className={classes.delBut}
            onClick={handleSubmit}
          >
            Delete
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
export default connect(mapStoreToProps)(DeleteModal);
