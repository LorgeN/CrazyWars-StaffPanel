import { User } from "./user";
import AuthenticationService from "../core/auth";
import { useState } from "react";

export interface Session {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  redirectPath?: string;
  setRedirectPath: (path: string | undefined) => void;
}

export const useProviderValue = (): Session => {
  const [user, setUser] = useState<User | null>(
    AuthenticationService.getCurrentUser()
  );
  const [redirectPath, setRedirectPath] = useState<string | undefined>(
    undefined
  );

  let isAuthenticated = !!user;
  return { isAuthenticated, user, redirectPath, setUser, setRedirectPath };
};
