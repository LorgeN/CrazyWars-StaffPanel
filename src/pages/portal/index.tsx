import React, { FunctionComponent } from "react";
import { Dashboard } from "../../components/dashboard";

export const Portal: FunctionComponent = () => {
  return (
    <Dashboard>
      <h3 className="text-center">Congratulations!</h3>
      <p className="text-center">You are logged in!</p>
    </Dashboard>
  );
};
