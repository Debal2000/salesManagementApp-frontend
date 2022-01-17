// This Component contain the header
//company name and logo, and hrc logo are withing this jsx

import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import Brand from "../assets/companyLogo.svg";
import { ReactComponent as HRCLogo } from "../assets/logo.svg";
const useStyles = makeStyles((theme) => ({
  header: {
    margin: "1rem 0rem 1.5rem 0.8rem",
  },
  abcProducts: {
    position: "absolute",
    marginLeft: "2.8rem",
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "700",
  },
  subHeader: {
    height: "2rem",
    display: "flex",
    justifyContent: "flex-end",
  },
  hrc: {
    objectFit: "contain",
    margin: "auto",
    height: "2rem",
  },
  brand: {
    height: "2rem",
    position: "absolute",
    marginLeft: "0.5rem",
    fill:"#CD7925 !important",
    color:"#CD7925 !important"
  },
}));
export default function Header() {
  const classes = useStyles();
  return (
    <Grid className={classes.header}>
        <img src={Brand} alt="brand" className={classes.brand}/>
      <Grid className={classes.abcProducts}>ABC Products</Grid>
      <Grid className={classes.subHeader}>
        <HRCLogo className={classes.hrc} />
      </Grid>
    </Grid>
  );
}
