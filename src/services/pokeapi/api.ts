import axios from "axios";

export const BASE_URL = "https://pokeapi.co/api/v2/";

export async function runQuery(query: string) {
  const response = await axios.get(`${BASE_URL}${query}`);
  return response.data;
}
