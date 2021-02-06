import axios from "axios";
import {API_URL} from "./environment"

const USER_ITEM_KEY = "user"

interface User {
    readonly token: string,
    readonly type: string,
    readonly id: number,
    readonly username: string,
    readonly roles: ReadonlyArray<string>
}

class AuthenticationService {
    async login(username: string, password: string): Promise<User> {
        const response = await axios.post(`${API_URL}/signin`, { username, password });
        if (response.data.accessToken) {
            localStorage.setItem(USER_ITEM_KEY, JSON.stringify(response.data));
        }
    
        return response.data;
    }

    logout(): void {
        localStorage.removeItem(USER_ITEM_KEY)    
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
