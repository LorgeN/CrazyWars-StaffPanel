export interface User {
    readonly token: string,
    readonly type: string,
    readonly id: number,
    readonly username: string,
    readonly roles: ReadonlyArray<string>
}

export enum Rank {
    Owner = "OWNER",
    Manager = "MANAGER",
    Developer = "DEVELOPER",
    Administrator = "ADMINISTRATOR",
    Sr_Mod = "SR_MOD",
    Mod = "MOD",
    Helper = "HELPER",
}

export const ALL_RANKS = [
    Rank.Owner,
    Rank.Manager,
    Rank.Developer,
    Rank.Administrator,
    Rank.Sr_Mod,
    Rank.Mod,
    Rank.Helper
]