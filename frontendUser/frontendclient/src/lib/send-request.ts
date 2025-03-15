import axios from "axios";


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
console.log("backendUrl", backendUrl);


export const sendRequest = axios.create({ baseURL: backendUrl });
