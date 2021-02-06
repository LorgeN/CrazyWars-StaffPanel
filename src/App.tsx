import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import StartPage from './components/startpage';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Alert variant="success">
            Welcome to this temporary little front page!
            </Alert>

            <Link to="/login" className="nav-link" >
            Log in
            </Link>
          </Route>
            <Route exact path="/login">
              <StartPage />
            </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
