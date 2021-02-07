import React, { FunctionComponent } from "react";
import { Dashboard } from "../../components/dashboard";
import { Rank, ALL_RANKS } from "../../models/user";
import AuthenticationService from "../../core/auth";

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
      <h3 className="text-center">Congratulations!</h3>
      <p className="text-center">You are logged in!</p>

      {renderRanks()}
    </Dashboard>
  );
};
