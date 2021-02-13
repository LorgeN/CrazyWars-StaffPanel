import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { BasicButton } from "./styled";
import { useSessionContext } from "../context/session";
import AuthenticationService from "../core/auth";

export const LogOutButton: FunctionComponent = () => {
  const session = useSessionContext();
  const history = useHistory();

  const logOut = () => {
    AuthenticationService.logOut();
    session.setUser(null);
    history.push("/login");
  };

  return (
    <BasicButton variant="outline-light" onClick={() => logOut()}>
      Log Out
    </BasicButton>
  );
};
