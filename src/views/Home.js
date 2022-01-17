//This is the homepage
//It call all the necessary components inside a fragment
import React from "react";
import { Fragment } from "react";
import GridPanel from "../components/gridPanel";
import Header from "../components/header";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <GridPanel />
    </Fragment>
  );
}
