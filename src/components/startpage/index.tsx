import React, { Component } from "react";
import LoginForm from "../login";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../static/logo.png";
import "./index.css";
import ParticleBackground from "./background";

class StartPage extends Component {
  render() {
    return (
      <>
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
          }}
        >
          <Container id="start-background" fluid>
            <Row>
              <Col xs={{ offset: 5 }}>
                <Image id="start-logo" src={logo} />
              </Col>
            </Row>

            <Row>
              <Col xs={{ span: 2, offset: 5 }}>
                <LoginForm />
              </Col>
            </Row>
          </Container>
        </div>
        <ParticleBackground />
      </>
    );
  }
}

export default StartPage;
