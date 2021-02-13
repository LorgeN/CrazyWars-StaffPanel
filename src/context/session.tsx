import { Session } from "../core/models/session";
import React, {
  FunctionComponent,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import AuthenticationService from "../core/auth";
import { Rank, UserAccessToken } from "../core/models/user";

export const useProviderValue = (): Session => {
  const [user, setUser] = useState<UserAccessToken | null>(null);
  const [redirectPath, setRedirectPath] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (user || !AuthenticationService.isLoggedIn()) {
      return;
    }

    AuthenticationService.getUserAccess(true).then((user) => setUser(user));
  });

  const isAuthenticated = !!user;
  const hasAccess = (claim: Rank) => {
    return !!user && user.claims.indexOf(claim) > -1;
  };

  return {
    isAuthenticated,
    user,
    redirectPath,
    setUser,
    setRedirectPath,
    hasAccess,
  };
};

const SessionContext = createContext<Session | undefined>(undefined);
SessionContext.displayName = "SessionContext";

export const SessionContextProvider: FunctionComponent = (props: any) => {
  const value = useProviderValue();
  return <SessionContext.Provider value={value} {...props} />;
};

export const useSessionContext = (): Session => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSessionContext must be called within a provider!");
  }

  return context;
};
