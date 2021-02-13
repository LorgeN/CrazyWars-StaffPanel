import { client } from "./client";
import { UserAccessToken } from "./models/user";
import Cookies, { CookieSetOptions } from "universal-cookie";

const COOKIE_ACCESS_TOKEN = "cw_auth_access";
const COOKIE_ACCESS_MAX_AGE = 2592000; // Expire after 30 days

const cookies = new Cookies();

class AuthenticationService {
  constructor() {
    client.interceptors.request.use((config) => {
      const token = this.getAccessToken();
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }

      return config;
    });
  }

  async logIn(
    username: string,
    password: string,
    remember: boolean
  ): Promise<UserAccessToken> {
    const response = await client.post("/auth/token", { username, password });
    if (response.data.access) {
      this.setAccessToken(response.data.access, remember);
    }

    return response.data;
  }

  logOut(): void {
    cookies.remove(COOKIE_ACCESS_TOKEN);
  }

  async getUserAccess(remember: boolean): Promise<UserAccessToken> {
    const storedKey = cookies.get(COOKIE_ACCESS_TOKEN);
    if (!storedKey) {
      throw new Error("Not authenticated!");
    }

    const response = await client.get("/auth/refresh");
    if (response.data.access) {
      this.setAccessToken(response.data.access, remember);
    }

    return response.data;
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  private getAccessToken(): string | null {
    return cookies.get(COOKIE_ACCESS_TOKEN);
  }

  private setAccessToken(access: string, remember: boolean) {
    let opts: CookieSetOptions = { path: "/" };

    if (remember) {
      opts = {
        ...opts,
        maxAge: COOKIE_ACCESS_MAX_AGE,
      };
    }

    cookies.set(COOKIE_ACCESS_TOKEN, access, opts);
  }
}

export default new AuthenticationService();
