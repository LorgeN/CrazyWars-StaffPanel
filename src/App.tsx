import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StartPage } from "./pages/Login";
import { Portal } from "./pages/Portal";
import { NotFound } from "./pages/NotFound";
import { Profile } from "./pages/Profile";
import { Punishments } from "./pages/Punishments";
import { Players, PlayerView } from "./pages/Players";
import ProtectedRoute, { ProtectedRouteProps } from "./components/Route";
import { useSessionContext } from "./context/session";

const App: FunctionComponent = () => {
  const session = useSessionContext();

  const protectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: session.isAuthenticated,
    authenticationPath: "/login",
    redirectPathOnAuthentication: session.redirectPath || "/",
    setRedirectPathOnAuthentication: session.setRedirectPath,
  };

  return (
    <Router>
      <Switch>
        <ProtectedRoute
          {...protectedRouteProps}
          path="/"
          component={Portal}
          exact
        />
        <ProtectedRoute
          {...protectedRouteProps}
          path="/profile"
          component={Profile}
          exact
        />
        <ProtectedRoute
          {...protectedRouteProps}
          path="/players"
          component={Players}
          exact
        />
        <ProtectedRoute
          {...protectedRouteProps}
          path="/players/:id"
          component={PlayerView}
          exact
        />
        <ProtectedRoute
          {...protectedRouteProps}
          path="/punishments"
          component={Punishments}
          exact
        />
        <Route path="/login" component={StartPage} exact />
        <Route path="/" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
