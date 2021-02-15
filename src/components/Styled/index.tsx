import Container from "react-bootstrap/Container";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import React, { FunctionComponent, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Accordion from "react-bootstrap/esm/Accordion";
import { useAccordionToggle } from "react-bootstrap/esm/AccordionToggle";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import "./index.css";

export const titleCase = (str: string): string => {
  const splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
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
      <RightAlignRow noGutters>
        {open ? <ChevronUp {...iconProps} /> : <ChevronDown {...iconProps} />}
      </RightAlignRow>
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

export const FloatContainer = styled(Container)`
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 10;
  background-color: white;
`;

export const SpaceBetweenRow = styled(Row)`
  justify-content: space-between;
`;

export const LeftAlignRow = styled(Row)`
  align-items: flex-start;
  justify-content: flex-start;
`;

export const RightAlignRow = styled(Row)`
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
