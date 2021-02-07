import React, { FunctionComponent } from "react";
import { BasicPage } from "../../components/background";
import { CenterInContainer, FloatContainer } from "../../components/styled";
import { LogOutButton } from "../../components/logout";

export const Portal: FunctionComponent = () => {
  return (
    <BasicPage>
      <FloatContainer>
        <h3 className="text-center">Congratulations!</h3>
        <p className="text-center">You are logged in!</p>

        <CenterInContainer>
          <LogOutButton />
        </CenterInContainer>
      </FloatContainer>
    </BasicPage>
  );
};
