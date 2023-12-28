import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_IP_ADDRESS,
  timeout: 15000,
});
