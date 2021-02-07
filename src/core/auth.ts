import axios from "axios";
import {API_URL} from "./environment"
import { User, Rank } from "../models/user";

const USER_ITEM_KEY = "user"

class AuthenticationService {
    async login(username: string, password: string, remember: boolean): Promise<User> {
        const response = await axios.post(`${API_URL}/auth/signin`, { username, password });
        if (response.data.accessToken && remember) {
            localStorage.setItem(USER_ITEM_KEY, JSON.stringify(response.data));
        }
    
        return response.data;
    }

    logout(): void {
        localStorage.removeItem(USER_ITEM_KEY)    
    }

    hasAccess(rank: Rank): boolean {
        const user = this.getCurrentUser();
        if (!user) {
            throw new Error("Not authenticated!");
        }

        return user.roles.indexOf(rank) > -1;
    }

    getCurrentUser(): User | null {
        let userString = localStorage.getItem(USER_ITEM_KEY);
        if (!userString) {
            return null;
        }

        return JSON.parse(userString);
    }
}

export default new AuthenticationService();
export type { User };
