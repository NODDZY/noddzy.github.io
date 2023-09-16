import axios, { AxiosError } from "axios";
import { RunescapeSkill } from "./interfaces";

// Using Wise Old Man instead of official Jagex API because of missing CORS response header
// See: https://docs.wiseoldman.net/
const WOM_URL = "https://api.wiseoldman.net/v2/players/";

export async function fetchSkillsRunescape(username: string) {
  try {
    const response = await axios.get(`${WOM_URL}${username}`);
    return Object.values(response.data.latestSnapshot.data.skills) as RunescapeSkill[];
  } catch (error) {
    if ((error as AxiosError)?.response?.status === 404) {
      console.log(`Could not find ${username}`);
      return [];
    } else {
      throw error;
    }
  }
}
