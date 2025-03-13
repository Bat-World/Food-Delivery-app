import axios from "axios";

export const sendRequest = axios.create({ baseURL: "http://localhost:9000" });
