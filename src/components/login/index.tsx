import React, { FunctionComponent, useState } from "react";
import AuthenticationService from "../../core/auth";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "./index.css";
import {
  BasicButton,
  CenteredRow,
  FloatContainer,
  LoadingSpinner,
} from "../styled";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSessionContext } from "../../context/session";
import { useHistory, useLocation } from "react-router-dom";
import { Lock } from "react-bootstrap-icons";
import { CopyrightNotice } from "../copyright";

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

  const onKeyPress = (e: any) => {
    if (e.code !== "Enter") {
      return;
    }

    handleLogin();
  };

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
              onKeyPress={onKeyPress}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={onKeyPress}
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

        <CenteredRow>
          <BasicButton
            variant="primary"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? <LoadingSpinner /> : "Log In"}
          </BasicButton>
        </CenteredRow>

        <CenteredRow>
          <CopyrightNotice />
        </CenteredRow>
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
