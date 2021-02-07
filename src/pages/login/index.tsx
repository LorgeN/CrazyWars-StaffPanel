import React, { FunctionComponent } from "react";
import { LoginForm } from "../../components/login";
import { BasicPage } from "../../components/background";

export const StartPage: FunctionComponent = () => {
  return (
    <BasicPage>
      <LoginForm />
    </BasicPage>
  );
};
