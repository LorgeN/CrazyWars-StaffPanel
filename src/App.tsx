import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StartPage } from "./pages/login";
import { Portal } from "./pages/portal";
import { NotFound } from "./pages/notfound";
import ProtectedRoute, { ProtectedRouteProps } from "./components/route";
import { useSessionContext } from "./context/session";

const App: FunctionComponent = () => {
  const [sessionContext, updateSessionContext] = useSessionContext();

  const setRedirectPathOnAuthentication = (path: string) => {
    updateSessionContext({
      ...sessionContext,
      redirectPathOnAuthentication: path,
    });
  };

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!sessionContext.isAuthenticated,
    authenticationPath: "/login",
    redirectPathOnAuthentication:
      sessionContext.redirectPathOnAuthentication || "",
    setRedirectPathOnAuthentication,
  };

  return (
    <Router>
      <Switch>
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          path="/"
          component={Portal}
          exact
        />
        <Route path="/login" component={StartPage} exact />
        <Route path="/" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
