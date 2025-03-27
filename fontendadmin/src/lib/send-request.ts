import axios from "axios";


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const sendRequest = axios.create({ baseURL: backendUrl });
