import Container from "react-bootstrap/Container";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import React, { FunctionComponent, useState } from "react";
import Accordion from "react-bootstrap/esm/Accordion";
import { useAccordionToggle } from "react-bootstrap/esm/AccordionToggle";
import { ChevronDown, ChevronUp, PencilSquare } from "react-bootstrap-icons";
import "./index.css";
import { RightTopAlignRow, SpaceBetweenRow } from "../Styled";
import { Alert, Button, Form } from "react-bootstrap";
import AuthenticationService from "../../core/auth";

export const ChangePasswordButton: FunctionComponent = () => {
  const [show, setShow] = useState(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);
  const [error, setError] = useState<React.ReactNode | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setValidated(true);

    e.preventDefault();

    const form = e.target as HTMLFormElement;
    if (!form.checkValidity() || newPassword !== confirmPassword) {
      e.stopPropagation();
      return;
    }

    AuthenticationService.changePassword(oldPassword, newPassword)
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        setValidated(false);
        if (error.response.status === 401) {
          setError(<Alert variant="warning">Wrong password!</Alert>);
        } else {
          setError(<Alert variant="warning">An error occurred</Alert>);
        }
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <PencilSquare size={30} style={{ paddingRight: "10px" }} />
        Change password
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="change-password-old-password">
              <Form.Control
                type="password"
                placeholder="Old Password"
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="change-password-new-password-1">
              <Form.Control
                type="password"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                isInvalid={validated && newPassword !== confirmPassword}
                required
              />
            </Form.Group>
            <Form.Group controlId="change-password-new-password-2">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                isInvalid={validated && newPassword !== confirmPassword}
                required
              />
              <Form.Control.Feedback type="invalid">
                {newPassword === confirmPassword
                  ? null
                  : "Passwords do not match!"}
              </Form.Control.Feedback>
            </Form.Group>

            {error}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Confirm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export interface FieldDisplayProps {
  name: string;
  value?: string;
  line?: boolean;
  children?: React.ReactNode;
}

export const FieldDisplay: FunctionComponent<FieldDisplayProps> = ({
  name,
  value,
  line,
  children,
}: FieldDisplayProps) => {
  return (
    <>
      <Row noGutters>
        <Col>
          <p style={{ margin: "0.5em", color: "rgb(100, 100, 100)" }}>
            <strong>{name}</strong>
          </p>
        </Col>
        <Col>
          {value ? (
            <p style={{ margin: "0.5em", color: "rgb(50, 50, 50)" }}>{value}</p>
          ) : null}
          {children}
        </Col>
      </Row>
      {line ? <hr style={{ margin: "0" }} /> : null}
    </>
  );
};

interface FieldDisplayAccordianToggleProps extends FieldDisplayProps {
  eventKey: string;
}

const FieldDisplayAccoridanToggle: FunctionComponent<FieldDisplayAccordianToggleProps> = (
  props: FieldDisplayAccordianToggleProps
) => {
  const [open, setOpen] = useState<React.ReactNode>(false);
  const decoratedOnClick = useAccordionToggle(props.eventKey, (e) =>
    setOpen(!open)
  );

  const iconProps = {
    size: 24,
    style: {
      color: "gray",
      display: "inline",
      margin: "0.5em",
    },
  };

  const makeValueComponent = () => {
    if (props.value) {
      return (
        <SpaceBetweenRow noGutters>
          <p style={{ margin: "0.5em", color: "rgb(50, 50, 50)" }}>
            {props.value}
          </p>

          {open ? <ChevronUp {...iconProps} /> : <ChevronDown {...iconProps} />}
        </SpaceBetweenRow>
      );
    }

    return (
      <RightTopAlignRow noGutters>
        {open ? <ChevronUp {...iconProps} /> : <ChevronDown {...iconProps} />}
      </RightTopAlignRow>
    );
  };

  return (
    <>
      <Row
        className={"styled-field-display-accordian" + (open ? " shown" : "")}
        onClick={decoratedOnClick}
        noGutters
      >
        <Col>
          <p style={{ margin: "0.5em", color: "rgb(100, 100, 100)" }}>
            <strong>{props.name}</strong>
          </p>
        </Col>
        <Col>{makeValueComponent()}</Col>
      </Row>
      {props.line ? <hr style={{ margin: "0" }} /> : null}
    </>
  );
};

const CollapseContainer = styled(Container)`
  width: 100%;
  max-width: 100%;
  padding: 0px;
  border-radius: 3px;
  border-style: solid solid solid solid;
  border-width: 1px;
  border-color: #dddddd;
`;

export interface FieldDisplayAccordianProps {
  name: string;
  line: boolean;
  value?: string;
  children: React.ReactNode;
}

export const FieldDisplayAccordian: FunctionComponent<FieldDisplayAccordianProps> = ({
  name,
  line,
  value,
  children,
}: FieldDisplayAccordianProps) => {
  return (
    <Accordion>
      <FieldDisplayAccoridanToggle
        name={name}
        value={value}
        line={line}
        eventKey="0"
      />
      <Accordion.Collapse eventKey="0">
        <CollapseContainer>{children}</CollapseContainer>
      </Accordion.Collapse>
    </Accordion>
  );
};
