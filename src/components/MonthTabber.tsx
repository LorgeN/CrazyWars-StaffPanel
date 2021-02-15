import React, { FunctionComponent, useState } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { CaretLeft, CaretRight } from "react-bootstrap-icons";
import { SpaceBetweenRow } from "./Styled";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export interface MonthPickerProps {
  initialMonth?: number;
  initialYear?: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  children?: React.ReactNode;
}

export const MonthPicker: FunctionComponent<MonthPickerProps> = ({
  initialMonth,
  initialYear,
  onMonthChange,
  onYearChange,
  children,
}: MonthPickerProps) => {
  const nowDate = new Date();
  const [month, setMonth] = useState<number>(
    initialMonth || nowDate.getUTCMonth() + 1
  );
  const [year, setYear] = useState<number>(
    initialYear || nowDate.getUTCFullYear()
  );

  const getTitle = () => {
    return months[month - 1] + " " + year;
  };

  const increaseMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
      return;
    }

    setMonth(month + 1);
  };

  const decreaseMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
      return;
    }

    setMonth(month - 1);
  };

  return (
    <Container>
      <SpaceBetweenRow style={{ height: "50px" }}>
        <Col>
          <Button variant="outline-primary" onClick={decreaseMonth}>
            <CaretLeft size={24} />
            Previous Month
          </Button>
        </Col>
        <Col>
          <h3>
            <strong>{getTitle()}</strong>
          </h3>
        </Col>
        <Col>
          <Button variant="outline-primary" onClick={increaseMonth}>
            Next Month
            <CaretRight size={24} />
          </Button>
        </Col>
      </SpaceBetweenRow>
      {children}
    </Container>
  );
};
