import React, { FunctionComponent } from "react";
import { Dashboard } from "../../components/dashboard";
import { ALL_RANKS } from "../../core/models/user";
import AuthenticationService from "../../core/auth";
import { Breadcrumb } from "react-bootstrap";

export const Portal: FunctionComponent = () => {
  const renderRanks = () => {
    return ALL_RANKS.map((rank) => {
      return (
        <p key={rank}>
          <b>{rank}:</b> {AuthenticationService.hasAccess(rank) ? "Yes" : "No"}
        </p>
      );
    });
  };

  return (
    <Dashboard>
      <Breadcrumb>
        <Breadcrumb.Item active>Home</Breadcrumb.Item>
      </Breadcrumb>

      <h3 className="text-center">Congratulations!</h3>
      <p className="text-center">You are logged in!</p>

      {renderRanks()}
    </Dashboard>
  );
};
