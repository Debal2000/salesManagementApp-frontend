//This page is called when there's no result found for a search
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { HIDE_SEARCH_TABLE } from "../actions/actionTypes";

const useStyles = makeStyles((theme) => ({
  grid: {
    display: "flex",
    backgroundColor: "#2c414f",
    margin: "auto",
    color: "white",
    paddingTop: "7rem",
  },
  root: {
    border: "0rem",
    borderColor: "#283A46",
    backgroundColor: "#2c414f",
    color: "white",
  },
  clearBut: {
    color: "#14AFF1",
    textTransform: "none",
    marginTop: "1rem",
  },
}));

export default function NoDataFound() {
  const dispatch = useDispatch();
  const classes = new useStyles();
  const handleClearButton = () => {
    document.getElementById("searchBar").value="";
    dispatch({
      type: HIDE_SEARCH_TABLE,
    });
  };

  return (
    <Grid
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.grid}
    >
      <ErrorOutlineOutlinedIcon color="error" fontSize="large" />
      <Typography variant="h5">No Result Found</Typography>
      <Typography variant="caption">
        Try adjusting your search to find what you are looking for.
      </Typography>
      <Button onClick={handleClearButton} className={classes.clearBut}>
        Clear Search
      </Button>
    </Grid>
  );
}
