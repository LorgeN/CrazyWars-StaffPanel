import React, { FunctionComponent } from "react";
import Particles from "react-tsparticles";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import logo from "../../static/logo.png";
import "./index.css";
import { CenteredRow } from "../styled";

export const ParticleBackground: FunctionComponent = () => {
  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: {
            value: "#0077ff",
          },
        },
        fpsLimit: 60,
        interactivity: {
          detectsOn: "window",
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 3,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              value_area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export const BasicPage: FunctionComponent = (props) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          zIndex: 10,
        }}
      >
        <Container id="basic-background" fluid>
          <CenteredRow>
            <Image id="basic-logo" src={logo} />
          </CenteredRow>

          <CenteredRow>{props.children}</CenteredRow>
        </Container>
      </div>
      <ParticleBackground />
    </>
  );
};
