import React, { FunctionComponent, useEffect, useState } from "react";
import { Breadcrumb, FormControl, InputGroup, Table } from "react-bootstrap";
import { Dashboard } from "../../components/Dashboard";
import {
  CenteredRow,
  LoadingSpinner,
  SpaceBetweenRow,
  StyledPagination,
} from "../../components/Styled";
import { Player } from "../../core/models/player";
import PlayerAPI from "../../core/api/player";
import "./index.css";
import { useHistory, useParams } from "react-router-dom";
import { PlayerProfile } from "../../components/Player";
import { Search } from "react-bootstrap-icons";

interface PlayerViewParams {
  id: string;
}

export const PlayerView: FunctionComponent = () => {
  const { id } = useParams<PlayerViewParams>();
  const [player, setPlayer] = useState<Player | undefined>(undefined);

  useEffect(() => {
    PlayerAPI.getById(+id).then((fetched) => {
      setPlayer(fetched);
    });
  }, [id]);

  return (
    <Dashboard>
      <Breadcrumb>
        <Breadcrumb.Item href="/players">Players</Breadcrumb.Item>
        <Breadcrumb.Item active>
          {player ? player.username : "?"}
        </Breadcrumb.Item>
      </Breadcrumb>

      {player ? <PlayerProfile player={player} /> : <LoadingSpinner />}
    </Dashboard>
  );
};

const PlayerTable: FunctionComponent = () => {
  const [players, setPlayers] = useState<Player[] | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(20);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    PlayerAPI.getAllPlayers(page, perPage, search).then((players) => {
      setPlayers(players.players);
      setMaxPage(players.pages);
      setPage(Math.min(maxPage, page));
    });
  }, [page, maxPage, perPage, search]);

  const makePlayerComponents = () => {
    if (!players) {
      return null;
    }

    return players.map((player) => {
      const date = new Date(player.lastOnline.toLocaleString());
      const dateStr =
        date.toLocaleDateString() + " " + date.toLocaleTimeString();

      return (
        <tr
          key={player.id}
          onClick={() => history.push("/players/" + player.id)}
        >
          <td>{player.id}</td>
          <td>{player.username}</td>
          <td>{player.uuid}</td>
          <td>{dateStr}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <SpaceBetweenRow>
        <InputGroup className="m-3 w-25">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">
              <Search size={16} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="m-3" style={{ width: "175px" }}>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Per page</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            id="select-per-page"
            defaultValue="20"
            aria-label="Per page"
            aria-describedby="basic-addon1"
            as="select"
            onChange={(e) => setPerPage(+e.target.value)}
          >
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
            <option>50</option>
          </FormControl>
        </InputGroup>
      </SpaceBetweenRow>

      {!players ? (
        <CenteredRow>
          <LoadingSpinner />
        </CenteredRow>
      ) : (
        <Table striped bordered hover style={{ fontSize: "14px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>UUID</th>
              <th>Last Online</th>
            </tr>
          </thead>
          <tbody>{makePlayerComponents()}</tbody>
        </Table>
      )}

      <CenteredRow>
        <StyledPagination page={page} setPage={setPage} pages={maxPage} />
      </CenteredRow>
    </>
  );
};

export const Players: FunctionComponent = () => {
  return (
    <Dashboard>
      <Breadcrumb>
        <Breadcrumb.Item active>Players</Breadcrumb.Item>
      </Breadcrumb>

      <PlayerTable />
    </Dashboard>
  );
};
