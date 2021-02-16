import React, { FunctionComponent, useEffect, useState } from "react";
import PlayerAPI from "../core/api/player";
import { LoadingSpinner } from "../components/Styled";
import { PlayerProfile } from "../components/Player";
import { Breadcrumb } from "react-bootstrap";
import { Dashboard } from "../components/Dashboard";

export const Profile: FunctionComponent = () => {
  const [component, setComponent] = useState<React.ReactNode>(
    <LoadingSpinner />
  );

  useEffect(() => {
    PlayerAPI.getSelf()
      .then((self) => {
        setComponent(<PlayerProfile player={self} self />);
      })
      .catch((error) => {
        setComponent(
          <p>
            <strong>{error.response.status}</strong>
            <br />
            An error occurred!
          </p>
        );
      });
  }, []);

  return (
    <Dashboard>
      <Breadcrumb>
        <Breadcrumb.Item active>Your Profile</Breadcrumb.Item>
      </Breadcrumb>

      {component}
    </Dashboard>
  );
};
