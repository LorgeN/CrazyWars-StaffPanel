import React, { FunctionComponent, useState } from "react";
import AuthenticationService from "../../core/auth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./index.css";
import { FloatContainer } from "../styled";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { useSessionContext } from "../../context/session";
import { useHistory, useLocation } from "react-router-dom";

const LoadingSpinner: FunctionComponent = () => {
  return (
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    >
      <span className="sr-only">Logging in...</span>
    </Spinner>
  );
};

export const LoginForm: FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionContext, updateSessionContext] = useSessionContext();
  const history = useHistory();
  const location = useLocation();

  const handleLogin = () => {
    if (loading) {
      return;
    }

    setErrorMessage("");
    setLoading(true);

    if (!username || !password) {
      setShowError(true);
      setLoading(false);
      setErrorMessage("Please enter username and password!");
      return;
    }

    AuthenticationService.login(username, password, rememberMe)
      .then((user) => {
        setLoading(false);
        updateSessionContext({
          ...sessionContext,
          isAuthenticated: true,
          user: user,
        });

        if (
          !sessionContext.redirectPathOnAuthentication ||
          sessionContext.redirectPathOnAuthentication === location.pathname
        ) {
          history.push("/");
          return;
        }

        history.push(sessionContext.redirectPathOnAuthentication);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setErrorMessage("Invalid username or password!");
        } else {
          setErrorMessage(
            "There was an unexpected error: " +
              error.response.message +
              " (" +
              error.response.status +
              ")"
          );
        }

        setShowError(true);
        setLoading(false);
      });
  };

  return (
    <Container id="login-container" fluid>
      <FloatContainer className="login-row" id="login-form" fluid>
        <p style={{ marginLeft: "5px" }}>
          <b>CrazyWars Staff Panel</b>
        </p>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Control
              type="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formRememberMe">
            <Form.Check
              type="checkbox"
              onClick={() => setRememberMe(!rememberMe)}
              label="Remember Me"
            />
          </Form.Group>
        </Form>

        <Row>
          <Col xs={{ span: 5, offset: 3 }}>
            <Button
              id="login-submit-button"
              variant="primary"
              disabled={loading}
              onClick={(e) => handleLogin()}
            >
              {loading ? <LoadingSpinner /> : "Log In"}
            </Button>
          </Col>
        </Row>
      </FloatContainer>

      <Row className="login-row">
        <Col>
          {errorMessage && showError ? (
            <Alert
              variant="danger"
              onClose={() => setShowError(false)}
              dismissible
            >
              {errorMessage}
            </Alert>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};
