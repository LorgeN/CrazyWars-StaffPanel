import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { BasicPage } from "../../components/background";
import {
  FloatContainer,
  CenterInContainer,
  BasicButton,
} from "../../components/styled";
import { useSessionContext } from "../../context/session";

export const NotFound: FunctionComponent = () => {
  const session = useSessionContext();
  const history = useHistory();

  const goBack = () => {
    if (session.isAuthenticated) {
      history.push("/");
    } else {
      history.push("/login");
    }
  };

  return (
    <BasicPage>
      <FloatContainer>
        <br />
        <h1 className="text-center">404</h1>
        <p className="text-center">Page not found!</p>

        <CenterInContainer>
          <BasicButton variant="primary" onClick={goBack}>
            {session.isAuthenticated ? "Go Back" : "Log In"}
          </BasicButton>
        </CenterInContainer>
      </FloatContainer>
    </BasicPage>
  );
};
