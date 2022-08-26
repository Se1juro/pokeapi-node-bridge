import axios from "axios";

export const axiosCore = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  withCredentials: true,
  headers: {
    "access-control-allow-origin": "*",
  },
});
