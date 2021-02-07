import React, { FunctionComponent, useEffect } from "react";
import { LoginForm } from "../../components/login";
import { BasicPage } from "../../components/background";
import { useSessionContext } from "../../context/session";
import { Redirect, useHistory } from "react-router-dom";
import AuthenticationService from "../../core/auth";

export const StartPage: FunctionComponent = () => {
  const [sessionContext, updateSessionContext] = useSessionContext();

  useEffect(() => {
    const currentUser = AuthenticationService.getCurrentUser();
    if (!currentUser) {
      return;
    }

    updateSessionContext({
      ...sessionContext,
      isAuthenticated: true,
      user: currentUser,
    });
  });

  if (sessionContext.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <BasicPage>
      <LoginForm />
    </BasicPage>
  );
};
