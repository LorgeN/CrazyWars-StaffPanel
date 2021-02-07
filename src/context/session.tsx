import { createContext, useContext, useEffect, useState } from "react";
import { initialSession, Session } from "../models/session";
import React, { FunctionComponent } from "react";

export const SessionContext = createContext<
  [Session, (session: Session) => void]
>([initialSession, () => {}]);
export const useSessionContext = () => useContext(SessionContext);

export const SessionContextProvider: FunctionComponent = (props) => {
  const [sessionState, setSessionState] = useState(initialSession);
  const defaultSessionContext: [Session, typeof setSessionState] = [
    sessionState,
    setSessionState,
  ];

  return (
    <SessionContext.Provider value={defaultSessionContext}>
      {props.children}
    </SessionContext.Provider>
  );
};
