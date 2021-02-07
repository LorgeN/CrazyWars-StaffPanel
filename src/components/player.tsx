import React, { FunctionComponent } from "react";
import { Player } from "../core/models/player";
import { CenteredRow, FloatContainer } from "./styled";

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
