import Container from "react-bootstrap/Container";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import React, { FunctionComponent } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Pagination } from "react-bootstrap";

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

export interface StyledPaginationProps {
  page: number;
  pages: number;
  setPage: (page: number) => void;
}

export const StyledPagination: FunctionComponent<StyledPaginationProps> = ({
  page,
  pages,
  setPage,
}: StyledPaginationProps) => {
  const makeFarLeftComponents = () => {
    return (
      <>
        <Pagination.First onClick={() => setPage(1)} disabled={page <= 1} />
        <Pagination.Prev onClick={() => setPage(1)} disabled={page <= 1} />
      </>
    );
  };

  const makeFarRightComponents = () => {
    return (
      <>
        <Pagination.Next
          onClick={() => setPage(pages)}
          disabled={page >= pages}
        />
        <Pagination.Last
          onClick={() => setPage(pages)}
          disabled={page >= pages}
        />
      </>
    );
  };

  const makeComponent = (num: number) => {
    return (
      <Pagination.Item
        key={num}
        onClick={() => setPage(num)}
        active={num === page}
      >
        {num}
      </Pagination.Item>
    );
  };

  const makeCenterComponents = () => {
    const items = [];
    if (page <= 5) {
      for (let num = 1; num <= Math.min(9, pages); num++) {
        items.push(makeComponent(num));
      }
    } else if (page >= pages - 5) {
      for (let num = Math.max(1, pages - 9); num <= page; num++) {
        items.push(makeComponent(num));
      }
    } else {
      for (let num = page - 4; num <= page + 4; num++) {
        items.push(makeComponent(num));
      }
    }

    return items;
  };

  return (
    <Pagination>
      {makeFarLeftComponents()}
      {makeCenterComponents()}
      {makeFarRightComponents()}
    </Pagination>
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
