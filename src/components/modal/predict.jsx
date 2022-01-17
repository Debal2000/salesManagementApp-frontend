//This contain Predict Button and Data is fetched from flask's API on clicking Predict button
import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import store from "../../store";
import { connect } from "react-redux";
import { predictionAPI } from "../../services/services";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#14AFF1",
    color: "white",
  },
}));

function PredictModal() {
  const classes = useStyles();
  let responseData = store.getState().tableData;
  const chckData = () => {
    //Using predictionAPI function from services to get predicted data
    //Syntax: predictionAPI(parameter_data)
    predictionAPI(responseData);
  };

  React.useEffect(() => {
    return () => {};
  }, [responseData]);

  return (
    <Button
      className={classes.root}
      variant="outlined"
      id="toolBarButtons"
      onClick={chckData}
    >
      Predict
    </Button>
  );
}

const mapStoreToProps = (state) => {
  return {
    tableData: state.tableData,
  };
};
export default connect(mapStoreToProps)(PredictModal);
