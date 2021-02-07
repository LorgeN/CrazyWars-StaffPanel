import React, { FunctionComponent } from "react";
import { LoginForm } from "../../components/login";
import { BasicPage } from "../../components/background";
import { useSessionContext } from "../../context/session";
import { Redirect } from "react-router-dom";

export const StartPage: FunctionComponent = () => {
  const session = useSessionContext();

  if (session.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <BasicPage>
      <LoginForm />
    </BasicPage>
  );
};
