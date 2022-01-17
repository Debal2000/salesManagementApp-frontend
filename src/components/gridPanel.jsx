import { Paper, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import GridPanelToolBar from "./gridPanelToolBar";
import GridTable from "./gridTable";
import SearchTable from "./searchTable";
const useStyles = (theme) => ({
  gridPanelHeader: {
    color: "white",
    margin: "1.3rem",
    fontSize: "1.2rem",
  },
  grid: {
    backgroundColor: "#2c414f",
    padding: "1rem",
    margin: "1.3rem",
  },
});

class GridPanel extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.gridPanelHeader}>Sales List</div>
        <div>
          <Paper elevation={0} className={classes.grid}>
            <GridPanelToolBar />
            {this.props.shouldShow ? null : <GridTable />}
            {this.props.shouldShow ? <SearchTable /> : null}
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    shouldShow: state.shouldShow,
  };
};

export default connect(mapStoreToProps)(withStyles(useStyles)(GridPanel));
