import React, { FunctionComponent, useEffect, useState } from "react";
import { Col, Image, Tab, Tabs } from "react-bootstrap";
import { Player, PlayerPlaytime } from "../core/models/player";
import { MonthPicker, useYearMonth } from "./MonthPicker";
import {
  LeftTopAlignRow,
  formatEnum,
  millisToHour,
  LoadingSpinner,
  CenteredRow,
  SpaceBetweenRow,
} from "./Styled";
import {
  ChangePasswordButton,
  FieldDisplay,
  FieldDisplayAccordian,
} from "./Profile";
import PlayerAPI from "../core/api/player";

export interface PlayerCardProps {
  player: Player;
  children?: React.ReactNode;
}

export interface PlayerProfileCardProps extends PlayerCardProps {
  self?: boolean;
}

export const PlayerProfile: FunctionComponent<PlayerProfileCardProps> = ({
  player,
  children,
  self,
}: PlayerProfileCardProps) => {
  const date = new Date(player.lastOnline.toLocaleString());
  const dateStr = date.toLocaleDateString() + " " + date.toLocaleTimeString();

  return (
    <LeftTopAlignRow>
      <Image
        style={{
          padding: "20px",
        }}
        src={player.bodyRender}
        alt={`${player.username}'s skin`}
      />
      <Col>
        <SpaceBetweenRow style={{ alignItems: "center" }} noGutters>
          <h1>{player.username}</h1>
          {self ? <ChangePasswordButton /> : null}
        </SpaceBetweenRow>

        <FieldDisplay name="Account ID" value={player.id.toString()} line />
        <FieldDisplay name="UUID" value={player.uuid} line />
        <FieldDisplay name="Last Online" value={dateStr} line />
        <FieldDisplayAccordian name="Rank" line>
          <div style={{ fontSize: "14px" }}>
            {Object.entries(player.ranks).map((rank) => (
              <FieldDisplay
                key={rank[0]}
                name={formatEnum(rank[0])}
                value={formatEnum(rank[1])}
                line
              />
            ))}
          </div>
        </FieldDisplayAccordian>
        <PlayerPlaytimeField player={player} />
      </Col>
      {children}
    </LeftTopAlignRow>
  );
};

interface PlayerPlaytimeDisplayProps {
  playtime: PlayerPlaytime;
}

const PlayerPlaytimeDisplay: FunctionComponent<PlayerPlaytimeDisplayProps> = ({
  playtime,
}: PlayerPlaytimeDisplayProps) => {
  if (!playtime.groups.length) {
    return (
      <CenteredRow>
        <p>Wow! No playtime at all!</p>
      </CenteredRow>
    );
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

const PlayerMonthPlaytimeDisplay: FunctionComponent<PlayerCardProps> = ({
  player,
  children,
}: PlayerCardProps) => {
  const [playtime, setPlaytime] = useState<PlayerPlaytime | undefined>(
    undefined
  );
  const yearMonth = useYearMonth();

  useEffect(() => {
    PlayerAPI.getMonthlyPlaytimeById(player.id, yearMonth.year, yearMonth.month)
      .then((playtime) => {
        setPlaytime(playtime);
      })
      .catch((error) => setPlaytime({ groups: [] }));
  }, [player.id, yearMonth.month, yearMonth.year]);

  if (!playtime) {
    return <LoadingSpinner />;
  }

  return <PlayerPlaytimeDisplay playtime={playtime} />;
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
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            {playtime ? (
              <PlayerPlaytimeDisplay playtime={playtime} />
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </Tab>
        <Tab eventKey="monthly" title="Monthly">
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <MonthPicker>
              <PlayerMonthPlaytimeDisplay player={player} />
            </MonthPicker>
          </div>
        </Tab>
        {children}
      </Tabs>
    </FieldDisplayAccordian>
  );
};
