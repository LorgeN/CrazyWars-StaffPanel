import { Rank } from "./user";

export interface Player {
  id: number;
  uuid: string;
  username: string;
  avatar: string;
  bodyRender: string;
  lastOnline: Date;
  ranks: Record<string, Rank>;
}

export interface GroupMonthPlaytime extends GroupPlayTime {
  year: number;
  month: number;
}

export interface GroupPlayTime {
  id: string;
  name: string;
  logins: number;
  playtime: number;
}
