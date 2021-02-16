import { Rank } from "./user";

export interface Player {
  readonly id: number;
  readonly uuid: string;
  readonly username: string;
  readonly avatar: string;
  readonly bodyRender: string;
  readonly lastOnline: Date;
  readonly ranks: Record<string, Rank>;
  readonly panel: boolean;
}

export interface PlayerList {
  readonly page: number;
  readonly perPage: number;
  readonly pages: number;
  readonly players: Player[];
}

export interface GroupPlayTime {
  readonly id: string;
  readonly name: string;
  readonly logins: number;
  readonly playtime: number;
}

export interface PlayerPlaytime {
  readonly groups: GroupPlayTime[];
}
