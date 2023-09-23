import axios, { AxiosError } from "axios";

export async function fetchRunescapeUser(username: string) {
  // Using Wise Old Man instead of official Jagex API because of missing CORS response header
  // See: https://docs.wiseoldman.net/
  const WOM_URL = "https://api.wiseoldman.net/v2/players/";

  try {
    console.log(`Fetching Runescape user [${username}]`);
    const response = await axios.get(`${WOM_URL}${username}`);
    return response.data;
  } catch (error) {
    if ((error as AxiosError)?.response?.status === 404) {
      return null;
    } else {
      throw error;
    }
  }
}
