import { Rank } from "./user";

export interface Player {
    id: number;
    uuid: string;
    username: string;
    avatar: string;
    bodyRender: string;
    lastOnline: Date;
    ranks: Record<string, Rank>
}