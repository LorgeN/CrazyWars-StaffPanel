import { client } from "../client";
import { Player } from "../models/player";

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
}

export default new PlayerAPI();
