import React, { FunctionComponent } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
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
    authenticationPath: "/",
    redirectPathOnAuthentication:
      sessionContext.redirectPathOnAuthentication || "",
    setRedirectPathOnAuthentication,
  };

  return (
    <Router>
      <Switch>
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          path="/panel"
          component={Portal}
          exact
        />
        <Route path="/" component={StartPage} exact />
        <Route path="/" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
