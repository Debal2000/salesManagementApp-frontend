// It contain Toolbar division
//All the required buttons are called here.
import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import SearchBar from "./searchBar";
import PredictModal from "./modal/predict";
import ViewCorrespondance from "./modal/viewCorrespondance";
import EditModal from "./modal/edit";
import AddModal from "./modal/add";
import DeleteModal from "./modal/delete";
const useStyles = (theme) => ({
  toolBar: {
    display: "flex",
    justifyContent: "space-between"
  },
});
class GridPanelToolBar extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.toolBar}>
        <div>
          <PredictModal />
          <ViewCorrespondance />
        </div>
        <div>
          <AddModal />
          <EditModal />
          <DeleteModal />
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default (withStyles(useStyles)(GridPanelToolBar));
