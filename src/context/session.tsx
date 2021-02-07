import { Session } from "../core/models/session";
import React, {
  FunctionComponent,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import AuthenticationService from "../core/auth";
import { User } from "../core/models/user";

export const useProviderValue = (): Session => {
  const [user, setUser] = useState<User | null>(
    AuthenticationService.getCurrentUser()
  );
  const [redirectPath, setRedirectPath] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (user || !AuthenticationService.getStoredToken()) {
      return;
    }

    AuthenticationService.updateUser().then((user) => setUser(user));
  });

  let isAuthenticated = !!user;
  return { isAuthenticated, user, redirectPath, setUser, setRedirectPath };
};

const SessionContext = createContext<Session | undefined>(undefined);
SessionContext.displayName = "SessionContext";

export const SessionContextProvider: FunctionComponent = (props: any) => {
  const value = useProviderValue();
  return <SessionContext.Provider value={value} {...props} />;
};

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSessionContext must be called within a provider!");
  }

  return context;
};
