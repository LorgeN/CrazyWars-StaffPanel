import React, { FunctionComponent } from "react";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import { BasicPage } from "../../components/background";
import { FloatContainer, CenterInContainer } from "../../components/styled";
import "./index.css";

export const NotFound: FunctionComponent = () => {
  const history = useHistory();

  return (
    <BasicPage>
      <FloatContainer>
        <br />
        <h1 className="text-center">404</h1>
        <p className="text-center">Page not found!</p>

        <CenterInContainer>
          <Button
            id="notfound-redirect-button"
            variant="primary"
            onClick={() => history.push("/")}
          >
            Log In
          </Button>
        </CenterInContainer>
      </FloatContainer>
    </BasicPage>
  );
};
