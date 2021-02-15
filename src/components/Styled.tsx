import Container from "react-bootstrap/Container";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import React, { FunctionComponent } from "react";
import Spinner from "react-bootstrap/Spinner";

export const LoadingSpinner: FunctionComponent = (props) => {
  return (
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    >
      <span className="sr-only">{props.children}</span>
    </Spinner>
  );
};

export interface FieldDisplayProps {
  name: string;
  value: string;
  line: boolean;
}

export const FieldDisplay: FunctionComponent<FieldDisplayProps> = ({
  name,
  value,
  line,
}: FieldDisplayProps) => {
  return (
    <>
      <Row>
        <Col>
          <p style={{ margin: "0.5em", color: "rgb(100, 100, 100)" }}>
            <strong>{name}</strong>
          </p>
        </Col>
        <Col>
          <p style={{ margin: "0.5em", color: "rgb(50, 50, 50)" }}>{value}</p>
        </Col>
      </Row>
      {line ? <hr style={{ margin: "0" }} /> : null}
    </>
  );
};

export const FloatContainer = styled(Container)`
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 10;
  background-color: white;
`;

export const LeftAlignRow = styled(Row)`
  align-items: center;
  justify-content: flex-start;
`;

export const RightAlignRow = styled(Row)`
  align-items: center;
  justify-content: flex-end;
`;

export const CenteredRow = styled(Row)`
  align-items: center;
  justify-content: center;
`;

export interface CenterInContainerProps {
  span?: number;
  children?: React.ReactNode;
}

export const BasicButton = styled(Button)`
  margin-bottom: 5px;
`;
