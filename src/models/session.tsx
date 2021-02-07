import { User } from "./user";

export interface Session {
  isAuthenticated?: boolean;
  user?: User | null;
  redirectPathOnAuthentication?: string;
}

export const initialSession: Session = {};
