import React, { Component } from "react";
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

type LoginState = {
  username: string;
  password: string;
  message: string;
  show_warn: boolean;
  loading: boolean;
};

class LoadingSpinner extends Component {
  render() {
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
  }
}

class LoginForm extends Component {
  state: LoginState = {
    username: "",
    password: "",
    message: "",
    show_warn: false,
    loading: false,
  };

  handleUsernameChange(event: any) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event: any) {
    this.setState({ password: event.target.value });
  }

  warn(message: string) {
    this.setState({
      message: message,
      show_warn: true,
    });
  }

  handleLogin() {
    if (this.state.loading) {
      return;
    }

    this.setState({ message: "", loading: true });

    if (!this.state.username || !this.state.password) {
      this.setState({
        message: "Please enter username and password!",
        show_warn: true,
        loading: false,
      });
      return;
    }

    AuthenticationService.login(
      this.state.username,
      this.state.password
    ).then((data) => console.log(data));
  }

  render() {
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
                onChange={(e) => this.handleUsernameChange(e)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => this.handlePasswordChange(e)}
              />
            </Form.Group>
          </Form>

          <Row>
            <Col xs={{ span: 5, offset: 3 }}>
              <Button
                id="login-submit-button"
                variant="primary"
                disabled={this.state.loading}
                onClick={(e) => this.handleLogin()}
              >
                {this.state.loading ? <LoadingSpinner /> : "Log In"}
              </Button>
            </Col>
          </Row>
        </FloatContainer>

        <Row className="login-row">
          <Col>
            {this.state.message && this.state.show_warn ? (
              <Alert
                variant="danger"
                onClose={() => this.setState({ show_warn: false })}
                dismissible
              >
                {this.state.message}
              </Alert>
            ) : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LoginForm;
