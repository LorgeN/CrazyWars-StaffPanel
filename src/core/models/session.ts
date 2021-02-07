import { User } from "./user";
import AuthenticationService from "../auth";
export interface Session {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  redirectPath?: string;
  setRedirectPath: (path: string | undefined) => void;
}
