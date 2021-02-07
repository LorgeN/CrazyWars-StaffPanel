import React, { FunctionComponent, useState } from "react";
import AuthenticationService from "../../core/auth";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "./index.css";
import { BasicButton, CenterInContainer, FloatContainer } from "../styled";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { useSessionContext } from "../../context/session";
import { useHistory, useLocation } from "react-router-dom";
import { Lock } from "react-bootstrap-icons";

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
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [showError, setShowError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const session = useSessionContext();
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
        session.setUser(user);

        if (
          !session.redirectPath ||
          session.redirectPath === location.pathname
        ) {
          history.push("/");
          return;
        }

        history.push(session.redirectPath as string);
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
        <p className="text-center">
          <Lock color="#0077ff" size={48} />
        </p>

        <p className="text-center">
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

          <Row className="login-row">
            <Form.Group controlId="formRememberMe">
              <Form.Check
                type="checkbox"
                onClick={() => setRememberMe(!rememberMe)}
              />
            </Form.Group>
            <p>Remember me</p>
          </Row>
        </Form>

        <CenterInContainer>
          <BasicButton
            variant="primary"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? <LoadingSpinner /> : "Log In"}
          </BasicButton>
        </CenterInContainer>
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
