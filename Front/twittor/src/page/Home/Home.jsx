import React from "react";
import BasicLayout from "../../layout/BasicLayout";

import "./Home.scss";

export default function Home(props) {
  return (
    <BasicLayout
      className="home"
      setRefreshCheckLogin={props.setRefreshCheckLogin}
    >
      <h1>sdasd</h1>
    </BasicLayout>
  );
}
