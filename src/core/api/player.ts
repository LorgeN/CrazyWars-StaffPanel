import { client } from "../client";
import { Player, PlayerPlaytime } from "../models/player";

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
    // TODO
    return { groups: [] };
  }
}

export default new PlayerAPI();
