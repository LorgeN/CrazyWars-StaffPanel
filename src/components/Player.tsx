import React, { FunctionComponent } from "react";
import { Col, Container, Image, Tab, Tabs } from "react-bootstrap";
import { Player } from "../core/models/player";
import { MonthPicker } from "./MonthTabber";
import {
  CenteredRow,
  FloatContainer,
  LeftAlignRow,
  FieldDisplay,
  FieldDisplayAccordian,
  titleCase,
} from "./Styled";

export type PlayerCardProps = {
  player: Player;
  children?: React.ReactNode;
};

export const SimplePlayerCard: FunctionComponent<PlayerCardProps> = ({
  player,
  children,
}: PlayerCardProps) => {
  return (
    <FloatContainer>
      <CenteredRow>
        <p>
          <b>{player.username}</b>
        </p>
      </CenteredRow>
      {children}
    </FloatContainer>
  );
};

export const FullPlayerCard: FunctionComponent<PlayerCardProps> = ({
  player,
  children,
}: PlayerCardProps) => {
  const date = new Date(player.lastOnline.toLocaleString());
  const dateStr = date.toLocaleDateString() + " " + date.toLocaleTimeString();

  return (
    <LeftAlignRow>
      <Image
        style={{
          padding: "20px",
        }}
        src={player.bodyRender}
        alt="Player skin"
      />
      <Col>
        <h1>{player.username}</h1>
        <FieldDisplay name="Account ID" value={player.id.toString()} line />
        <FieldDisplay name="UUID" value={player.uuid} line />
        <FieldDisplay name="Last Online" value={dateStr} line />
        <FieldDisplayAccordian name="Rank" line>
          {Object.entries(player.ranks).map((rank) => (
            <FieldDisplay
              key={rank[0]}
              name={titleCase(rank[0])}
              value={titleCase(rank[1])}
              line
            />
          ))}
        </FieldDisplayAccordian>
        <FieldDisplayAccordian name="Playtime" value="0h" line>
          <Tabs defaultActiveKey="lifetime" id="playtime-tab">
            <Tab eventKey="lifetime" title="Lifetime">
              <Container style={{ margin: "10px" }} fluid>
                <p>Lifetime playtime</p>
              </Container>
            </Tab>
            <Tab eventKey="monthly" title="Monthly">
              <Container style={{ margin: "10px" }} fluid>
                <MonthPicker
                  onMonthChange={(month) => console.log(month)}
                  onYearChange={(year) => console.log(year)}
                >
                  <p>Monthly playtime</p>
                </MonthPicker>
              </Container>
            </Tab>
          </Tabs>
        </FieldDisplayAccordian>
      </Col>
      {children}
    </LeftAlignRow>
  );
};
