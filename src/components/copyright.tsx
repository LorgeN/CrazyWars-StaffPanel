import React, { FunctionComponent } from "react";
import styled from "styled-components";

const CopyrightText = styled("p")`
  color: rgb(190, 190, 190);
  margin-bottom: 0px;
`;

export const CopyrightNotice: FunctionComponent = () => {
  return (
    <CopyrightText>
      <small>{"\u00A9"} CrazyWars 2021</small>
    </CopyrightText>
  );
};
