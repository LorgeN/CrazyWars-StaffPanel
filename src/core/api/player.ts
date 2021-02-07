import {client} from "../client";
import { Player } from "../models/player";

class PlayerAPI {
    async getSelf(): Promise<Player> {
        let response = await client.get("/player/self");
        return response.data;
    }

    async getById(id: number): Promise<Player> {
        let response = await client.get(`/player/id/${id}`);
        return response.data;
    }

    async getByUUID(uuid: number): Promise<Player> {
        let response = await client.get(`/player/uuid/${uuid}`);
        return response.data;
    }
}

export default new PlayerAPI();