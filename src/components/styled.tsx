import Container from "react-bootstrap/Container";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const FloatContainer = styled(Container)`
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 10;
  background-color: white;
`;

export const CenterInContainer = (props: any) => {
  return (
    <Row>
      <Col xs={{ span: 6, offset: 3 }}>{props.children}</Col>
    </Row>
  );
};

export const BasicButton = styled(Button)`
  width: 100%;
  margin-bottom: 5px;
`;
