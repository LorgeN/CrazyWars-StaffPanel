import React, { FunctionComponent } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Dashboard } from "../components/Dashboard";

export const Players: FunctionComponent = () => {
  return (
    <Dashboard>
      <Breadcrumb>
        <Breadcrumb.Item active>Players</Breadcrumb.Item>
      </Breadcrumb>

      <h1>Players - Coming Soon </h1>
    </Dashboard>
  );
};
