import Container from "react-bootstrap/Container";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FunctionComponent } from "react";

export const FloatContainer = styled(Container)`
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 10;
  background-color: white;
`;

export const CenteredRow = styled(Row)`
  align-items: center;
  justify-content: center;
`;

export interface CenterInContainerProps {
  span?: number;
  children?: React.ReactNode;
}

export const CenterInContainer: FunctionComponent<CenterInContainerProps> = ({
  span = 3,
  children,
}: CenterInContainerProps) => {
  return (
    <Row>
      <Col xs={{ span: span * 2, offset: 6 - span }}>{children}</Col>
    </Row>
  );
};

export const BasicButton = styled(Button)`
  margin-bottom: 5px;
`;
