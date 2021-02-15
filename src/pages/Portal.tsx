import React, { FunctionComponent } from "react";
import { Dashboard } from "../components/Dashboard";
import { Breadcrumb } from "react-bootstrap";

export const Portal: FunctionComponent = () => {
  return (
    <Dashboard>
      <Breadcrumb>
        <Breadcrumb.Item active>Home</Breadcrumb.Item>
      </Breadcrumb>

      <h3 className="text-center">Congratulations!</h3>
      <p className="text-center">You are logged in!</p>
    </Dashboard>
  );
};
