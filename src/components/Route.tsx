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

  if (!props.isAuthenticated) {
    const pathname = currentLocation.pathname;
    props.setRedirectPathOnAuthentication(pathname);

    const renderComponent = () => (
      <Redirect to={{ pathname: props.authenticationPath }} />
    );
    return <Route {...props} component={renderComponent} render={undefined} />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
