import {client} from "./client"
import { User, Rank } from "./models/user";

const USER_JWT_TOKEN_KEY = "jwt";
const USER_ITEM_KEY = "user";

class AuthenticationService {
    constructor() {
        client.interceptors.request.use((config) => {
            const token = this.getAuthenticationToken();
            if (token) {
                config.headers.Authorization = "Bearer " + token;
            }

            return config;
        })
    }

    async login(username: string, password: string, remember: boolean): Promise<User> {
        const response = await client.post("/auth/signin", { username, password });
        if (response.data.accessToken) {
            sessionStorage.setItem(USER_ITEM_KEY, JSON.stringify(response.data));

            if (remember) {
                this.setStoredToken(response.data.accessToken);
            }
        }
        
        return response.data;
    }

    async updateUser(): Promise<User> {
        const storedKey = this.getStoredToken();
        if (!storedKey) {
            throw new Error("Not authenticated!");
        }

        const response = await client.get("/auth/self");
        if (response.data.accessToken) {
            sessionStorage.setItem(USER_ITEM_KEY, JSON.stringify(response.data));
            this.setStoredToken(response.data.accessToken);
        }
        
        return response.data;
    }

    getStoredToken(): string | null {
        return localStorage.getItem(USER_JWT_TOKEN_KEY);
    }

    setStoredToken(key: string) {
        localStorage.setItem(USER_JWT_TOKEN_KEY, key);
    }

    logout(): void {
        localStorage.removeItem(USER_JWT_TOKEN_KEY);   
        sessionStorage.removeItem(USER_ITEM_KEY); 
    }

    getAuthenticationToken(): string | null {
        const user = this.getCurrentUser();
        if (!user) {
            console.log("Using stored token!");
            return this.getStoredToken();
        }

        return user.accessToken;
    }

    hasAccess(rank: Rank): boolean {
        const user = this.getCurrentUser();
        if (!user) {
            throw new Error("Not authenticated!");
        }

        return user.roles.indexOf(rank) > -1;
    }

    getCurrentUser(): User | null {
        let userString = sessionStorage.getItem(USER_ITEM_KEY);
        if (!userString) {
            return null;
        }

        return JSON.parse(userString);
    }
}

export default new AuthenticationService();
