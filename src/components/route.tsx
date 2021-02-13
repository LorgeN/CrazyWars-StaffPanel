import React, { FunctionComponent } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router";

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
  redirectPathOnAuthentication: string;
  setRedirectPathOnAuthentication: (path: string) => void;
}

export const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = (
  props
) => {
  const currentLocation = useLocation();

  let redirectPath = props.redirectPathOnAuthentication;
  if (!props.isAuthenticated) {
    const pathname = currentLocation.pathname;
    props.setRedirectPathOnAuthentication(pathname);
    redirectPath = props.authenticationPath;
  }

  if (redirectPath !== currentLocation.pathname) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;
