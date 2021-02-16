import Container from "react-bootstrap/Container";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import React, { FunctionComponent } from "react";
import Spinner from "react-bootstrap/Spinner";

export const formatEnum = (str: string): string => {
  const splitStr = str.toLowerCase().split("_");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }

  return splitStr.join(" ");
};

export const millisToHour = (millis: number): number => {
  return Math.floor(millis / 3600000);
};

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

export const FloatContainer = styled(Container)`
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 10;
  background-color: white;
`;

export const SpaceBetweenRow = styled(Row)`
  justify-content: space-between;
`;

export const LeftCenterAlignRow = styled(Row)`
  align-items: center;
  justify-content: flex-start;
`;

export const LeftTopAlignRow = styled(Row)`
  align-items: flex-start;
  justify-content: flex-start;
`;

export const RightTopAlignRow = styled(Row)`
  align-items: flex-end;
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
