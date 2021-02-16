import React, { FunctionComponent, useEffect, useState } from "react";
import { Col, Container, Image, Tab, Tabs } from "react-bootstrap";
import { Player, PlayerPlaytime } from "../core/models/player";
import { MonthPicker } from "./MonthTabber";
import {
  CenteredRow,
  FloatContainer,
  LeftAlignRow,
  FieldDisplay,
  FieldDisplayAccordian,
  formatEnum,
  millisToHour,
} from "./Styled";
import PlayerAPI from "../core/api/player";

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
              name={formatEnum(rank[0])}
              value={formatEnum(rank[1])}
              line
            />
          ))}
        </FieldDisplayAccordian>
        <PlayerPlaytimeField player={player} />
      </Col>
      {children}
    </LeftAlignRow>
  );
};

interface PlayerPlaytimeDisplayProps {
  playtime: PlayerPlaytime;
}

const PlayerPlaytimeDisplay: FunctionComponent<PlayerPlaytimeDisplayProps> = ({
  playtime,
}: PlayerPlaytimeDisplayProps) => {
  if (!playtime.groups.length) {
    return <p>Wow! No playtime at all!</p>;
  }

  return (
    <>
      {playtime.groups.map((group) => (
        <FieldDisplay
          key={group.id}
          name={group.name}
          value={millisToHour(group.playtime) + "h"}
        />
      ))}
    </>
  );
};

export const PlayerPlaytimeField: FunctionComponent<PlayerCardProps> = ({
  player,
  children,
}: PlayerCardProps) => {
  const [playtime, setPlaytime] = useState<PlayerPlaytime | undefined>(
    undefined
  );

  useEffect(() => {
    PlayerAPI.getPlaytimeById(player.id)
      .then((playtime) => {
        setPlaytime(playtime);
      })
      .catch((error) => setPlaytime({ groups: [] }));
  }, [player.id]);

  const computeHourCount = () => {
    if (!playtime) {
      return "Loading...";
    }

    const global = playtime.groups.filter((group) => group.id === "GLOBAL");
    if (!global.length) {
      return "0h";
    }

    return millisToHour(global[0].playtime) + "h";
  };

  return (
    <FieldDisplayAccordian name="Playtime" value={computeHourCount()} line>
      <Tabs defaultActiveKey="lifetime" id="playtime-tab">
        <Tab eventKey="lifetime" title="Lifetime">
          <Container style={{ margin: "10px" }} fluid>
            {playtime ? <PlayerPlaytimeDisplay playtime={playtime} /> : null}
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
  );
};
