import React, { FunctionComponent } from "react";
import { Server } from "../../models/server";

export type ServerProps = {
  server: Server;
};

export const ServerDisplay: FunctionComponent<ServerProps> = ({
  server,
}: ServerProps) => {
  return <p>server.externalName</p>;
};
