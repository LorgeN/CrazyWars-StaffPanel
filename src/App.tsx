import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StartPage } from "./pages/login";
import { Portal } from "./pages/portal";
import { NotFound } from "./pages/notfound";
import ProtectedRoute, { ProtectedRouteProps } from "./components/route";
import { useSessionContext } from "./context/session";

const App: FunctionComponent = () => {
  const session = useSessionContext();

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: session.isAuthenticated,
    authenticationPath: "/login",
    redirectPathOnAuthentication: session.redirectPath || "/",
    setRedirectPathOnAuthentication: session.setRedirectPath,
  };

  console.log(session);

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
