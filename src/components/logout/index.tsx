import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { BasicButton } from "../../components/styled";
import { useSessionContext } from "../../context/session";
import AuthenticationService from "../../core/auth";

export const LogOutButton: FunctionComponent = () => {
  const session = useSessionContext();
  const history = useHistory();

  const logOut = () => {
    AuthenticationService.logout();
    session.setUser(null);
    history.push("/login");
  };

  return (
    <BasicButton variant="primary" onClick={() => logOut()}>
      Log Out
    </BasicButton>
  );
};
