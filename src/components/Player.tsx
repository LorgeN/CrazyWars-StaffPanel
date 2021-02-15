import React, { FunctionComponent } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import { Player } from "../core/models/player";
import {
  CenteredRow,
  FloatContainer,
  LeftAlignRow,
  FieldDisplay,
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
        style={{ padding: "20px" }}
        src={player.bodyRender}
        alt="Player skin"
      />
      <Col>
        <h1>{player.username}</h1>
        <FieldDisplay name="Account ID" value={player.id.toString()} line />
        <FieldDisplay name="UUID" value={player.uuid} line />
        <FieldDisplay name="Last Online" value={dateStr} line />
      </Col>
    </LeftAlignRow>
  );
};
