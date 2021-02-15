import React, { FunctionComponent } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Dashboard } from "../components/Dashboard";

export const Punishments: FunctionComponent = () => {
  return (
    <Dashboard>
      <Breadcrumb>
        <Breadcrumb.Item active>Punishments</Breadcrumb.Item>
      </Breadcrumb>

      <h1>Punishments - Coming Soon </h1>
    </Dashboard>
  );
};
