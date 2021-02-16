import { client } from "../client";
import { Player, PlayerList, PlayerPlaytime } from "../models/player";

class PlayerAPI {
  async getSelf(): Promise<Player> {
    const response = await client.get("/player/self");
    return response.data;
  }

  async getById(id: number): Promise<Player> {
    const response = await client.get(`/player/id/${id}`);
    return response.data;
  }

  async getByUUID(uuid: number): Promise<Player> {
    const response = await client.get(`/player/uuid/${uuid}`);
    return response.data;
  }

  async getPlaytimeById(id: number): Promise<PlayerPlaytime> {
    const response = await client.get(`/player/playtime/${id}`);
    return response.data;
  }

  async getMonthlyPlaytimeById(
    id: number,
    year: number,
    month: number
  ): Promise<PlayerPlaytime> {
    const response = await client.get(
      `/player/playtime/${id}/${year}/${month}`
    );
    return response.data;
  }

  async getAllPlayers(
    page: number,
    perPage = 50,
    search?: string
  ): Promise<PlayerList> {
    let response;
    if (search) {
      response = await client.get(
        `/player?page=${page}&perPage=${perPage}&search=${encodeURI(search)}`
      );
    } else {
      response = await client.get(`/player?page=${page}&perPage=${perPage}`);
    }

    return response.data;
  }
}

export default new PlayerAPI();
