import { Rank, UserAccessToken } from "./user";

export interface Session {
  isAuthenticated: boolean;
  user: UserAccessToken | null;
  setUser: (user: UserAccessToken | null) => void;
  redirectPath?: string;
  setRedirectPath: (path: string | undefined) => void;
  hasAccess: (claim: Rank) => boolean;
}
