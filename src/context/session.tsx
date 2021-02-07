import { Session, useProviderValue } from "../models/session";
import React, { FunctionComponent, createContext, useContext } from "react";

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
