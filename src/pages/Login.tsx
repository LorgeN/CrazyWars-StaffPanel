import React, { FunctionComponent } from "react";
import { LoginForm } from "../components/LogInForm";
import { BasicPage } from "../components/Background";
import { useSessionContext } from "../context/session";
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
