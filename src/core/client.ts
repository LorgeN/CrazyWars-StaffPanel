import axios from "axios";

export const API_URL = "http://localhost:4000"; // TODO: Environment variables?
export const client = axios.create({ baseURL: API_URL });
