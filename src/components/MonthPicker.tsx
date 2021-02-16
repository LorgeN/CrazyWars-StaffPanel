import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState,
} from "react";
import { Button, Container } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { CenteredRow } from "./Styled";

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

export interface YearMonth {
  year: number;
  month: number;
}

export interface MonthPickerProps {
  initialMonth?: number;
  initialYear?: number;
  children?: React.ReactNode;
}

const YearMonthContext = createContext<YearMonth | undefined>(undefined);
YearMonthContext.displayName = "YearMonthContext";

export const useYearMonth = (): YearMonth => {
  const context = useContext(YearMonthContext);
  if (context === undefined) {
    throw new Error("useYearMonth must be called within a MonthPicker!");
  }

  return context;
};

export const MonthPicker: FunctionComponent<MonthPickerProps> = ({
  initialMonth,
  initialYear,
  children,
}: MonthPickerProps) => {
  const nowDate = new Date();
  const [month, setMonth] = useState<number>(
    initialMonth || nowDate.getUTCMonth() + 1
  );
  const [year, setYear] = useState<number>(
    initialYear || nowDate.getUTCFullYear()
  );

  const context: YearMonth = {
    year: year,
    month: month,
  };

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
    <YearMonthContext.Provider value={context}>
      <Container fluid>
        <CenteredRow style={{ height: "50px", alignItems: "center" }} noGutters>
          <Button variant="primary" onClick={decreaseMonth}>
            <ChevronLeft size={24} />
          </Button>
          <h3 style={{ margin: "10px", width: "250px", textAlign: "center" }}>
            <strong>{getTitle()}</strong>
          </h3>
          <Button variant="primary" onClick={increaseMonth}>
            <ChevronRight size={24} />
          </Button>
        </CenteredRow>
        {children}
      </Container>
    </YearMonthContext.Provider>
  );
};
