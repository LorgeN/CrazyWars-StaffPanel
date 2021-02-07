import React, { FunctionComponent } from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { BasicPage } from "../../components/background";
import {
  CenterInContainer,
  FloatContainer,
  BasicButton,
} from "../../components/styled";
import { useSessionContext } from "../../context/session";
import AuthenticationService from "../../core/auth";

export const Portal: FunctionComponent = () => {
  const [sessionContext, updateSessionContext] = useSessionContext();
  const history = useHistory();

  const logOut = () => {
    AuthenticationService.logout();

    updateSessionContext({
      ...sessionContext,
      isAuthenticated: false,
      user: null,
    });

    history.push("/login");
  };

  return (
    <BasicPage>
      <FloatContainer>
        <h3 className="text-center">Congratulations!</h3>
        <p className="text-center">You are logged in!</p>

        <CenterInContainer>
          <BasicButton variant="primary" onClick={() => logOut()}>
            Log Out
          </BasicButton>
        </CenterInContainer>
      </FloatContainer>
    </BasicPage>
  );
};
